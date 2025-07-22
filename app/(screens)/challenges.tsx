import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput, StyleSheet } from "react-native";

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
    ];
    setChallenges(dummyChallenges);
    setFilteredChallenges(dummyChallenges);
  }, []);

  useEffect(() => {
    const filtered = challenges.filter((challenge) =>
      challenge.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredChallenges(filtered);
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
        data={filteredChallenges}
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
