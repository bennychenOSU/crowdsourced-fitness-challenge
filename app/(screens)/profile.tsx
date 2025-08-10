// src/screens/ProfileScreen.tsx
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { StackNavigationProp } from '@react-navigation/stack';
import AchievementCard from '../(components)/achievement-cards';
import { RootStackParamList } from '../(navigation)/types';
import { logout, subscribeToAuth } from '../../firebase/auth';
import { getUserProfileFromFirestore } from '../../firebase/db';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'profile'>;
export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [firestoreProfile, setFirestoreProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  // State for settings toggles (mocked)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [appThemeDark, setAppThemeDark] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (currentUser) => { 
      console.log(currentUser)
      setUser(currentUser);
      if (currentUser) {
        const data = await getUserProfileFromFirestore(currentUser.uid);
        setFirestoreProfile(data);
      } else {
        setFirestoreProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logout(); // Your auth functions
      console.log('User logged out successfully');
      // Navigate to login or home screen, replacing the current stack
      navigation.replace('login'); // Assuming 'Login' is your login screen route name
    } catch (error) {
      console.error('Error logging out:', error);
      // Optionally show an alert
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading profile...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noUserText}>Please log in to view your profile.</Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginButtonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const profileDescriptionText = firestoreProfile?.bio || "Fitness enthusiast dedicated to a healthy lifestyle and personal growth. Sharing my journey and inspiring others!";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        {/* Header Section */}
        <LinearGradient
          colors={['#8E7BFD', '#C8B0FE']} // Adjust gradient colors as per image_687d9a.png
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerContainer}
        >
          <View style={styles.headerTopBar}>
            {/* Back Arrow - if this screen is part of a stack where you can go back */}
            {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity> */}
            <View style={styles.headerIcons}>
                <TouchableOpacity onPress={() => console.log('Bell pressed')}>
                    <MaterialCommunityIcons name="bell-outline" size={24} color="#fff" style={styles.headerIcon} />
                </TouchableOpacity>
                {user.photoURL ? (
                    <Image source={{ uri: user.photoURL }} style={styles.smallProfileIcon} />
                ) : (
                    <View style={styles.smallProfileIconPlaceholder}>
                        <Text style={styles.smallProfileIconText}>JD</Text>
                    </View>
                )}
            </View>
          </View>

          <View style={styles.profileInfo}>
            {user.photoURL ? (
              <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
            ) : (
              <View style={[styles.profileImage, styles.noPhotoImage]}>
                <Text style={styles.noPhotoText}>
                    {(user.displayName?.charAt(0) || user.email?.charAt(0) || 'U').toUpperCase()}
                    {(user.displayName?.charAt(1) || user.email?.charAt(1) || 'N').toUpperCase()}
                </Text>
              </View>
            )}
            <Text style={styles.profileName}>{firestoreProfile?.name || user.displayName || 'Fitness Enthusiast'}</Text>
            <Text style={styles.profileDescription}>
              {profileDescriptionText}
            </Text>
            <TouchableOpacity
              style={styles.editProfileButton}
              onPress={() => navigation.navigate('updateProfile')}
            >
              <Text style={styles.editProfileButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Current Challenges Section (Mocked - data not from Firebase in this example) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Challenges</Text>

          <TouchableOpacity
              style={styles.createChallengeButton}
              onPress={() => navigation.navigate('CreateChallenge')}
            >
              <Text style={styles.editProfileButtonText}>Create Challenge</Text>
            </TouchableOpacity>
 
          <View style={styles.card}>
            <Text style={styles.cardTitle}>30-Day Plank Challenge</Text>
            <Text style={styles.cardDescription}>Strengthen your core in just one month</Text>
            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBarFill, { width: '70%' }]} />
            </View>
            <TouchableOpacity style={styles.viewDetailsButton}>
              <Text style={styles.viewDetailsButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Running 5K Readiness</Text>
            <Text style={styles.cardDescription}>Prepare for your first 5K with Guided runs</Text>
            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBarFill, { width: '40%' }]} />
            </View>
            <TouchableOpacity style={styles.viewDetailsButton}>
              <Text style={styles.viewDetailsButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>

           <TouchableOpacity
              style={styles.createChallengeButton}
              onPress={() => navigation.navigate('MyChallenges')}
            >
              <Text style={styles.editProfileButtonText}>My Challenges</Text>
            </TouchableOpacity>
        </View>

        {/* Achievements Section (Mocked - data not from Firebase in this example) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            <AchievementCard icon="run" title="First Mile" description="Completed your first recorded mile!" date="2023.07.20" colors={['#b0f2c2', '#d9ffeb']} />
            <AchievementCard icon="water" title="Hydration Hero" description="Logged water for 7 consecutive days!" date="2023.07.20" colors={['#a8e6cf', '#d6f5e9']} />
            <AchievementCard icon="weight-lifter" title="Strength Builder I" description="Completed 10 strength training workouts" date="2023.07.20" colors={['#c0c0f0', '#e0e0f8']} />
            <AchievementCard icon="calendar-check" title="Consistency King" description="Logged activity for 30 days straight." date="2023.07.20" colors={['#ffe4b5', '#fff0d9']} />
          </View>
          <TouchableOpacity style={styles.viewAllAchievementsButton}>
            <Text style={styles.viewDetailsButtonText}>View All Achievements</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('updateProfile')}>
            <View style={styles.settingLeft}>
              <MaterialCommunityIcons name="account-cog-outline" size={24} color="#666" />
              <Text style={styles.settingText}>Account Settings</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#aaa" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <MaterialCommunityIcons name="shield-lock-outline" size={24} color="#666" />
              <Text style={styles.settingText}>Privacy Settings</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#aaa" />
          </TouchableOpacity>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <MaterialCommunityIcons name="bell-outline" size={24} color="#666" />
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={notificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setNotificationsEnabled(previousState => !previousState)}
              value={notificationsEnabled}
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <MaterialCommunityIcons name="theme-light-dark" size={24} color="#666" />
              <Text style={styles.settingText}>App Theme</Text>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={appThemeDark ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setAppThemeDark(previousState => !previousState)}
              value={appThemeDark}
            />
          </View>
          {/* Logout button as part of settings or quick actions, based on image */}
          <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
              <View style={styles.settingLeft}>
                  <MaterialCommunityIcons name="logout" size={24} color="#666" />
                  <Text style={styles.settingText}>Logout</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#aaa" />
          </TouchableOpacity>
        </View>

        {/* Quick Actions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <QuickActionButton icon="run" text="Track Workout" />
            <QuickActionButton icon="target" text="My Goals" />
            <QuickActionButton icon="share-variant" text="Share Profile" />
            <QuickActionButton icon="lightbulb-on-outline" text="Daily Insights" />
          </View>
        </View>

        {/* Bottom Navigation (Placeholder) */}
        {/* This would typically be handled by a Tab Navigator in React Navigation */}
        <View style={styles.bottomNavPlaceholder}>
            <Text style={styles.bottomNavText}>Bottom Navigation (e.g., Home, Activity, Profile, Community, More)</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

// --- Helper Components for readability ---

interface AchievementCardProps {
  icon: string;
  title: string;
  description: string;
  date: string;
  colors: string[]; // Gradient colors for the card background
}



interface QuickActionButtonProps {
  icon: string;
  text: string;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ icon, text }) => (
  <TouchableOpacity style={quickActionButtonStyles.button}>
    <MaterialCommunityIcons name={icon} size={30} color="#6200EE" />
    <Text style={quickActionButtonStyles.text}>{text}</Text>
  </TouchableOpacity>
);

const quickActionButtonStyles = StyleSheet.create({
    button: {
      width: '48%', // Approx half with spacing
      aspectRatio: 1, // Make it square
      backgroundColor: 'white',
      borderRadius: 15,
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    text: {
      fontSize: 12,
      fontWeight: '600',
      marginTop: 8,
      textAlign: 'center',
      color: '#333',
    },
  });

// --- Main Styles for ProfileScreen ---

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Background color for areas not covered by gradient
  },
  scrollView: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  noUserText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerContainer: {
    width: '100%',
    paddingTop: 0, // Adjusted padding
    paddingHorizontal: 20,
    paddingBottom: 40, // More padding at the bottom for content
    borderBottomLeftRadius: 30, // Rounded bottom corners
    borderBottomRightRadius: 30,
    overflow: 'hidden', // Ensures radius works
    alignItems: 'center',
  },
  headerTopBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end', // Aligns icons to the right
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 0 : 40, // Adjust for status bar on Android
    paddingBottom: 10,
  },
  // backButton: {
  //   marginRight: 'auto', // Pushes it to the left
  // },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 15,
  },
  smallProfileIcon: {
      width: 35,
      height: 35,
      borderRadius: 17.5,
      borderWidth: 1,
      borderColor: 'white',
  },
  smallProfileIconPlaceholder: {
      width: 35,
      height: 35,
      borderRadius: 17.5,
      backgroundColor: 'rgba(255,255,255,0.3)',
      alignItems: 'center',
      justifyContent: 'center',
  },
  smallProfileIconText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 20, // Space below header top bar
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
    marginBottom: 10,
    backgroundColor: '#ccc', // Placeholder color
  },
  noPhotoImage: {
    backgroundColor: '#6A5ACD', // Darker background for initials
    alignItems: 'center',
    justifyContent: 'center',
  },
  noPhotoText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  profileDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginHorizontal: 20,
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
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },

  createChallengeButton: {
    backgroundColor: 'white',
    width: '15%',
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  editProfileButtonText: {
    color: '#8E7BFD', // Match header gradient start color
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  cardDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 10,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    width: '100%',
    marginBottom: 15,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#90EE90', // Light green
    borderRadius: 4,
  },
  viewDetailsButton: {
    backgroundColor: '#f0f0f0', // Light grey background
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start', // Align to left
  },
  viewDetailsButtonText: {
    color: '#666',
    fontSize: 13,
    fontWeight: '600',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  viewAllAchievementsButton: {
    backgroundColor: '#e6ffe6', // Very light green
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 15,
    borderColor: '#90EE90',
    borderWidth: 1,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  bottomNavPlaceholder: {
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0, // For iPhone X and newer bottom safe area
  },
  bottomNavText: {
      color: '#aaa',
      fontSize: 12,
  },
});
