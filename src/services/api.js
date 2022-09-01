import { collection, getDocs, query, orderBy, doc, getDoc /*, addDoc, deleteDoc, updateDoc, setDoc, where*/ } from "firebase/firestore";
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