import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  EmailAuthProvider,
  User,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { RootStackParamList } from "../(navigation)/types";
import { subscribeToAuth } from "../../firebase/auth";
import {
  getUserProfileFromFirestore,
  updateUserProfileInFirestore,
} from "../../firebase/db";
import ScreenLayout from "../(components)/ScreenLayout";

type UpdateProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "updateProfile"
>;

export default function UpdateUserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [nameFirestore, setNameFirestore] = useState("");
  const [ageFirestore, setAgeFirestore] = useState<string>("");
  const [username, setUsername] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<UpdateProfileScreenNavigationProp>();

  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setDisplayName(currentUser.displayName || "");
        setPhotoURL(currentUser.photoURL || "");
        setEmail(currentUser.email || "");

        const firestoreData = await getUserProfileFromFirestore(
          currentUser.uid
        );
        if (firestoreData) {
          setNameFirestore(firestoreData.name || "");
          setAgeFirestore(firestoreData.age?.toString() || "");
          setUsername(firestoreData.username || "");
          setDateOfBirth(firestoreData.dateOfBirth || "");
          setGender(firestoreData.gender || "");
          setPhoneNumber(firestoreData.phoneNumber || "");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const showSuccessAlert = (msg: string) => {
    Alert.alert("Success", msg, [{ text: "OK" }]);
  };

  const showErrorAlert = (msg: string) => {
    Alert.alert("Error", msg, [{ text: "OK" }]);
  };

  const handleAuthUpdate = async () => {
    if (!user) {
      showErrorAlert("No user logged in.");
      return;
    }

    try {
      await updateProfile(user, {
        displayName: displayName,
        photoURL: photoURL,
      });
      showSuccessAlert("Basic profile updated successfully!");
    } catch (err: any) {
      console.error("Error updating basic profile:", err);
      showErrorAlert(`Failed to update basic profile: ${err.message}`);
    }
  };

  const handleEmailUpdate = async () => {
    if (!user) {
      showErrorAlert("No user logged in.");
      return;
    }
    if (!currentPassword) {
      showErrorAlert("Please enter your current password to update email.");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(
        user.email!,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      await updateEmail(user, email);
      showSuccessAlert(
        "Email updated successfully! You might need to verify your new email."
      );
      setCurrentPassword(""); // Clear current password after successful update
    } catch (err: any) {
      console.error("Error updating email:", err);
      showErrorAlert(
        `Failed to update email: ${err.message}. You may need to re-login.`
      );
    }
  };

  const handlePasswordUpdate = async () => {
    if (!user) {
      showErrorAlert("No user logged in.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      showErrorAlert("New password and confirm password do not match.");
      return;
    }
    if (!currentPassword) {
      showErrorAlert(
        "Please enter your current password to update your password."
      );
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(
        user.email!,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, newPassword);
      showSuccessAlert("Password updated successfully!");
      setNewPassword("");
      setConfirmNewPassword("");
      setCurrentPassword("");
    } catch (err: any) {
      console.error("Error updating password:", err);
      showErrorAlert(
        `Failed to update password: ${err.message}. You may need to re-login.`
      );
    }
  };

  const handleFirestoreProfileUpdate = async () => {
    if (!user) {
      showErrorAlert("No user logged in.");
      return;
    }

    try {
      await updateUserProfileInFirestore(user.uid, {
        name: nameFirestore,
        age: ageFirestore === "" ? undefined : Number(ageFirestore),
        username,
        dateOfBirth,
        gender,
        phoneNumber,
      });
      showSuccessAlert("Additional profile details updated successfully!");
    } catch (err: any) {
      console.error("Error updating Firestore profile:", err);
      showErrorAlert(`Failed to update additional profile: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading profile for editing...</Text>
      </View>
    );
  }

  return (
    <ScreenLayout>
      <Text style={styles.header}>Edit Profile</Text>

      {/* Basic Firebase Auth Profile Update (Display Name, Photo URL) */}
      <View style={styles.formSection}>
        <Text style={styles.sectionHeader}>Update Basic Profile</Text>
        <View style={styles.inputField}>
          <MaterialIcons name="person" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Display Name"
          />
        </View>
        <View style={styles.inputField}>
          <MaterialIcons name="image" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={photoURL}
            onChangeText={setPhotoURL}
            placeholder="Photo URL"
            keyboardType="url"
          />
        </View>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleAuthUpdate}
        >
          <Text style={styles.buttonText}>Update Basic Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Email Update */}
      <View style={styles.formSection}>
        <Text style={styles.sectionHeader}>Update Email</Text>
        <View style={styles.inputField}>
          <MaterialIcons name="email" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="New Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputField}>
          <MaterialIcons name="lock" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Current Password"
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleEmailUpdate}
        >
          <Text style={styles.buttonText}>Update Email</Text>
        </TouchableOpacity>
      </View>

      {/* Password Update */}
      <View style={styles.formSection}>
        <Text style={styles.sectionHeader}>Update Password</Text>
        <View style={styles.inputField}>
          <MaterialIcons name="lock" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="New Password"
            secureTextEntry
          />
        </View>
        <View style={styles.inputField}>
          <MaterialIcons name="lock" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
            placeholder="Confirm New Password"
            secureTextEntry
          />
        </View>
        <View style={styles.inputField}>
          <MaterialIcons name="lock" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Current Password"
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handlePasswordUpdate}
        >
          <Text style={styles.buttonText}>Update Password</Text>
        </TouchableOpacity>
      </View>

      {/* Firestore Profile Update */}
      <View style={styles.formSection}>
        <Text style={styles.sectionHeader}>
          Update Additional Details (Firestore)
        </Text>
        <View style={styles.inputField}>
          <MaterialIcons name="person" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={nameFirestore}
            onChangeText={setNameFirestore}
            placeholder="Your Name"
          />
        </View>
        <View style={styles.inputField}>
          <MaterialIcons name="cake" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={ageFirestore}
            onChangeText={setAgeFirestore}
            placeholder="Your Age"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputField}>
          <MaterialIcons name="person" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
          />
        </View>
        <View style={styles.inputField}>
          <MaterialIcons name="cake" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            placeholder="Date of Birth (YYYY-MM-DD)"
          />
        </View>
        <View style={styles.inputField}>
          <MaterialIcons name="person" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={gender}
            onChangeText={setGender}
            placeholder="Gender"
          />
        </View>
        <View style={styles.inputField}>
          <MaterialIcons name="phone" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Phone Number (Optional)"
            keyboardType="phone-pad"
          />
        </View>
        {/* Add more input fields for other Firestore data */}
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleFirestoreProfileUpdate}
        >
          <Text style={styles.buttonText}>Update Firestore Profile</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back to Profile</Text>
      </TouchableOpacity>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  formSection: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
    color: "#555",
    textAlign: "center",
  },
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  updateButton: {
    backgroundColor: "#5865F2",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    // Added this style
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    minWidth: 120,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#6c757d",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20, // To ensure space at the bottom of scroll view
  },
});