import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	Pressable,
	Image,
	Button,
	Alert,
	ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Icon, SearchBar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { getUser, logout } from "../../store/actions/auth";
import { deleteCustomer } from "../../store/actions/users";
import { deleteFirebaseUser } from "../../store/actions/auth";
import Card from "../../components/Card";
import Colors from "../../constants/Colors";

const ProfileScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.idToken);
	const image = {
		uri: "https://background-tiles.com/overview/blue/patterns/large/1063.png",
	};
	return (
		<ImageBackground
			source={image}
			resizeMode="repeat"
			style={styles.container}
		>
			<Card style={styles.card}>
				<View style={styles.container}>
					<View style={styles.language}>
						<Text style={styles.text}> - Cambia lingua -</Text>
						<View style={styles.flagRow}>
							<Pressable
								onPress={() => {
									console.log("it");
								}}
							>
								<Image
									style={styles.flag}
									source={{
										uri: "https://www.novalibandiere.it/wp-content/uploads/Italia-raso-copia.jpg",
									}}
								/>
							</Pressable>
							<Pressable
								onPress={() => {
									console.log("eng");
								}}
							>
								<Image
									style={styles.flag}
									source={{
										uri: "data:image/png;base64,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",
									}}
								/>
							</Pressable>
						</View>
					</View>

					<View style={styles.darkmode}>
						<Pressable
							style={{
								borderWidth: 0,
								alignItems: "center",
								justifyContent: "center",
							}}
							onPress={() => {
								console.log("dark mode");
							}}
						>
							<Text style={styles.text}> - Modalità scura -</Text>
							<Text style={styles.textWIP}> Presto disponibile </Text>
						</Pressable>
					</View>
				</View>
				<View style={styles.containerDelete}>
					<Pressable
						style={{
							borderWidth: 0,
						}}
						onPress={() => {
							Alert.alert(
								"Eliminare account",
								"Sei sicuro di voler eliminare l'account?",
								[
									{
										text: "Annulla",
										onPress: () => console.log("Cancellazione annullata"),
										style: "cancel",
									},
									{
										text: "OK",
										onPress: async () => {
											await dispatch(getUser());
											const role = await AsyncStorage.getItem("@role");
											if (role === "customer") {
												await dispatch(deleteCustomer());
											} else if (role === "merchant") {
												await dispatch(deleteMerchant());
											}
											await dispatch(deleteFirebaseUser());
											await dispatch(logout());
											navigation.replace("Login");
										},
									},
								],
								{ cancelable: false }
							);
						}}
					>
						<Text style={styles.textDelete}>Elimina il mio account.</Text>
					</Pressable>
				</View>
			</Card>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,

		alignItems: "center",
		justifyContent: "center",
	},
	containerDelete: {
		flex: 1,
		margin: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 20,
		fontFamily: "roboto-font",
		color: Colors.accent,
		fontWeight: "bold",
	},
	textWIP: {
		fontSize: 15,
		fontFamily: "roboto-font",
		color: "grey",
	},
	textDelete: {
		fontSize: 20,
		color: "red",
	},
	card: {
		alignItems: "center",
		justifyContent: "center",
		height: "65%",
		width: "80%",
	},
	language: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 20,
	},
	darkmode: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	flagRow: {
		margin: 20,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	flag: {
		marginHorizontal: 10,
		width: 40,
		height: 30,
	},
	image: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default ProfileScreen;
