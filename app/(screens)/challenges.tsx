import Tag from "@/components/Tag";
import { getChallenges } from "@/firebase/db";
import { Challenge } from "@/types";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

const ChallengesScreen = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const challenges = await getChallenges();
        setChallenges(challenges ?? []);
        for (const c of challenges ?? []) {
          console.log(c.tags);
        }
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };
    fetchChallenges();
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
      <View style={{ flex: 1, flexDirection: "row" }}>
        {item.tags.map((t) => (
          <Tag key={t} text={t} onClear={() => {}} />
        ))}
      </View>
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
