import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
	View,
	Text,
	FlatList,
	Button,
	StyleSheet,
	ActivityIndicator,
	Image,
} from "react-native";
import { Icon } from "react-native-elements";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import ExplorerScreen from "../screens/customer/ExplorerScreen";
import FavoriteScreen from "../screens/customer/FavoriteScreen";
import MapScreen from "../screens/customer/MapScreen";
import SearchScreen from "../screens/customer/SearchScreen";
import Colors from "../constants/Colors";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = (props) => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Homepage"
					component={TabNavigator}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					options={{
						headerShown: false,
					}}
					name="Welcome"
					component={WelcomeScreen}
				/>
				<Stack.Screen
					name="Login"
					component={LoginScreen}
					options={{
						headerShown: false,
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};
const TabNavigator = (props) => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: Colors.accent,
				},
				headerTintColor: "white",
				headerTitleAlign: "center",
				headerTitleStyle: {
					fontFamily: "roboto-font",
					fontSize: 30,
				},
				tabBarActiveTintColor: Colors.accent,
				tabBarInactiveTintColor: "white",
				tabBarStyle: {
					height: "8%",
					backgroundColor: Colors.accent,
					shadowColor: "black",
					shadowOpacity: 0.26,
					shadowOffset: { width: 0, height: 2 },
					shadowRadius: 8,
					elevation: 5,
				},
				tabBarActiveBackgroundColor: "white",
				tabBarItemStyle: {},
				headerLeft: (props) => <View></View>,
			}}
		>
			<Tab.Screen
				name="Esplora"
				component={ExplorerScreen}
				options={{
					tabBarLabel: "Esplora",
					tabBarLabelStyle: {
						fontSize: 16,
						marginBottom: 5,
					},
					tabBarIcon: ({ color, size }) => (
						<Icon
							name="eye"
							color={color}
							size={40}
							type="evilicon"
							style={{ marginTop: 10 }}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Cerca"
				component={SearchScreen}
				options={{
					tabBarLabel: "Cerca",
					tabBarLabelStyle: {
						fontSize: 16,
						marginBottom: 5,
					},
					tabBarIcon: ({ color, size }) => (
						<Icon
							name="search"
							color={color}
							size={40}
							type="evilicon"
							style={{ marginTop: 10 }}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Mappa"
				component={MapScreen}
				options={{
					tabBarLabel: "Mappa",
					tabBarLabelStyle: {
						fontSize: 16,
						marginBottom: 5,
					},
					tabBarIcon: ({ color, size }) => (
						<Icon
							name="location"
							color={color}
							size={40}
							type="evilicon"
							style={{ marginTop: 8 }}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="I miei Preferiti"
				component={FavoriteScreen}
				options={{
					tabBarLabel: "Preferiti",
					tabBarLabelStyle: {
						fontSize: 16,
						marginBottom: 5,
					},
					tabBarIcon: ({ color, size }) => (
						<Icon
							name="star"
							color={color}
							size={40}
							type="evilicon"
							style={{ marginTop: 10 }}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default AppNavigator;
