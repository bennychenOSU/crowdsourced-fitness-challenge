import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './config';

const addUser = async () => {
  await addDoc(collection(db, 'users'), {
    name: 'John Doe',
    age: 30,
  });
};

const getUsers = async () => {
  const snapshot = await getDocs(collection(db, 'users'));
  snapshot.forEach(doc => console.log(doc.id, doc.data()));
};
