import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { ActivityIndicator, Button, Image, StyleSheet, Text, View } from 'react-native';
// initialize firebase storage
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase/config';
// imports module to create unique file names
import uuid from 'react-native-uuid';

export default function createChallenge() {
  // Set up states for uri
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  // Deals with image selection
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    // opens images available
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
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

    try {
      // Convert image to a blob & create a unique file path
      const response = await fetch(uri);
      const blob = await response.blob();
      const imageRef = ref(storage, `challenge_images/${uuid.v4()}`);

      // Upload image
      const uploadRes = await uploadBytes(imageRef, blob);
      console.log(uploadRes);
      const url = await getDownloadURL(imageRef);
      setDownloadUrl(url);
      console.log("Uploaded image URL:", url);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Create Challenge</Text>

      <Button title="Pick an Image" onPress={pickImage} />

      {uploading && <ActivityIndicator />}

      {/* Show image preview */}
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      )}

      {/* Displays successful upload of image url */}
      {downloadUrl && (
        <Text style={{ fontSize: 12, marginTop: 10 }}>
          Uploaded URL: {downloadUrl}
        </Text>
      )}
    </View>
  );
}

// Style page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
