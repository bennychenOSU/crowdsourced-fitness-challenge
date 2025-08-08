import Tag from "@/components/Tag";

import ImageUploader from "@/app/(utilities)/ImageUploader";
import { addChallenge } from "@/firebase/db";

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function CreateChallenge() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [newGoal, setNewGoal] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const imageUploader =  new ImageUploader()

  // Deals with image selection
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    // opens images available
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    // If an image is selected, upload it
    if (!result.canceled && result.assets.length > 0) {
      const selectedUri = result.assets[0].uri;
      setImageUri(selectedUri);
      uploadImage(selectedUri);
    }
  };

  
  // Upload image to Firebase Storage
  const uploadImage = async (uri: string) => {
    setUploading(true);
    const onImageUpload = (downloadURL: string) => {
      console.log(`Yay! ${downloadURL}`)
      setDownloadUrl(downloadURL);
      setUploading(false);
    }
    console.log(`Attempting to upload image ${uri}`)

    try{
      const uploadTask = await imageUploader.uploadImage(uri, `challenge_images/${uuidv4()}`, onImageUpload)
    }
    catch (e){
      console.error(`The following error occured when uploading image: ${e}`)
    }
  };

  const canSubmit = name.length > 0 && goals.length > 0 && tags.length > 0;

  return loading ? (
    <ActivityIndicator />
  ) : (
    <ScrollView style={styles.container}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        {imageUri === null ? (
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: "white",
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialIcons name="image" size={50} color="#312e2e" />
          </View>
        ) : (
          <Image
            style={{
              padding: 20,
              width: 100,
              height: 100,
              backgroundColor: "white",
              borderRadius: 100,
            }}
            source={{ uri: imageUri }}
          />
        )}
        <Pressable style={{ width: "auto" }} onPress={pickImage}>
          <Text
            style={{
              margin: 10,
              color: "white",
              fontSize: 12,
              paddingVertical: 6,
              paddingHorizontal: 10,
              backgroundColor: "#312e2e",
              borderRadius: 4,
              textAlign: "center",
              textAlignVertical: "center",
            }}
          >
            + Challenge Image
          </Text>
        </Pressable>
      </View>
      <Text style={styles.sectionHeader}>General</Text>
      <View style={styles.section}>
        <TextInput
          style={styles.input}
          placeholderTextColor="white"
          placeholder="Name (required)"
          value={name}
          onChangeText={setName}
          maxLength={20}
        />
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={2}
          placeholderTextColor="white"
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          maxLength={40}
        />
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={6}
          maxLength={300}
          placeholderTextColor="white"
          placeholder="Description (required)"
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <Text style={styles.sectionHeader}>Goals</Text>
      <View style={styles.section}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 8,
          }}
        >
          {goals.map((goal, index) => (
            <Text
              style={{ color: "white", fontSize: 16 }}
              key={index}
            >{`• ${goal}`}</Text>
          ))}
          <View style={{ flexDirection: "row", gap: 8 }}>
            <TextInput
              style={{ ...styles.input, width: "86%" }}
              placeholderTextColor="white"
              placeholder="New goal"
              value={newGoal}
              onChangeText={setNewGoal}
              maxLength={50}
              numberOfLines={2}
            />
            <Pressable
              style={{ width: "auto" }}
              disabled={newGoal.trim() === ""}
              onPress={() => {
                if (newGoal.trim() !== "" && !goals.includes(newGoal.trim())) {
                  setGoals([...goals, newGoal.trim()]);
                  setNewGoal("");
                }
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  backgroundColor: "#e96e2c",
                  borderRadius: 4,
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                +
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <Text style={styles.sectionHeader}>Tags</Text>
      <View style={styles.section}>
        {tags.map((tag, index) => (
          <Tag
            key={index}
            text={tag}
            onClear={() => setTags((prev) => prev.filter((t) => t !== tag))}
          />
        ))}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 8,
          }}
        >
          <TextInput
            style={{ ...styles.input, width: "86%" }}
            placeholderTextColor="white"
            placeholder="New tag"
            value={newTag}
            onChangeText={setNewTag}
            maxLength={16}
          />
          <Pressable
            style={{ width: "auto" }}
            disabled={newTag.trim() === ""}
            onPress={() => {
              if (newTag.trim() !== "" && !tags.includes(newTag.trim())) {
                setTags([...tags, newTag.trim()]);
                setNewTag("");
              }
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                paddingVertical: 6,
                paddingHorizontal: 10,
                backgroundColor: "#e96e2c",
                borderRadius: 4,
                textAlign: "center",
                textAlignVertical: "center",
              }}
            >
              +
            </Text>
          </Pressable>
        </View>
      </View>
      <Pressable
        disabled={!canSubmit}
        style={{ width: "auto" }}
        onPress={async () => {
          setLoading(true);
          const result = await addChallenge({
            name,
            description,
            tags,
            goals,
            createdBy: "user-id-placeholder", // replace with actual user ID once auth is setup
          });
          setLoading(false);
          if (!result) {
            Alert.alert("Failed to create challenge. Please try again.");
          }
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: canSubmit ? "white" : "#312e2e",
            fontSize: 20,
            padding: 12,
            backgroundColor: canSubmit ? "#312e2e" : "lightgrey",
            borderRadius: 8,
            marginTop: 16,
            textAlign: "center",
            textAlignVertical: "center",
          }}
        >
          Create Challenge
        </Text>
      </Pressable>
    </ScrollView>
  );
}

// Style page
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e96e2c",
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    width: "100%",
    textAlign: "left",
    marginTop: 12,
  },
  section: {
    backgroundColor: "#312e2e",
    borderRadius: 8,
    padding: 16,
    width: "100%",
    marginVertical: 8,
  },
  input: {
    color: "white",
    width: "100%",
    marginVertical: 8,
    fontSize: 16,
    borderColor: "white",
    borderBottomWidth: 1,
    borderRadius: 4,
    padding: 2,
  },
});