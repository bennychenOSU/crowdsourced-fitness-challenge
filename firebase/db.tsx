import { Challenge, NewChallenge } from "@/types";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./config";

const addUser = async () => {
  await addDoc(collection(db, "users"), {
    name: "John Doe",
    age: 30,
  });
};

const getUsers = async () => {
  const snapshot = await getDocs(collection(db, "users"));
  snapshot.forEach((doc) => console.log(doc.id, doc.data()));
};

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
    return challenges;
  } catch (error) {
    console.error("Error fetching challenges:", error);
  }
};

export const getMyChallenges = async (
  userId: string
): Promise<Challenge[] | undefined> => {
  try {
    const snapshot = await getDocs(collection(db, "challenges"));
    const myChallenges: any[] = snapshot.docs
      .filter((doc) => doc.id === userId)
      .map((doc) => ({ id: doc.id, ...doc.data }));
    return myChallenges;
  } catch (error) {
    console.error("Error fetching challenges:", error);
  }
};
