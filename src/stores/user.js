import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { defineStore } from "pinia";
import { auth } from "../firebaseConfig";

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
        async loginUser (email, password) {
            this.loadingUser = true;
            try {
                const {user} = await signInWithEmailAndPassword(auth, email, password);
                this.userData = {email: user.email, uid: user.uid}
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
                await signOut(auth);
                this.userData = null;
                router.push('/login')
            } catch (error) {
                console.log(error.code);
                return error.code
            } 
        },
        currentUser() {
            return new Promise((resolve, reject) => { // respuesta positiva (resolve), respuesta negativa (reject)
                const unsuscribe = onAuthStateChanged(auth, user =>{
                    if(user) {
                        this.userData = {email: user.email, uid: user.uid}
                    } else {
                        this.userData = null;
                    }
                    resolve(user) //independiente si existe o no
                }, e => reject(e)) //el error
                unsuscribe() //segun la documentación
            })
        }
    }
    
})