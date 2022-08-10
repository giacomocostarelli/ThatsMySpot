import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	Pressable,
	Image,
	Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SearchBar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Card from "../../components/Card";
import Colors from "../../constants/Colors";

const ProfileScreen = (props) => {
	const dispatch = useDispatch();

	return (
		<View style={styles.container}>
			<Card style={styles.card}>
				<View style={styles.container}>
					<Card style={styles.language}>
						<Pressable
							style={{ borderWidth: 0 }}
							onPress={() => {
								console.log("Cambia lingua");
							}}
						>
							<Text style={styles.text}>Cambia lingua</Text>
						</Pressable>
					</Card>

					<Card style={styles.darkmode}>
						<Pressable
							style={{ borderWidth: 0 }}
							onPress={() => {
								console.log("dark mode");
							}}
						>
							<Text style={styles.text}>Modalità scura</Text>
						</Pressable>
					</Card>
				</View>
				<View style={styles.container}>
					<Pressable
						style={{ borderWidth: 0 }}
						onPress={() => {
							console.log("ELIMINAAAA");
						}}
					>
						<Text style={styles.textDelete}>Elimina il mio account</Text>
					</Pressable>
				</View>
			</Card>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 20,
		color: Colors.primary,
	},
	textDelete: {
		fontSize: 20,
		color: Colors.secondary,
	},
	card: {
		alignItems: "center",
		justifyContent: "center",
		height: "85%",
		width: "80%",
	},
	language: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	darkmode: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default ProfileScreen;
