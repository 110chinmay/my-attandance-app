import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import {MyTeam,Me,Home} from "../Screens"

const Tab = createBottomTabNavigator();
const TabNavigation = () => {
    return (
        <Tab.Navigator 
         screenOptions={{ headerShown: false }}
        >
            <Tab.Screen options={{
                tabBarLabel: "Home", tabBarIcon: ({ color, size }) => {
                    return <Ionicons name="home-sharp" size={size} color={color} />
                }
            }} name="HomeTab" component={Home} />
            <Tab.Screen options={{
                tabBarLabel: "Team", tabBarIcon: ({ color, size }) => {
                    return <Ionicons name="people" size={size} color={color} />
                }
            }} name="Team" component={MyTeam} />
            <Tab.Screen options={{
                tabBarLabel: "Profile", tabBarIcon: ({ color, size }) => {
                    return <Ionicons name="person" size={size} color={color} />
                }
            }} name="Profile" component={Me} />
        </Tab.Navigator>
    )
}

export default TabNavigation