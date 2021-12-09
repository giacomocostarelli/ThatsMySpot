import React, { useState } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	ActivityIndicator,
	Pressable,
	KeyboardAvoidingView,
} from "react-native";
import { Icon } from "react-native-elements";
import Card from "../components/Card";
import { Input, Switch } from "react-native-elements";
import Colors from "../constants/Colors";

const LoginScreen = (props) => {
	const [isRegister, setIsRegister] = useState(false);
	const [switchValue, setSwitchValue] = useState(false);
	let loginRegisterComponent;
	if (!isRegister) {
		loginRegisterComponent = (
			<View style={[styles.centered, styles.backColor]}>
				<View style={styles.titleText}>
					<Text style={styles.text}>ThatsMySpot!</Text>
				</View>

				<Card style={styles.cardContainer}>
					<View style={styles.cardHeader}>
						<Icon
							style={{ margin: 5 }}
							name="user"
							size={70}
							color="grey"
							type="evilicon"
						/>
						<View>
							<Text style={styles.textHeader}>Benvenuto in</Text>
							<Text style={styles.textHeader}>ThatsMySpot!</Text>
						</View>
					</View>
					<View style={styles.cardBody}>
						<View style={{ marginBottom: 35 }}>
							<Text style={styles.font}> Accedi per continuare</Text>
						</View>

						<Input
							placeholder="Email"
							leftIcon={
								<Icon
									style={{ paddingRight: 10 }}
									name="user"
									size={20}
									color="lightgrey"
									type="font-awesome"
								/>
							}
						/>
						<Input
							placeholder="Password"
							leftIcon={
								<Icon
									style={{ paddingRight: 10 }}
									name="lock"
									size={20}
									color="lightgrey"
									type="font-awesome"
								/>
							}
							secureTextEntry={true}
						/>
					</View>
					<View style={styles.cardFooter}>
						<Pressable
							style={styles.buttonLogin}
							onPress={() => {
								props.navigation.navigate("Homepage");
							}}
						>
							<Text style={styles.buttonText}>Login</Text>
						</Pressable>
						<View style={{ marginTop: 20 }}>
							<Text style={styles.font}> Non hai ancora un account?</Text>
						</View>
						<Pressable
							style={styles.buttonRegister}
							onPress={() => {
								setIsRegister((prevState) => !prevState);
							}}
						>
							<Text style={styles.buttonRegisterText}>Registrati</Text>
						</Pressable>
					</View>
				</Card>
			</View>
		);
	} else {
		loginRegisterComponent = (
			<View style={[styles.centered, styles.backColor]}>
				<View style={styles.titleTextRegister}>
					<Text style={styles.text}>ThatsMySpot!</Text>
				</View>

				<Card style={styles.cardContainer}>
					<View style={styles.cardHeaderRegister}>
						<Icon
							style={{ paddingRight: 10 }}
							name="user"
							size={70}
							color="grey"
							type="evilicon"
						/>
						<View>
							<Text style={styles.textHeader}>Registrazione</Text>
						</View>
					</View>
					<View style={styles.cardBody}>
						<Input
							placeholder="Email"
							leftIcon={
								<Icon
									style={{ paddingRight: 10 }}
									name="user"
									size={20}
									color="lightgrey"
									type="font-awesome"
								/>
							}
						/>
						<Input
							placeholder="Password"
							leftIcon={
								<Icon
									style={{ paddingRight: 10 }}
									name="lock"
									size={20}
									color="lightgrey"
									type="font-awesome"
								/>
							}
							secureTextEntry={true}
						/>
						<Input
							placeholder=" Conferma Password"
							leftIcon={
								<Icon
									style={{ paddingRight: 10 }}
									name="lock"
									size={20}
									color="lightgrey"
									type="font-awesome"
								/>
							}
							secureTextEntry={true}
						/>
						<View style={styles.textSwitch}>
							<Text style={{ fontFamily: "roboto-font", fontSize: 16 }}>
								Ristoratore
							</Text>
							<Switch
								value={switchValue}
								onValueChange={(value) => setSwitchValue(value)}
								color={Colors.accent}
							/>
						</View>
						<Pressable
							style={styles.buttonLoginRegister}
							onPress={() => {
								props.navigation.navigate("Homepage");
							}}
						>
							<Text style={styles.buttonText}>Registrati</Text>
						</Pressable>
						<View style={styles.cardFooterRegister}>
							<Text style={styles.font}>Hai già un account?</Text>
							<Pressable
								style={styles.buttonRegister}
								onPress={() => {
									setIsRegister((prevState) => !prevState);
								}}
							>
								<Text style={styles.buttonRegisterText}>Accedi.</Text>
							</Pressable>
						</View>
					</View>
				</Card>
			</View>
		);
	}

	return <View style={{ flex: 1 }}>{loginRegisterComponent}</View>;
};

const styles = StyleSheet.create({
	centered: {
		display: "flex",
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-end",
	},
	backColor: {
		backgroundColor: Colors.primary,
	},
	text: {
		fontSize: 50,
		fontFamily: "roboto-font",
		color: "white",
	},
	titleText: {
		flex: 1.5,
		alignItems: "center",
		justifyContent: "center",
	},
	titleTextRegister: {
		flex: 1.5,
		alignItems: "center",
		justifyContent: "center",
	},

	cardContainer: {
		flex: 4,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "80%",
		marginHorizontal: "10%",
		marginBottom: "10%",
		overflow: "hidden",
	},

	cardHeader: {
		flex: 1,
		flexDirection: "row",
		width: "100%",
		minHeight: 30,
		backgroundColor: "#F0F0F0",
		alignItems: "center",
		justifyContent: "center",
	},
	cardHeaderRegister: {
		flex: 0.5,
		flexDirection: "row",
		width: "100%",
		minHeight: 30,
		backgroundColor: "#F0F0F0",
		alignItems: "center",
		justifyContent: "center",
	},
	textHeader: {
		fontSize: 22,
		color: "#484848",
		fontFamily: "roboto-font",
	},
	cardBody: {
		flex: 3,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	cardBodyRegister: {
		flex: 3,
		width: "100%",
		alignItems: "center",
		justifyContent: "flex-end",
	},
	bodyTextTop: {
		fontFamily: "roboto-font",
	},
	cardFooter: {
		flex: 2,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	cardFooterRegister: {
		flex: 2,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonLogin: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
		marginTop: 15,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: Colors.accent,
	},
	buttonLoginRegister: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
		marginTop: 15,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: Colors.accent,
	},

	buttonRegister: {
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
	},

	buttonRegisterText: { color: Colors.accent },

	buttonText: {
		fontSize: 18,
		lineHeight: 21,
		letterSpacing: 0.25,
		color: "white",
	},

	font: {
		fontFamily: "roboto-font",
	},

	textSwitch: {
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},
});

export default LoginScreen;
