import { getChallenges } from "@/firebase/db";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

interface Challenge {
  id: string;
  name: string;
  description: string;
}

const ChallengesScreen = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchChallenges = async () => {
      const challengesData = await getChallenges(); // Assuming getChallenges is defined in firebase/db.tsx
      if (challengesData) {
        console.log("Fetched challenges:", challengesData);
        setChallenges(challengesData);
        setFilteredChallenges(challengesData);
      }
    };

    fetchChallenges();
  }, []);

  /*
  useEffect(() => {
    const dummyChallenges: Challenge[] = [
      {
        id: "1",
        name: "Push-up Challenge",
        description: "Complete 100 push-ups every day for a month.",
      },
      {
        id: "2",
        name: "Running Challenge",
        description: "Run 5km three times a week.",
      },
      {
        id: "3",
        name: "Plank Challenge",
        description: "Hold a plank for 2 minutes every day.",
      },
      {
        id: "4",
        name: "Yoga Challenge",
        description: "Practice yoga for 30 minutes daily.",
      },
      {
        id: "5",
        name: "Hydration Challenge",
        description: "Drink 8 glasses of water every day.",
      },
      {
        id: "6",
        name: "Healthy Eating Challenge",
        description: "Eat 5 servings of fruits and vegetables daily.",
      },
    ];
    setChallenges(dummyChallenges);
    setFilteredChallenges(dummyChallenges);
  }, []); */

  useEffect(() => {
    if (searchTerm) {
      const filtered = challenges.filter((challenge) =>
        challenge.name && challenge.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredChallenges(filtered);
    }
    
  }, [searchTerm, challenges]);

  const renderItem = ({ item }: { item: Challenge }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Challenges"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={challenges}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  itemContainer: {
    padding: 16,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ChallengesScreen;
