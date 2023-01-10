import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore/lite'
import {defineStore} from 'pinia'
import { auth, db } from '../firebaseConfig'
import { nanoid } from 'nanoid' 
import router from '../router'

export const useDatabaseStore = defineStore('database', {
    state: () => ({
        documents: [], //aqui se trae todo de la base de datos
        loadingDoc: false
    }),
    actions: {
        async getUrls(){ //funcion para traer información de la base de datos de firestore
            
            if(this.documents.length !==0) return; //para vaciar el documents

            this.loadingDoc = true
            try {
                const q = query(collection(db, "urls"), where("user", "==", auth.currentUser.uid)) //no traigo el user de la otra tienda, para evitar problemas de cache y demas
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach(doc => {
                    //console.log(doc.id, doc.data())
                    this.documents.push({
                        id: doc.id,
                        ...doc.data() //destructuración
                    })
                })
            } catch (error) {
                console.log(error)
            } finally {
                this.loadingDoc = false
            }
        },
        async addUrl(name){
            try {
                const objetoDoc = {
                    name: name, //viene de la vista, la url ingresada por el usuario
                    short: nanoid(6), //nanoid genera un string aleatorio, en este caso de 6 caracteres
                    user: auth.currentUser.uid //el usuario activo
                }
                const docRef = await addDoc(collection(db, "urls"), objetoDoc) //docRef trae el id del documento, pero no la información
                //console.log(docRef.id)
                this.documents.push({
                    ...objetoDoc,
                    id: docRef.id
                })
            } catch (error) {
                
            } finally {

            }
        },
        async deleteUrl(id){
            try {
                const docRef = doc(db, 'urls', id);
                
                //para evitar que otros usuarios eliminen url de otros usuarios
                const docSnap = await getDoc(docRef);
                if(!docSnap.exists()){ //exists es un metodo de firebase
                    throw new Error('no existe el doc');
                }
                if(docSnap.data().user !== auth.currentUser.uid){
                    throw new Error('no le pertenece ese documento');
                }
                
                await deleteDoc(docRef);
                this.documents = this.documents.filter(item => item.id !== id) //filter para eliminar || devuelve todo cuando el item.id coincida con el id que pasamos
            } catch (error) {
                console.log(error)
            } finally {

            }
        },
        async readurl(id){
            try {
                const docRef = doc(db, 'urls', id);
                const docSnap = await getDoc(docRef);

                //lo mismo que el delete
                if(!docSnap.exists()) throw new Error('no existe el doc'); //exists es un metodo de firebase
                if(docSnap.data().user !== auth.currentUser.uid) throw new Error('no le pertenece ese documento');
                
                return docSnap.data().name //devuelve la url larga, el name
            } catch (error) {
                console.log(error)
            } finally {

            }
        },
        async update(id, name){
            try {
                const docRef = doc(db, 'urls', id);
                const docSnap = await getDoc(docRef);

                //lo mismo que el delete
                if(!docSnap.exists()) throw new Error('no existe el doc'); //exists es un metodo de firebase
                if(docSnap.data().user !== auth.currentUser.uid) throw new Error('no le pertenece ese documento');
                
                await updateDoc(docRef, {
                    name //name: name || es lo mismo
                })

                this.documents = this.documents.map(item => item.id === id ? ({...item, name: name}) : item) //map devuelve la misma cantidad de elementos
                router.push('/');
            } catch (error) {
                console.log(error)
            } finally {

            }
        }
    }
})