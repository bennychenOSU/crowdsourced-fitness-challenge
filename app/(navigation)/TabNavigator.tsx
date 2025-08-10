import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChallengesScreen from '../(screens)/challenges';
import MyChallenges from '../(screens)/my-challenges';
import ProfileScreen from '../(screens)/profile';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    console.log("Tab nav");
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    display: 'flex',
                    backgroundColor: 'white',
                },
            }}
        >
            <Tab.Screen 
                name="Profile" 
                component={ProfileScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen 
                name="MyChallenges" 
                component={MyChallenges}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="trophy" color={color} size={size} />
                    ),
                }}
            />

             <Tab.Screen 
                name="Challenges" 
                component={ChallengesScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}