import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Image,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { CommentSection } from "@/components/CommentSection";
import { auth, db } from "@/firebaseConfig";
import {
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const { height: screenHeight } = Dimensions.get('window');

export default function ChallengeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<any | null>(null);
  const [joined, setJoined] = useState<boolean>(false);
  const [count, setCount] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'comments'>('details');

  useEffect(() => {
    if (!id) return;
    const ref = doc(db, "challenges", String(id));
    const unsub = onSnapshot(
      ref,
      (snap) => {
        setItem({ id: snap.id, ...snap.data() });
        setLoading(false);
      },
      (err) => {
        console.warn("challenge detail error", err);
        setLoading(false);
      }
    );
    return () => unsub();
  }, [id]);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!id || !uid) {
      setJoined(false);
      return;
    }
    const pref = doc(db, "challenges", String(id), "participants", uid);
    const unsub = onSnapshot(pref, (snap) => setJoined(snap.exists()));
    return () => unsub();
  }, [id, auth.currentUser?.uid]);

  useEffect(() => {
    if (!id) return;
    const cref = collection(db, "challenges", String(id), "participants");
    const unsub = onSnapshot(cref, (snap) => setCount(snap.size));
    return () => unsub();
  }, [id]);

  const onJoin = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      router.push("/(auth)/sign-in");
      return;
    }
    const pref = doc(db, "challenges", String(id), "participants", uid);
    const cref = doc(db, "challenges", String(id));
    await runTransaction(db, async (tx) => {
      const [pSnap, cSnap] = await Promise.all([tx.get(pref), tx.get(cref)]);
      if (!pSnap.exists()) {
        const current = (cSnap.data()?.participantsCount || 0) as number;
        tx.set(pref, { joinedAt: serverTimestamp(), uid });
        tx.update(cref, { participantsCount: current + 1 });
      }
    });
  };

  const onLeave = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      router.push("/(auth)/sign-in");
      return;
    }
    const pref = doc(db, "challenges", String(id), "participants", uid);
    const cref = doc(db, "challenges", String(id));
    await runTransaction(db, async (tx) => {
      const [pSnap, cSnap] = await Promise.all([tx.get(pref), tx.get(cref)]);
      if (pSnap.exists()) {
        const current = (cSnap.data()?.participantsCount || 0) as number;
        tx.delete(pref);
        tx.update(cref, { participantsCount: Math.max(0, current - 1) });
      }
    });
  };

  if (loading)
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
      </ThemedView>
    );
  if (!item)
    return (
      <ThemedView style={styles.center}>
        <ThemedText>Not found</ThemedText>
      </ThemedView>
    );

  const renderDetailsTab = () => (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {item.imageUrl && (
        <Image source={{ uri: item.imageUrl }} style={styles.heroImage} />
      )}
      <ThemedText type="title" style={styles.title}>
        {item.title}
      </ThemedText>
      <View style={styles.badgeContainer}>
        {item.category && (
          <ThemedText style={[styles.badge, styles.categoryBadge]}>
            {item.category}
          </ThemedText>
        )}
        {item.difficulty && (
          <ThemedText
            style={[styles.badge, styles[`${item.difficulty}Badge`]]}
          >
            {item.difficulty}
          </ThemedText>
        )}
      </View>
      <ThemedText type="subtitle">Details</ThemedText>
      {item.startsAt && (
        <ThemedText style={styles.detailText}>
          Starts:{" "}
          {item.startsAt.toDate
            ? item.startsAt.toDate().toISOString().slice(0, 10)
            : String(item.startsAt)}
        </ThemedText>
      )}
      {item.endsAt && (
        <ThemedText style={styles.detailText}>
          Ends:{" "}
          {item.endsAt.toDate
            ? item.endsAt.toDate().toISOString().slice(0, 10)
            : String(item.endsAt)}
        </ThemedText>
      )}
      {Array.isArray(item.tags) && item.tags.length > 0 && (
        <>
          <ThemedText type="subtitle">Tags</ThemedText>
          <View style={styles.tagsContainer}>
            {item.tags.map((t: string) => (
              <ThemedText key={t} style={styles.tag}>
                #{t}
              </ThemedText>
            ))}
          </View>
        </>
      )}
      {typeof count === "number" && (
        <>
          <ThemedText type="subtitle">Participants</ThemedText>
          <ThemedText style={styles.detailText}>
            {count} participant{count === 1 ? "" : "s"}
          </ThemedText>
        </>
      )}
      {item.description && (
        <>
          <ThemedText type="subtitle">Description</ThemedText>
          <ThemedText style={styles.description}>
            {item.description}
          </ThemedText>
        </>
      )}

      <View style={styles.buttonContainer}>
        {joined ? (
          <Pressable
            style={[styles.button, styles.leaveButton]}
            onPress={onLeave}
          >
            <ThemedText style={styles.buttonText}>Leave</ThemedText>
          </Pressable>
        ) : (
          <Pressable
            style={[styles.button, styles.joinButton]}
            onPress={onJoin}
          >
            <ThemedText style={styles.buttonText}>Join</ThemedText>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, activeTab === 'details' && styles.activeTab]}
          onPress={() => setActiveTab('details')}
        >
          <ThemedText style={[
            styles.tabText,
            activeTab === 'details' && styles.activeTabText
          ]}>
            Details
          </ThemedText>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'comments' && styles.activeTab]}
          onPress={() => setActiveTab('comments')}
        >
          <ThemedText style={[
            styles.tabText,
            activeTab === 'comments' && styles.activeTabText
          ]}>
            Comments
          </ThemedText>
        </Pressable>
      </View>

      {/* Tab Content */}
      <View style={styles.tabContent}>
        {activeTab === 'details' ? renderDetailsTab() : (
          <CommentSection challengeId={String(id)} />
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
  },
  activeTabText: {
    color: "#2563eb",
    fontWeight: "600",
  },
  tabContent: {
    flex: 1,
  },
  scrollContainer: { gap: 16 },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  badgeContainer: { flexDirection: "row", gap: 8, marginBottom: 12 },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: "500",
  },
  categoryBadge: { backgroundColor: "#e0f2fe", color: "#0369a1" },
  easyBadge: { backgroundColor: "#dcfce7", color: "#166534" },
  mediumBadge: { backgroundColor: "#fef3c7", color: "#92400e" },
  hardBadge: { backgroundColor: "#fee2e2", color: "#991b1b" },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: "#eef2ff",
    color: "#4338ca",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
    fontSize: 12,
  },
  detailText: { marginBottom: 8 },
  description: { marginBottom: 16 },
  buttonContainer: { flexDirection: "row", gap: 12, marginTop: 16 },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  joinButton: { backgroundColor: "#16a34a" },
  leaveButton: { backgroundColor: "#ef4444" },
  buttonText: { color: "white", fontWeight: "600" },
});
