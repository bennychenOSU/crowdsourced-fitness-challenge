// profile.tsx
import { RootStackParamList } from '@/types';
import { StackNavigationProp } from '@react-navigation/stack';
// IMPORTANT: Change import from 'expo-router' to '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'; //
import React from 'react';
import { Button, Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // For handling notches and status bars


type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export default function MyProfileScreen() {
  
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(true);
  // Renamed 'navigate' to 'navigation' for standard practice clarity.
  const navigation = useNavigation<ProfileScreenNavigationProp>(); //

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>My Profile</Text>
          </View>

          {/* Profile Card Section */}
          <View style={styles.profileCard}>
            <Image
              source={require('@/assets/images/blank-profile.png')}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>Jane Doe</Text>
            <Text style={styles.profileDescription}>
              Intro
            </Text>
            <TouchableOpacity style={styles.editProfileButton}>
              <Button title='Edit Profile' onPress={ () => navigation.navigate("updateUserProfile")}></Button> {/* */}
            </TouchableOpacity>
          </View>

          {/* Current Challenges Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Current Challenges</Text>

            {/* Challenge Card 1 */}
            <View style={styles.challengeCard}>
              <View style={styles.challengeHeader}>
                <View style={styles.challengeIconPlaceholder} /> {/* Icon placeholder */}
                <View>
                  <Text style={styles.challengeTitle}>30-Day Plank Challenge</Text>
                  <Text style={styles.challengeSubtitle}>Strengthen your core in just one mon</Text>
                </View>
              </View>
              <View style={styles.progressBarBackground}>
                <View style={styles.progressBarFill} /> {/* Filled part of progress bar */}
              </View>
              <TouchableOpacity style={styles.viewDetailsButton}>
                <Text style={styles.viewDetailsButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>

            {/* Challenge Card 2 */}
            <View style={styles.challengeCard}>
              <View style={styles.challengeHeader}>
                <View style={styles.challengeIconPlaceholder} /> {/* Icon placeholder */}
                <View>
                  <Text style={styles.challengeTitle}>Running 5K Readiness</Text>
                  <Text style={styles.challengeSubtitle}>Prepare for your first run with Guided ru</Text>
                </View>
              </View>
              <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: '30%' }]} /> {/* Example different progress */}
              </View>
              <TouchableOpacity style={styles.viewDetailsButton}>
                <Text style={styles.viewDetailsButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Achievements Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements</Text>

            <View style={styles.achievementsGrid}>
              {/* Achievement Card 1 */}
              <View style={styles.achievementCard}>
                <View style={styles.achievementIconPlaceholder} />
                <Text style={styles.achievementTitle}>First Mile</Text>
                <Text style={styles.achievementSubtitle}>Completed your first recorded mile!</Text>
                <Text style={styles.achievementDate}>2023.09.28</Text>
              </View>

              {/* Achievement Card 2 */}
              <View style={styles.achievementCard}>
                <View style={styles.achievementIconPlaceholder} />
                <Text style={styles.achievementTitle}>Hydration Hero</Text>
                <Text style={styles.achievementSubtitle}>Logged water for 7 consecutive days!</Text>
                <Text style={styles.achievementDate}>2023.07.20</Text>
              </View>

              {/* Achievement Card 3 */}
              <View style={styles.achievementCard}>
                <View style={styles.achievementIconPlaceholder} />
                <Text style={styles.achievementTitle}>Strength Builder I</Text>
                <Text style={styles.achievementSubtitle}>Completed 10 strength training workouts</Text>
                <Text style={styles.achievementDate}>2023.08.15</Text>
              </View>

              {/* Achievement Card 4 */}
              <View style={styles.achievementCard}>
                <View style={styles.achievementIconPlaceholder} />
                <Text style={styles.achievementTitle}>Consistency King</Text>
                <Text style={styles.achievementSubtitle}>Logged activity for 30 days straight.</Text>
                <Text style={styles.achievementDate}>2023.09.22</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.viewAllAchievementsButton}>
              <Text style={styles.viewAllAchievementsButtonText}>View All Achievements</Text>
            </TouchableOpacity>
          </View>

          {/* Settings Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>

            {/* Setting Item: Account Settings */}
            <TouchableOpacity style={styles.settingsItem}>

              <Text style={styles.settingsItemText}>Account Settings</Text>

            </TouchableOpacity>

            {/* Setting Item: Privacy Settings */}
            <TouchableOpacity style={styles.settingsItem}>

              <Text style={styles.settingsItemText}>Privacy Settings</Text>

            </TouchableOpacity>

            {/* Setting Item: Notifications */}
            <View style={styles.settingsItem}>

              <Text style={styles.settingsItemText}>Notifications</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isNotificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setIsNotificationsEnabled}
                value={isNotificationsEnabled}
              />
            </View>

            {/* Setting Item: App Theme */}
            <TouchableOpacity style={styles.settingsItem}>

              <Text style={styles.settingsItemText}>App Theme</Text>

            </TouchableOpacity>
          </View>

          {/* Quick Actions Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              {/* Quick Action Card 1 */}
              <TouchableOpacity style={styles.quickActionCard}>

                <Text style={styles.quickActionText}>Track Workout</Text>
              </TouchableOpacity>
              {/* Quick Action Card 2 */}
              <TouchableOpacity style={styles.quickActionCard}>

                <Text style={styles.quickActionText}>My Goals</Text>
              </TouchableOpacity>
              {/* Quick Action Card 3 */}
              <TouchableOpacity style={styles.quickActionCard}>

                <Text style={styles.quickActionText}>Share Profile</Text>
              </TouchableOpacity>
              {/* Quick Action Card 4 */}
              <TouchableOpacity style={styles.quickActionCard}>

                <Text style={styles.quickActionText}>Daily Insights</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Bottom Navigation (Simplified Placeholder) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>

          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>

          <Text style={styles.navText}>Activity</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>

          <Text style={[styles.navText, styles.navTextActive]}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>More</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8', // Light background for the overall screen
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8', // Consistent background
    paddingBottom: 20, // Padding for content above bottom nav/footer
  },
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white', // Header background
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallProfilePicPlaceholder: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#CCC', // Placeholder color
    marginLeft: 15,
  },

  // Profile Card Styles
  profileCard: {
    backgroundColor: '#E6E6FA', // Light purple/peach gradient-like background
    margin: 20,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    // The image suggests a gradient here, for simplicity, using a solid color
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Makes it circular
    borderWidth: 3,
    borderColor: 'white', // White border around image
    marginBottom: 10,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  profileDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  editProfileButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  editProfileButtonText: {
    color: '#6A5ACD', // Purple color
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Section General Styles
  section: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },

  // Challenge Card Styles
  challengeCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  challengeIconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0BBE4', // Example icon background color
    marginRight: 10,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  challengeSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  progressBarBackground: {
    height: 8,
    width: '100%',
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden', // Ensures fill stays within bounds
    marginBottom: 15,
  },
  progressBarFill: {
    height: '100%',
    width: '70%', // Example progress fill
    backgroundColor: '#A2E8B1', // Greenish fill color
    borderRadius: 4,
  },
  viewDetailsButton: {
    backgroundColor: '#EBF9F0', // Light green background
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  viewDetailsButtonText: {
    color: '#4CAF50', // Darker green text
    fontWeight: 'bold',
    fontSize: 14,
  },

  // Achievements Grid Styles
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: '48%', // Approx half width for two columns
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'flex-start', // Align content to the left inside the card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  achievementIconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#A2E8B1', // Example icon background
    marginBottom: 10,
  },
  achievementTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  achievementSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  achievementDate: {
    fontSize: 11,
    color: '#999',
  },
  viewAllAchievementsButton: {
    backgroundColor: '#D1E7DD', // Light green/gray background
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  viewAllAchievementsButtonText: {
    color: '#28A745', // Darker green text
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Settings Item Styles
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingsItemText: {
    flex: 1, // Takes up available space
    fontSize: 16,
    color: '#333',
  },

  // Quick Actions Grid Styles
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%', // Approx half width for two columns
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  quickActionText: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },

  // Bottom Navigation Styles
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingVertical: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  navItemActive: {
    // Styles for the active tab (e.g., Profile in the image)
    // You might add an underline, a different background, etc.
    // For this skeleton, we'll just change text color
  },
  navText: {
    fontSize: 12,
    color: '#888',
    marginTop: 3,
  },
  navTextActive: {
    color: '#6A5ACD', // Active tab text color
    fontWeight: 'bold',
  },
});