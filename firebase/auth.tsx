import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { app } from "./config";
import { addUserProfileToFirestore } from "./db";

const auth: Auth = getAuth(app);

export const subscribeToAuth = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const login = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const signup = async (
  email: string,
  password: string,
  displayName?: string
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (displayName) {
      await updateProfile(user, { displayName });
    }

    if (user.uid) {
      await addUserProfileToFirestore(user.uid, {
        name: displayName || email,
        age: 20,
        bio: "Hello! I am a new user.",
      });
    }

    return user;
  } catch (error: any) {
    console.error("Signup failed:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

export const createDummyUser = async (
  email: string,
  password: string,
  displayName?: string
) => {
  try {
    console.log(`Attempting to create dummy user: ${email}`);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (displayName) {
      await updateProfile(user, { displayName });
    }

    if (user.uid) {
      await addUserProfileToFirestore(user.uid, {
        name: displayName || `Dummy User ${Math.floor(Math.random() * 1000)}`,
        age: Math.floor(Math.random() * 40) + 20,
        bio: "This is a dummy user for testing purposes. Enjoy!",
      });
    }

    console.log("Dummy user created successfully:", user.email);
    return user;
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      console.warn("Dummy user email already in use:", email);
      throw new Error("Email already in use. Cannot create dummy user.");
    } else {
      console.error("Error creating dummy user:", error);
      throw error;
    }
  }
};

export const loginDummyUser = async () => {
  const DUMMY_EMAIL = "dummyuser@example.com";
  const DUMMY_PASSWORD = "password123";
  const DUMMY_DISPLAY_NAME = "Dummy User";

  try {
    console.log(`Attempting to login dummy user: ${DUMMY_EMAIL}`);
    const user = await login(DUMMY_EMAIL, DUMMY_PASSWORD);
    console.log("Dummy user logged in:", user?.email);
    return user;
  } catch (error: any) {
    if (
      error.code === "auth/invalid-credential" ||
      error.code === "auth/user-not-found"
    ) {
      console.log(
        "Dummy user not found or invalid credentials, attempting to create..."
      );
      try {
        const newUser = await createDummyUser(
          DUMMY_EMAIL,
          DUMMY_PASSWORD,
          DUMMY_DISPLAY_NAME
        );
        console.log("Dummy user created, attempting re-login...");
        const userAfterCreate = await login(DUMMY_EMAIL, DUMMY_PASSWORD);
        return userAfterCreate;
      } catch (createError: any) {
        console.error("Failed to create and/or login dummy user:", createError);
        throw createError;
      }
    } else {
      console.error("Unhandled error during dummy login attempt:", error);
      throw error;
    }
  }
};
