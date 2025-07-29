import { Challenge } from "@/types";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

const MyChallenges = () => {
  const [myChallenges, setMyChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    const getChallenges = async () => {
      //const result = await getMyChallenges("dummy-user-id"); todo - wire up firestore
      const result: Challenge[] = [
        {
          name: "30-Day Yoga Flow",
          description: "Daily Yoga remote sessions",
          tags: ["Yoga", "Pilates", "Easy"],
          goals: [
            {
              name: "Attend 15 sessions",
              points: 10,
              totalPossiblePoints: 15,
              pointsUnit: "session",
            },
            {
              name: "Attend 5 sessions in a row",
              points: 2,
              totalPossiblePoints: 5,
              pointsUnit: "session",
            },
          ],
          createdBy: "dummy-user-id-1",
          id: "dummy-user-id-2",
          createdAt: "2025-07-28T23:13:07.391Z",
          updatedAt: "2025-07-28T23:13:07.391Z",
        },
        {
          name: "Daily Step Goal",
          description: "Daily step counting",
          tags: ["Walking", "Cardio", "Easy"],
          goals: [
            {
              name: "Walk over 5000 steps a day",
              points: 4321,
              totalPossiblePoints: 5000,
              pointsUnit: "step",
            },
            {
              name: "Walk 20000 steps one day",
              points: 4321,
              totalPossiblePoints: 20000,
              pointsUnit: "step",
            },
          ],
          createdBy: "dummy-user-id-1",
          id: "dummy-user-id-2",
          createdAt: "2025-07-27T23:13:07.391Z",
          updatedAt: "2025-07-28T21:13:07.391Z",
        },
        {
          name: "Strength Builder",
          description:
            "Hybrid weightlifting, powerlifting, and bodybuilding training",
          tags: ["Weightlifting", "Strength Training", "Medium"],
          goals: [
            {
              name: "Attend 5 sessions",
              points: 4,
              totalPossiblePoints: 5,
              pointsUnit: "session",
            },
            {
              name: "Achieve a personal record in the squat",
              points: 0,
              totalPossiblePoints: 1,
              pointsUnit: "PR Achieved",
            },
          ],
          createdBy: "dummy-user-id-1",
          id: "dummy-user-id-2",
          createdAt: "2025-07-20T23:13:07.391Z",
          updatedAt: "2025-07-21T23:15:07.391Z",
        },
        {
          name: "Mindful Meditation",
          description: "Daily mindfulness practice for improved mental health",
          tags: ["Mental Health", "Mindfulness", "Medium"],
          goals: [
            {
              name: "Attend 5 sessions in a row",
              points: 3,
              totalPossiblePoints: 5,
              pointsUnit: "session",
            },
            {
              name: "Perform 2 sessions in a day",
              points: 1,
              totalPossiblePoints: 2,
              pointsUnit: "session",
            },
          ],
          createdBy: "dummy-user-id-1",
          id: "dummy-user-id-2",
          createdAt: "2025-07-24T13:13:07.391Z",
          updatedAt: "2025-07-24T12:13:07.391Z",
        },
      ];
      setMyChallenges(result ?? []);
    };

    getChallenges();
  }, []);

  const getProgressLabel = (progress: number) => {
    if (progress < 50) {
      return "Pushing Hard";
    } else if (progress <= 65) {
      return "Consistent";
    } else if (progress <= 80) {
      return "On Track";
    } else if (progress < 100) {
      return "Almost there!";
    } else {
      return "Achieved";
    }
  };

  return (
    <GestureHandlerRootView>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Active Challenges</Text>
        {myChallenges.map((challenge) => {
          const mostComplete = [...challenge.goals].sort((g1, g2) => {
            const progress1 = g1.points / g1.totalPossiblePoints;
            const progress2 = g2.points / g2.totalPossiblePoints;
            return progress2 - progress1;
          })[0];
          const mostCompleteProgress = Math.floor(
            (mostComplete.points / mostComplete.totalPossiblePoints) * 100
          );

          return (
            <View key={`${challenge.name}`} style={styles.challengeContainer}>
              <View style={styles.challengeTitleContainer}>
                <Text style={styles.challengeTitle}>{challenge.name}</Text>
                <Text style={styles.challengeDescription}>
                  {challenge.description}
                </Text>
              </View>
              <View style={styles.challengeProgressContainer}>
                <View style={styles.challengeProgressBar}>
                  <View
                    style={{
                      width: `${mostCompleteProgress}%`,
                      ...styles.challengeProgressFiller,
                    }}
                  />
                </View>
                <Text
                  style={styles.progressPercent}
                >{`${mostCompleteProgress}%`}</Text>
              </View>
              <View style={styles.challengeProgressDetailsContainer}>
                <Text style={styles.goalName}>{mostComplete.name}</Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <Text style={styles.goalProgressCounter}>{`${
                    mostComplete.points
                  } / ${mostComplete.totalPossiblePoints} ${
                    mostComplete.pointsUnit
                  }${mostComplete.points < 2 ? "" : "s"}`}</Text>
                  <Text style={styles.progressLabel}>
                    {getProgressLabel(mostCompleteProgress)}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 14,
    backgroundColor: "#d3edf0",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  challengeTitleContainer: {
    marginBottom: 20,
  },
  challengeTitle: {
    fontSize: 16,
  },
  challengeDescription: {
    fontSize: 12,
  },
  challengeContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    flexDirection: "column",
    gap: 8,
  },
  challengeProgressContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  challengeProgressBar: {
    backgroundColor: "#d3edf0",
    borderRadius: 4,
    height: 6,
    width: "91%",
  },
  challengeProgressFiller: {
    backgroundColor: "#31e7f7",
    height: 6,
    borderRadius: 4,
  },
  progressPercent: {
    fontSize: 12,
  },
  challengeProgressDetailsContainer: {
    marginTop: -2,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  goalName: {
    fontSize: 10,
  },
  goalProgressCounter: {
    fontSize: 10,
  },
  progressLabel: {
    backgroundColor: "#ebbcc6",
    color: "#bf0029",
    fontSize: 10,
    padding: 4,
    borderRadius: 3,
  },
});

export default MyChallenges;
