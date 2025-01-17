import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

// 특정 문서에 필드 추가 함수
export const updateDocument = async (documentPath, data) => {
  const docRef = doc(db, documentPath);
  try {
    await updateDoc(docRef, data);
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

// 특정 문서 경로에 값 추가 함수
// documentPath: "users/userId", data: {"20240512": "jeong"}
export const setDocument = async (documentPath, data) => {
  const docRef = doc(db, documentPath);
  try {
    await setDoc(docRef, data);
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};

// 컬렉션에 새 문서 추가 함수
export const addDocument = async (collectionPath, data) => {
  const collectionRef = collection(db, collectionPath);
  try {
    const docRef = await addDoc(collectionRef, data);
    console.log("Document successfully written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};