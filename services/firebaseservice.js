import { FirebaseError } from "firebase/app";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import firestoreProxy from "./firestoreproxy";
import storageProxy from "./storageproxy";

const service = {
  profile: {
    sendVerificationEmail: (currentUser) => {
      return sendEmailVerification(currentUser);
    },
    changePassword: async (user, oldpassword, newpassword) => {
      reauthenticateWithCredential(
        user,
        EmailAuthProvider.credential(user.email, oldpassword)
      );

      updatePassword(user, newpassword);
    },
    updateUsername: (currentUser, username) => {
      return updateProfile(currentUser, { displayName: username });
    },
    uploadProfilePicture: (uid, file, filename) => {
      return storageProxy.uploadFile(uid, file, filename);
    },
    updateProfilePicture: (currentUser, url) => {
      return updateProfile(currentUser, { photoURL: url });
    },
  },
  idea: {
    loadAll: () => {
      return firestoreProxy
        .loadDocs("ideas-v2")
        .then((res) => res.docs.map((doc) => doc.data()));
    },
    loadSingle: (id) => {
      return firestoreProxy.loadDoc(id, "ideas-v2").then((res) => res.data());
    },
    add: (id, data) => {
      return firestoreProxy.createDoc(id, "ideas-v2", data);
    },
    update: (id, data) => {
      return firestoreProxy.updateDoc(id, "ideas-v2", data);
    },
    remove: (id) => {
      return firestoreProxy.removeDoc(id, "ideas-v2");
    },
  },
  note: {
    loadAll: (idea) => {
      return firestoreProxy
        .loadDocs(`ideas-v2/${idea}/notes`)
        .then((res) => res.docs.map((doc) => doc.data()));
    },
    loadSingle: (id, idea) => {
      return firestoreProxy.loadDoc(`ideas-v2/${idea}/notes/${id}`);
    },
    update: (id, idea, data) => {
      return firestoreProxy.updateDoc(id, `ideas-v2/${idea}/notes`, data);
    },
    add: (id, idea, data) => {
      return firestoreProxy.createDoc(id, `ideas-v2/${idea}/notes`, data);
    },
    remove: (id, idea) => {
      return firestoreProxy.removeDoc(id, `ideas-v2/${idea}/notes`);
    },
  },
  feature: {
    loadAll: (idea) => {
      return firestoreProxy
        .loadDocs(`ideas-v2/${idea}/features`)
        .then((res) => res.docs.map((doc) => doc.data()));
    },
    loadSingle: (id, idea) => {
      return firestoreProxy.loadDoc(`ideas-v2/${idea}/features/${id}`);
    },
    update: (id, idea, data) => {
      return firestoreProxy.updateDoc(id, `ideas-v2/${idea}/features`, data);
    },
    add: (id, idea, data) => {
      return firestoreProxy.createDoc(id, `ideas-v2/${idea}/features`, data);
    },
    remove: (id, idea) => {
      return firestoreProxy.removeDoc(id, `ideas-v2/${idea}/features`);
    },
  },
  backlog: {
    loadAll: (idea) => {
      return firestoreProxy
        .loadDocs(`ideas-v2/${idea}/backlog`)
        .then((res) => res.docs.map((doc) => doc.data()));
    },
    loadSingle: (id, idea) => {
      return firestoreProxy.loadDoc(`ideas-v2/${idea}/backlog/${id}`);
    },
    update: (id, idea, data) => {
      return firestoreProxy.updateDoc(id, `ideas-v2/${idea}/backlog`, data);
    },
    add: (id, idea, data) => {
      return firestoreProxy.createDoc(id, `ideas-v2/${idea}/backlog`, data);
    },
    remove: (id, idea) => {
      return firestoreProxy.removeDoc(id, `ideas-v2/${idea}/backlog`);
    },
  },
  todo: {
    loadAll: () => {
      return firestoreProxy
        .loadDocs("todos")
        .then((res) => res.docs.map((doc) => doc.data()));
    },
    add: (todo) => {
      return firestoreProxy.createDoc(todo.id, "todos", todo);
    },
    update: (todo) => {
      return firestoreProxy.updateDoc(todo.id, "todos", todo);
    },
    remove: (id) => {
      return firestoreProxy.removeDoc(id, "todos");
    },
  },
};

export default service;
