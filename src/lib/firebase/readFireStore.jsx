import { doc, getDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";


// 문서 읽기 함수
export const getDocument = async (documentPath) => {
  const docRef = doc(db, documentPath);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

// 컬렉션 읽기 함수
export const getCollection = async (collectionPath) => {
  const collectionRef = collection(db, collectionPath);
  const querySnapshot = await getDocs(collectionRef);
  const documents = [];
  querySnapshot.forEach((doc) => {
    documents.push({ id: doc.id, ...doc.data() });
  });
  console.log("Collection data:", documents);
  return documents;
};

// 실시간 데이터 읽기 함수
export const subscribeToDocument = (documentPath, callback) => {
  const docRef = doc(db, documentPath);
  const unsubscribe = onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      console.log("Current data:", docSnap.data());
      callback({ id: docSnap.id, ...docSnap.data() });
    } else {
      console.log("No such document!");
      callback(null);
    }
  });

  // 구독 취소 함수 반환
  return unsubscribe;
};