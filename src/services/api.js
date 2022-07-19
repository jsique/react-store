import { collection, getDocs, query /*, doc, getDoc, addDoc, deleteDoc, updateDoc, setDoc, where*/ } from "firebase/firestore";
import { db } from './firebase';

export const getProducts= async ()  => {
    const result = await getDocs(query(collection(db,'products')));
    return result;
}

