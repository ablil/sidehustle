import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { firestore, sto, rage } from "./firebaseconfig";
import storageProxy from "./storageproxy";

const firestoreProxy = {
  loadDocs: (collectionId) => {
    return getDocs(query(collection(firestore, collectionId)));
  },
  loadDoc: (docId, collectionId) => {
    return getDoc(doc(collection(firestore, collectionId), docId));
  },
  updateDoc: (docId, collectionId, data) => {
    return setDoc(doc(collection(firestore, collectionId), docId), {
      ...data,
      created: data.created || Timestamp.fromDate(new Date()),
      lastModified: data.lastModified || Timestamp.fromDate(new Date()),
    });
  },
  createDoc: (docId, collectionId, data) => {
    return setDoc(doc(collection(firestore, collectionId), docId), {
      ...data,
      created: data.created || Timestamp.fromDate(new Date()),
      lastModified: data.lastModified || Timestamp.fromDate(new Date()),
    });
  },
  removeDoc: (docId, collectionId) => {
    return deleteDoc(doc(firestore, collectionId, docId));
  },
};

export default firestoreProxy;
