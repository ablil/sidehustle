import { ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebaseconfig";

const storageProxy = {
  uploadFile: (identifier, file, filename) => {
    return uploadBytes(ref(storage, identifier), file, { filename });
  },
};

export default storageProxy;
