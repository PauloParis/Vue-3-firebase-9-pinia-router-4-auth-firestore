import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { defineStore } from "pinia";
import { auth, db, storage } from "../firebaseConfig";

import router from "../router";

import {useDatabaseStore} from './database'

export const useUserStore = defineStore("userStore", {
    state: () => ({
        userData: null,
        loadingUser: false,
        loadingSession: false,
    }),
    actions: {
        async registerUser (email, password) {
            this.loadingUser = true;
            try {
                const {user} = await createUserWithEmailAndPassword (auth, email, password)
                console.log(user);
                this.userData = {email: user.email, uid: user.uid}
                router.push('/')
            } catch (error) {
                console.log(error.code);
                return error.code
            } finally {
                this.loadingUser = false
            }
        },

        async updateImg(imagen){
            try {
                console.log(imagen)
                const storageRef = ref(storage, `${auth.currentUser.uid}/perfil`) //auth.currentUser ó this.userData.uid
                await uploadBytes(storageRef, imagen.originFileObj)
                const photoURL =  await getDownloadURL(storageRef)
                
                await updateProfile(auth.currentUser, {
                    photoURL: photoURL,
                })
                
                this.setUser(auth.currentUser)

            } catch (error) {
                console.log(error)
                return error.code
            }
        },

        async updateUser(displayName){
            try {
                await updateProfile(auth.currentUser, {
                    displayName: displayName,
                })

                this.setUser(auth.currentUser)

            } catch (error) {
                console.log(error.code)
                return error.code
            } finally {

            }
        },

        async setUser(user){
            try {
                const docRef = doc(db, 'users', user.uid);
                //const docSpan = await getDoc(docRef);
                
                //actualizó la tienda
                this.userData = {
                    email: user.email, 
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                }

                //aqui guardó
                await setDoc(docRef, this.userData)

            } catch (error) {
                console.log(error)
            } finally {

            }
        },

        async loginUser (email, password) {
            this.loadingUser = true;
            try {
                const {user} = await signInWithEmailAndPassword(auth, email, password); 
                await this.setUser(user);
                //this.userData = {email: user.email, uid: user.uid}
                router.push('/')
            } catch (error) {
                console.log(error.code)
                return error.code
            } finally {
                this.loadingUser = false
            }
        },
        async logoutUser () {
            const databaseStore = useDatabaseStore(); //debe estar dentro de la función
            databaseStore.$reset();
            try {
                router.push('/login')
                await signOut(auth);
                //this.userData = null; //está demas porq está en el currentUser
                
            } catch (error) {
                console.log(error.code);
                return error.code
            } 
        },

        //cada vez que se actualiza el sitio, se modifica, login o logout | trae información del usuario, desde firebase de la autenticación
        currentUser() { 
            return new Promise((resolve, reject) => { // respuesta positiva (resolve), respuesta negativa (reject)
                const unsuscribe = onAuthStateChanged(
                    auth, 
                    async(user) =>{
                        if(user) { //si existe el usuario
                            console.log(user)
                            //await this.setUser(user);
                            this.userData = { //se actualiza la tienda
                                email: user.email, 
                                uid: user.uid,
                                displayName: user.displayName,
                                photoURL: user.photoURL
                            }
                        } else {
                            this.userData = null;
                            const databaseStore = useDatabaseStore();
                            databaseStore.$reset();
                        }
                        resolve(user) //independiente si existe o no
                }, e => reject(e)) //el error
                unsuscribe() //segun la documentación
            })
        }
    }
    
})