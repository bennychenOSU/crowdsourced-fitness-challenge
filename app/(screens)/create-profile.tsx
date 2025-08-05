import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
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
  addUserProfileToFirestore,
} from "../../firebase/db";
import ScreenLayout from "../(components)/ScreenLayout";

type CreateProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "createProfile"
>;

// Helper for dropdowns
const OptionButton = ({ label, value, selectedValue, onSelect }) => (
  <TouchableOpacity
    style={[
      styles.optionButton,
      selectedValue === value && styles.selectedOption,
    ]}
    onPress={() => onSelect(value)}
  >
    <Text
      style={[
        styles.optionText,
        selectedValue === value && styles.selectedOptionText,
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

export default function CreateUserProfile() {
  const navigation = useNavigation<CreateProfileScreenNavigationProp>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Personal Info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");

  // Physical Stats
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary"); // Default value

  // Fitness Goals
  const [fitnessGoal, setFitnessGoal] = useState("maintain_weight"); // Default value
  const [targetWeight, setTargetWeight] = useState("");
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState("");
  const [preferredWorkoutTime, setPreferredWorkoutTime] = useState("morning"); // Default value

  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setEmail(currentUser.email || "");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleCreateProfile = async () => {
    if (!user) {
      Alert.alert("Error", "You must be logged in to create a profile.");
      return;
    }
    setLoading(true);
    try {
      const profileData = {
        firstName,
        lastName,
        phone,
        dateOfBirth,
        gender,
        height: Number(height) || 0,
        weight: Number(weight) || 0,
        activityLevel,
        fitnessGoal,
        targetWeight: Number(targetWeight) || 0,
        workoutsPerWeek: Number(workoutsPerWeek) || 0,
        preferredWorkoutTime,
      };
      await addUserProfileToFirestore(user.uid, profileData);
      Alert.alert("Success", "Your profile has been created.");
      // Navigate to the main app screen
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to create profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#5865F2" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScreenLayout>
      <ScrollView>
        <Text style={styles.mainTitle}>Create Your Profile</Text>

        {/* Personal Info Card */}
        <View style={styles.card}>
          <Text style={styles.sectionHeader}>Personal Info</Text>
          <View style={styles.inputField}>
            <MaterialIcons name="person" style={styles.icon} />
            <TextInput
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
            />
          </View>
          <View style={styles.inputField}>
            <MaterialIcons name="person" style={styles.icon} />
            <TextInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
            />
          </View>
          <View style={styles.inputField}>
            <MaterialIcons name="email" style={styles.icon} />
            <TextInput
              placeholder="Email Address"
              value={email}
              editable={false} // Email is not editable here
              style={[styles.input, styles.disabledInput]}
            />
          </View>
          <View style={styles.inputField}>
            <MaterialIcons name="phone" style={styles.icon} />
            <TextInput
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.inputField}>
            <MaterialIcons name="cake" style={styles.icon} />
            <TextInput
              placeholder="Date of Birth (YYYY-MM-DD)"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              style={styles.input}
            />
          </View>
          <View style={styles.inputField}>
            <MaterialIcons name="wc" style={styles.icon} />
            <TextInput
              placeholder="Gender"
              value={gender}
              onChangeText={setGender}
              style={styles.input}
            />
          </View>
        </View>

        {/* Physical Stats Card */}
        <View style={styles.card}>
          <Text style={styles.sectionHeader}>Physical Stats</Text>
          <View style={styles.inputField}>
            <MaterialIcons name="height" style={styles.icon} />
            <TextInput
              placeholder="Height (cm)"
              value={height}
              onChangeText={setHeight}
              style={styles.input}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputField}>
            <MaterialIcons name="fitness-center" style={styles.icon} />
            <TextInput
              placeholder="Weight (kg)"
              value={weight}
              onChangeText={setWeight}
              style={styles.input}
              keyboardType="numeric"
            />
          </View>
          <Text style={styles.label}>Activity Level</Text>
          <View style={styles.optionContainer}>
            <OptionButton label="Sedentary" value="sedentary" selectedValue={activityLevel} onSelect={setActivityLevel} />
            <OptionButton label="Light" value="light" selectedValue={activityLevel} onSelect={setActivityLevel} />
            <OptionButton label="Moderate" value="moderate" selectedValue={activityLevel} onSelect={setActivityLevel} />
            <OptionButton label="Active" value="active" selectedValue={activityLevel} onSelect={setActivityLevel} />
            <OptionButton label="Very Active" value="very_active" selectedValue={activityLevel} onSelect={setActivityLevel} />
          </View>
        </View>

        {/* Fitness Goals Card */}
        <View style={styles.card}>
          <Text style={styles.sectionHeader}>Fitness Goals</Text>
          <Text style={styles.label}>Primary Goal</Text>
          <View style={styles.optionContainer}>
            <OptionButton label="Lose Weight" value="lose_weight" selectedValue={fitnessGoal} onSelect={setFitnessGoal} />
            <OptionButton label="Gain Weight" value="gain_weight" selectedValue={fitnessGoal} onSelect={setFitnessGoal} />
            <OptionButton label="Build Muscle" value="build_muscle" selectedValue={fitnessGoal} onSelect={setFitnessGoal} />
            <OptionButton label="Maintain Weight" value="maintain_weight" selectedValue={fitnessGoal} onSelect={setFitnessGoal} />
            <OptionButton label="Improve Fitness" value="improve_fitness" selectedValue={fitnessGoal} onSelect={setFitnessGoal} />
          </View>
          <View style={styles.inputField}>
            <MaterialIcons name="track-changes" style={styles.icon} />
            <TextInput
              placeholder="Target Weight (kg)"
              value={targetWeight}
              onChangeText={setTargetWeight}
              style={styles.input}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputField}>
            <MaterialIcons name="event-repeat" style={styles.icon} />
            <TextInput
              placeholder="Workouts Per Week (1-7)"
              value={workoutsPerWeek}
              onChangeText={setWorkoutsPerWeek}
              style={styles.input}
              keyboardType="numeric"
            />
          </View>
          <Text style={styles.label}>Preferred Workout Time</Text>
          <View style={styles.optionContainer}>
            <OptionButton label="Morning" value="morning" selectedValue={preferredWorkoutTime} onSelect={setPreferredWorkoutTime} />
            <OptionButton label="Midday" value="midday" selectedValue={preferredWorkoutTime} onSelect={setPreferredWorkoutTime} />
            <OptionButton label="Afternoon" value="afternoon" selectedValue={preferredWorkoutTime} onSelect={setPreferredWorkoutTime} />
            <OptionButton label="Evening" value="evening" selectedValue={preferredWorkoutTime} onSelect={setPreferredWorkoutTime} />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleCreateProfile}
          >
            <Text style={styles.buttonText}>Create Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
  },
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#EFEFEF",
  },
  icon: {
    fontSize: 20,
    color: "#888",
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 12,
  },
  disabledInput: {
    backgroundColor: "#F7F7F7",
    color: "#888",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
    marginBottom: 10,
    marginTop: 5,
  },
  optionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginBottom: 15,
  },
  optionButton: {
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: "#5865F2",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
  selectedOptionText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#5865F2",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
