import React, { useEffect, useState } from "react";
import {
	View,
	Image,
	Dimensions,
	StyleSheet,
	ActivityIndicator,
	Text,
	Pressable,
	Button,
} from "react-native";
import Swiper from "react-native-swiper";
import Colors from "../constants/Colors";
import Card from "../components/Card";

const { width, height } = Dimensions.get("window");

const WelcomeScreen = (props) => {
	const [isLoaded, setIsLoaded] = useState(false);

	if (isLoaded) {
		return (
			<View style={[styles.centered, styles.backColor]}>
				<Card style={styles.cardContainer}>
					<Swiper
						style={styles.wrapper}
						dot={
							<View
								style={{
									backgroundColor: "lightgrey",
									width: 9,
									height: 9,
									borderRadius: 7,
									marginLeft: 4,
									marginRight: 4,
								}}
							/>
						}
						activeDot={
							<View
								style={{
									backgroundColor: Colors.accent,
									width: 12,
									height: 12,
									borderRadius: 7,
									marginLeft: 4,
									marginRight: 4,
								}}
							/>
						}
						paginationStyle={{
							bottom: 30,
						}}
						loop={false}
					>
						<View style={styles.slide}>
							<Text style={styles.text}>Benvenuto su </Text>
							<Image
								style={styles.logo}
								source={require("../assets/images/logo_large_accent.png")}
							/>
							<Text style={styles.text2}>
								Inizia subito a prenotare il tuo posto, ma prima fai swipe a
								destra per scoprire tutte le funzionalità di TMS!
							</Text>
							<Pressable
								style={styles.buttonRegister}
								onPress={() => {
									props.navigation.replace("Login");
								}}
							>
								<Text style={styles.buttonRegisterText}>
									Non mi interessa. Skip!
								</Text>
							</Pressable>
						</View>
						<View style={styles.slide2}>
							<Image
								style={styles.logoslide2}
								source={require("../assets/images/onboard_image1.png")}
							/>
							<Text
								style={{
									fontFamily: "roboto-font",
									fontSize: 16,
									color: Colors.secondary,
									marginHorizontal: "10%",
									marginTop: "3%",
									lineHeight: 20,
								}}
							>
								Non hai ancora le idee chiare? {"\n"}
								<Text
									style={{
										fontFamily: "roboto-font",
										fontSize: 16,
										color: "grey",
										marginHorizontal: "10%",

										lineHeight: 20,
									}}
								>
									Ti faremo scoprire nuovi e buonissimi ristoranti.
								</Text>
							</Text>

							<Text
								style={{
									fontFamily: "roboto-font",
									fontSize: 16,
									color: "grey",
									marginHorizontal: "10%",
									marginTop: "3%",
									lineHeight: 20,
								}}
							>
								<Text
									style={{
										fontFamily: "roboto-font",
										fontSize: 16,
										color: Colors.secondary,
										marginHorizontal: "10%",
										lineHeight: 20,
									}}
								>
									Esplora la mappa
								</Text>{" "}
								per trovare i ristoranti più vicini.
							</Text>

							<Text
								style={{
									fontFamily: "roboto-font",
									fontSize: 16,
									color: "grey",
									marginHorizontal: "10%",
									marginTop: "3%",
									lineHeight: 20,
								}}
							>
								<Text
									style={{
										fontFamily: "roboto-font",
										fontSize: 16,
										color: Colors.secondary,
										marginHorizontal: "10%",
										lineHeight: 20,
									}}
								>
									Prenota il tuo tavolo
								</Text>{" "}
								direttamente da qui e risparmia tempo!
							</Text>
						</View>

						<View style={styles.slide3}>
							<Image
								style={styles.logoslide3}
								source={require("../assets/images/onboard_image2.png")}
							/>
							<Text
								style={{
									fontFamily: "roboto-font",
									fontSize: 16,
									color: Colors.secondary,
									marginHorizontal: "10%",
								}}
							>
								Sei un ristoratore? {"\n"}
								<Text
									style={{
										fontFamily: "roboto-font",
										fontSize: 16,
										color: "grey",
										marginHorizontal: "10%",
									}}
								>
									Controlla le tue prenotazioni direttamente dall'app.
								</Text>
							</Text>

							<Text
								style={{
									fontFamily: "roboto-font",
									fontSize: 16,
									color: "grey",
									marginHorizontal: "10%",
									marginTop: "3%",
								}}
							>
								<Text
									style={{
										fontFamily: "roboto-font",
										fontSize: 16,
										color: Colors.secondary,
										marginHorizontal: "10%",
									}}
								>
									Organizza i Take-Away
								</Text>{" "}
								e non scordarti mai dei pasti da consegnare.
							</Text>

							<Text
								style={{
									fontFamily: "roboto-font",
									fontSize: 16,
									color: "grey",
									marginHorizontal: "10%",
									marginTop: "3%",
								}}
							>
								<Text
									style={{
										fontFamily: "roboto-font",
										fontSize: 16,
										color: Colors.secondary,
										marginHorizontal: "10%",
									}}
								>
									Personalizza il tuo profilo
								</Text>{" "}
								e fai scoprire il tuo ristorante a tutti.
							</Text>
							<Pressable
								style={styles.buttonRegister}
								onPress={() => {
									props.navigation.replace("Login");
								}}
							>
								<Text style={styles.buttonRegisterText2}>
									Ho capito, cominciamo {"-->"}
								</Text>
							</Pressable>
						</View>
					</Swiper>
				</Card>
			</View>
		);
	} else {
		return (
			<View style={[styles.centered, styles.backColor]}>
				<Image
					style={{ height: "15%", width: "75%" }}
					source={require("../assets/images/logo_large_accent.png")}
				/>
				<View style={[{ width: "70%", marginTop: 10 }]}>
					<Button
						color={Colors.secondary}
						title={"Iniziamo!"}
						onPress={() => {
							setIsLoaded(true);
						}}
					/>
				</View>
			</View>
		);
	}
};
const styles = StyleSheet.create({
	wrapper: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
	},

	slide: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	slide2: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
		marginTop: "10%",
	},
	slide3: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	container: {
		flex: 1,
	},

	backColor: {
		backgroundColor: Colors.accent,
	},

	centered: {
		display: "flex",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	cardContainer: {
		flex: 1,
		maxHeight: "60%",
		width: "75%",
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: "10%",
		marginBottom: "10%",
		overflow: "hidden",
	},
	text: {
		fontFamily: "roboto-font",
		fontSize: 28,
		color: Colors.secondary,
		textAlign: "center",
		marginHorizontal: "15%",
		marginTop: "15%",
	},
	text2: {
		fontFamily: "roboto-font",
		fontSize: 19,
		color: "grey",
		marginHorizontal: "15%",
		marginTop: "10%",
		textAlign: "center",
	},
	textTitle: {
		fontFamily: "roboto-font",
		fontSize: 33,
		color: Colors.accent,
	},
	logo: {
		width: "65%",
		height: "15%",
	},
	logoslide2: {
		width: "60%",
		height: "40%",
		marginBottom: "5%",
	},
	logoslide3: {
		width: "45%",
		height: "35%",
		margin: "5%",
	},
	buttonRegister: {
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
	},
	buttonRegisterText: {
		margin: "15%",
		fontSize: 16,
		color: Colors.secondary,
	},
	buttonRegisterText2: {
		fontWeight: "bold",
		margin: "6%",
		fontSize: 16,
		color: Colors.accent,
	},
});

export default WelcomeScreen;
