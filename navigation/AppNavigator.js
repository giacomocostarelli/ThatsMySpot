import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import Colors from "../constants/Colors";

import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import ExplorerScreen from "../screens/customer/ExplorerScreen";
import FavoriteScreen from "../screens/customer/FavoriteScreen";
import MapScreen from "../screens/customer/MapScreen";
import SearchScreen from "../screens/customer/SearchScreen";
import RestaurantDetailsScreen from "../screens/customer/RestaurantDetailsScreen";
import ReservationScreen from "../screens/merchant/ReservationScreen";
import MyRestaurantScreen from "../screens/merchant/MyRestaurantScreen";
import TakeAwayScreen from "../screens/merchant/TakeAwayScreen";
import ProfileScreen from "../screens/customer/ProfileScreen";

import { logout } from "../store/actions/auth";
import { useDispatch } from "react-redux";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TabMerchant = createBottomTabNavigator();

const AppNavigator = (props) => {
	const dispatch = useDispatch();

	return (
		<NavigationContainer theme={{ colors: { background: "#3674A1" } }}>
			<Stack.Navigator>
				<Stack.Screen
					name="Login"
					component={LoginScreen}
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
					name="Homepage"
					component={TabNavigator}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="Profile"
					component={ProfileScreen}
					options={{
						title: "Torna",
						headerStyle: {
							backgroundColor: Colors.accent,
						},
						headerTitleAlign: "left",
						headerTintColor: "white",
						headerTitleStyle: {
							fontFamily: "roboto-font",
						},
					}}
				/>
				<Stack.Screen
					name="HomepageMerchant"
					component={TabNavigatorMerchant}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="Details"
					component={RestaurantDetailsScreen}
					options={{
						title: "Torna",
						headerStyle: {
							backgroundColor: Colors.accent,
						},
						headerTitleAlign: "left",
						headerTintColor: "white",
						headerTitleStyle: {
							fontFamily: "roboto-font",
						},
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

// CUSTOMER
const TabNavigator = ({ navigation }) => {
	const dispatch = useDispatch();
	const logoutHandler = () => {
		dispatch(logout());
	};

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
				tabBarActiveTintColor: "white",
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
				tabBarActiveBackgroundColor: Colors.secondary,
				tabBarItemStyle: {},
				headerRight: (props) => (
					<View style={{ marginHorizontal: 20 }}>
						<Icon
							name="logout"
							color="white"
							size={25}
							type="material-community"
							style={{ marginTop: 10 }}
							onPress={() => {
								logoutHandler();
								navigation.replace("Login");
							}}
						/>
					</View>
				),
				headerLeft: (props) => (
					<View style={{ marginHorizontal: 20 }}>
						<Icon
							name="account-outline"
							color="white"
							size={25}
							type="material-community"
							style={{ marginTop: 10 }}
							onPress={() => {
								navigation.navigate("Profile");
							}}
						/>
					</View>
				),
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

// MERCHANT
const TabNavigatorMerchant = ({ navigation }) => {
	const dispatch = useDispatch();
	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<TabMerchant.Navigator
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
				tabBarActiveTintColor: "white",
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
				tabBarActiveBackgroundColor: Colors.secondary,
				tabBarItemStyle: {},
				headerRight: (props) => (
					<View style={{ marginHorizontal: 10 }}>
						<Icon
							name="sign-out"
							color="white"
							size={25}
							type="font-awesome"
							style={{ marginTop: 10 }}
							onPress={() => {
								logoutHandler();
								navigation.replace("Login");
							}}
						/>
					</View>
				),
				headerLeft: (props) => (
					<View style={{ marginHorizontal: 20 }}>
						<Icon
							name="account-outline"
							color="white"
							size={25}
							type="material-community"
							style={{ marginTop: 10 }}
							onPress={() => {
								navigation.navigate("Profile");
							}}
						/>
					</View>
				),
			}}
		>
			<TabMerchant.Screen
				name="Prenotazioni"
				component={ReservationScreen}
				options={{
					tabBarLabel: "Prenotazioni",
					tabBarLabelStyle: {
						fontSize: 16,
						marginBottom: 5,
					},
					tabBarIcon: ({ color, size }) => (
						<Icon
							name="calendar"
							color={color}
							size={30}
							type="evilicon"
							style={{ marginTop: 10 }}
						/>
					),
				}}
			/>
			<TabMerchant.Screen
				name="Take Away"
				component={TakeAwayScreen}
				options={{
					screenBackgroundColor: "red",

					tabBarLabel: "Take Away",
					tabBarLabelStyle: {
						fontSize: 16,
						marginBottom: 5,
					},
					tabBarIcon: ({ color, size }) => (
						<Icon
							name="food-outline"
							color={color}
							size={20}
							type="material-community"
							style={{ marginTop: 10 }}
						/>
					),
				}}
			/>
			<TabMerchant.Screen
				name="Il mio ristorante"
				component={MyRestaurantScreen}
				options={{
					screenBackgroundColor: "#f00",

					tabBarLabel: "Il mio ristorante",
					tabBarLabelStyle: {
						fontSize: 16,
						marginBottom: 5,
					},
					tabBarIcon: ({ color, size }) => (
						<Icon
							name="house"
							color={color}
							size={25}
							type="material-icons"
							style={{ marginTop: 10 }}
						/>
					),
				}}
			/>
		</TabMerchant.Navigator>
	);
};

export default AppNavigator;
