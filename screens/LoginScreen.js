import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	Pressable,
	ActivityIndicator,
	Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "react-native-elements";
import Input from "../components/Input";
import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";
import { fetchRestaurants } from "../store/actions/restaurants";
import { getStarred, addUser } from "../store/actions/users";
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
	if (action.type === FORM_INPUT_UPDATE) {
		const updatedValues = {
			...state.inputValues,
			[action.input]: action.value,
		};
		const updatedValidities = {
			...state.inputValidities,
			[action.input]: action.isValid,
		};
		let updatedFormIsValid = true;
		for (const key in updatedValidities) {
			updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
		}
		return {
			formIsValid: updatedFormIsValid,
			inputValidities: updatedValidities,
			inputValues: updatedValues,
		};
	}
	return state;
};

const LoginScreen = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const [switchValue, setSwitchValue] = useState(false);
	const [isSignup, setIsSignup] = useState(false);
	const dispatch = useDispatch();

	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			email: "",
			password: "",
		},
		inputValidities: {
			email: false,
			password: false,
		},
		formIsValid: false,
	});
	useEffect(() => {
		dispatch(fetchRestaurants());
	}, [dispatch]);

	useEffect(() => {
		if (error) {
			Alert.alert("AUTENTICAZIONE FALLITA", "I dati di login sono errati", [
				{ text: "Okay" },
			]);
		}
	}, [error]);

	const authHandler = async () => {
		let action;
		if (isSignup) {
			action = authActions.signup(
				formState.inputValues.email,
				formState.inputValues.password,
				switchValue
			);
		} else {
			action = authActions.login(
				formState.inputValues.email,
				formState.inputValues.password
			);
		}
		setError(null);
		setIsLoading(true);
		try {
			await dispatch(action);
			await dispatch(getStarred());
			await dispatch(addUser());
			switchValue
				? props.navigation.replace("HomepageMerchant")
				: props.navigation.replace("Homepage");
		} catch (err) {
			setError(err.message);
			setIsLoading(false);
		}
	};

	const inputChangeHandler = useCallback(
		(inputIdentifier, inputValue, inputValidity) => {
			dispatchFormState({
				type: FORM_INPUT_UPDATE,
				value: inputValue,
				isValid: inputValidity,
				input: inputIdentifier,
			});
		},
		[dispatchFormState]
	);

	let loginRegisterComponent;
	if (!isSignup) {
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
							size={90}
							color="white"
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
							id="email"
							label="E-Mail"
							keyboardType="email-address"
							required
							email
							autoCapitalize="none"
							onInputChange={inputChangeHandler}
							initialValue=""
						/>
						<Input
							id="password"
							label="Password"
							keyboardType="default"
							secureTextEntry
							required
							minLength={5}
							autoCapitalize="none"
							onInputChange={inputChangeHandler}
							initialValue=""
						/>
					</View>
					<View style={styles.cardFooter}>
						{isLoading ? (
							<ActivityIndicator size="small" color={Colors.primary} />
						) : (
							<Pressable style={styles.buttonLogin} onPress={authHandler}>
								<Text style={styles.buttonText}>Login</Text>
							</Pressable>
						)}

						<View style={{ marginTop: 20 }}>
							<Text style={styles.font}> Non hai ancora un account?</Text>
						</View>
						<Pressable
							style={styles.buttonRegister}
							onPress={() => {
								setIsSignup((prevState) => !prevState);
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
							size={90}
							color="white"
							type="evilicon"
						/>
						<View>
							<Text style={styles.textHeader}>Registrazione</Text>
						</View>
					</View>
					<View style={styles.cardBody}>
						<Input
							id="email"
							label="E-Mail"
							keyboardType="email-address"
							required
							email
							autoCapitalize="none"
							onInputChange={inputChangeHandler}
							initialValue=""
						/>
						<Input
							id="password"
							label="Password"
							keyboardType="default"
							required
							minLength={5}
							autoCapitalize="none"
							onInputChange={inputChangeHandler}
							initialValue=""
						/>
						<Input
							id="password"
							label="Password"
							keyboardType="default"
							required
							minLength={5}
							autoCapitalize="none"
							onInputChange={inputChangeHandler}
							initialValue=""
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
						{isLoading ? (
							<ActivityIndicator size="small" color={Colors.primary} />
						) : (
							<Pressable
								style={styles.buttonLoginRegister}
								onPress={authHandler}
							>
								<Text style={styles.buttonText}>Registrati</Text>
							</Pressable>
						)}

						<View style={styles.cardFooterRegister}>
							<Text style={styles.font}>Hai già un account?</Text>
							<Pressable
								style={styles.buttonRegister}
								onPress={() => {
									setIsSignup((prevState) => !prevState);
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
		backgroundColor: Colors.accent,
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
		backgroundColor: Colors.secondary,
		alignItems: "center",
		justifyContent: "center",
	},
	cardHeaderRegister: {
		flex: 0.5,
		flexDirection: "row",
		width: "100%",
		minHeight: 30,
		backgroundColor: Colors.secondary,
		alignItems: "center",
		justifyContent: "center",
	},
	textHeader: {
		fontSize: 26,
		color: "white",
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
		borderRadius: 4,
		elevation: 3,
		backgroundColor: Colors.secondary,
	},
	buttonLoginRegister: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
		marginTop: 15,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: Colors.secondary,
	},

	buttonRegister: {
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
	},

	buttonRegisterText: { color: Colors.secondary },

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
