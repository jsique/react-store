import { collection, getDocs, query, orderBy, doc, getDoc,updateDoc } from "firebase/firestore";
import { db } from './firebase';
//connection with firebase function to get product listing
export const getProducts= async ()  => {
    const result = await getDocs(query(collection(db,'products'), orderBy("name")));
    return result;
}
//connection with firebase function to get a product
export const getProduct = async (id) => {
    const docRef = doc(db, "products", id);
    const result = await getDoc(docRef);

    return result;
}
//connection with firebase function to update a product
export const updateProduct = async (id,quantity)=>{
    const docRef = doc(db, "products", id);
    const result = await updateDoc(docRef,
        {    
            disponible : quantity
        }
    );
    return result; 
}