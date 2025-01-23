import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
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


// 특정 경로에 특정 이름의 문서가 있으면 넘어가고 없으면 문서를 생성하는 함수
export const createDocumentNotExisted = async (collectionPath, documentName) => {
  const docRef = doc(db, collectionPath, documentName);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("기존 문서가 있음!");
    } else {
      await setDoc(docRef, documentName);
      console.log("새로운 문서 생성 완료!");
    }
  } catch (error) {
    console.error("[ERROR]: ", error);
  }
};