import { LinearGradient } from 'expo-linear-gradient'; // Or 'react-native-linear-gradient' for bare RN
import { StyleSheet, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Or other icon sets

interface AchievementCardProps {
  icon: string;
  title: string;
  description: string;
  date: string;
  colors: [string, string]; // Gradient colors for the card background
}

export default function AchievementCard({ icon, title, description, date, colors } : AchievementCardProps) {
  
    return (
  <LinearGradient
    colors={colors}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={achievementCardStyles.card}
  >
    <MaterialCommunityIcons name={icon} size={30} color="#333" />
    <Text style={achievementCardStyles.title}>{title}</Text>
    <Text style={achievementCardStyles.description}>{description}</Text>
    <Text style={achievementCardStyles.date}>{date}</Text>
  </LinearGradient>
  )
}

const achievementCardStyles = StyleSheet.create({
    card: {
      width: '48%', // Approx half with some spacing
      aspectRatio: 1, // Make it square
      borderRadius: 15,
      padding: 15,
      alignItems: 'flex-start',
      justifyContent: 'space-between', // Distribute content
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 5,
      color: '#333',
    },
    description: {
      fontSize: 10,
      color: '#666',
      marginTop: 2,
    },
    date: {
      fontSize: 9,
      color: '#888',
      marginTop: 5,
    },
  });
