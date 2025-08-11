import { Challenge, NewChallenge } from "@/types";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./config";

export const addChallenge = async (
  challenge: NewChallenge
): Promise<string | undefined> => {
  try {
    const result = await addDoc(collection(db, "challenges"), challenge);
    return result.id;
  } catch (error) {
    console.error("Error adding challenge:", error);
  }
};

export const getChallenges = async (): Promise<Challenge[] | undefined> => {
  try {
    const snapshot = await getDocs(collection(db, "challenges"));
    const challenges: any[] = [];
    snapshot.forEach((doc) => {
      challenges.push({ id: doc.id, ...doc.data() });
    });
    return challenges
      .filter((c) => c.name && c.description)
      .map((c) => ({ ...c, name: c.name.replace(")}", "") }));
  } catch (error) {
    console.error("Error fetching challenges:", error);
  }
};

export const addUserProfileToFirestore = async (
  userId: string,
  data: { name?: string; age?: number; bio?: string; [key: string]: any }
) => {
  await setDoc(doc(db, "users", userId), {
    ...data,
  });
};

export const getUserProfileFromFirestore = async (userId: string) => {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);
  if (userDocSnap.exists()) {
    return userDocSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

export const updateUserProfileInFirestore = async (
  userId: string,
  data: { name?: string; age?: number; bio?: string; [key: string]: any }
) => {
  // Added bio field
  const userDocRef = doc(db, "users", userId);
  await updateDoc(userDocRef, data);
};

export const addExampleUser = async () => {
  await addDoc(collection(db, "users"), {
    name: "John Doe",
    age: 30,
    bio: "Fitness enthusiast dedicated to a healthy lifestyle and personal growth.",
  });
};

export const getExampleUsers = async () => {
  const snapshot = await getDocs(collection(db, "users"));
  snapshot.forEach((doc) => console.log(doc.id, doc.data()));
};

export const getMyChallenges = async (
  userId: string
): Promise<Challenge[] | undefined> => {
  try {
    const snapshot = await getDocs(collection(db, "challenges"));
    const myChallenges: any[] = snapshot.docs
      .filter((doc) => doc.id === userId)
      .map((doc) => ({ id: doc.id, ...doc.data() }));
    return myChallenges;
  } catch (error) {
    console.error("Error fetching challenges:", error);
  }
};
