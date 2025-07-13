import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from './config';

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, user => {
    if (user) {
      console.log('User is signed in:', user.email);
    } else {
      console.log('No user signed in');
    }
  });

  return unsubscribe;
}, []);
