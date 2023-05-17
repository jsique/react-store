import { collection, getDocs, query, orderBy, doc, getDoc,updateDoc /*, addDoc, deleteDoc, , setDoc, where*/ } from "firebase/firestore";
import { db } from './firebase';

export const getProducts= async ()  => {
    const result = await getDocs(query(collection(db,'products'), orderBy("name")));
    return result;
}

export const getProduct = async (id) => {
    //console.log("productID api:", id);
    const docRef = doc(db, "products", id);
    const result = await getDoc(docRef);

    return result;
}

export const updateProduct = async (id,quantity)=>{
    const docRef = doc(db, "products", id);
    const result = await updateDoc(docRef,
        {    
            disponible : quantity
        }
    );
    return result; 
}