import React, { useState } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "react-native-dialog"; // PACKAGE
import Colors from "../../constants/Colors";
import Card from "../../components/Card";
import { createRestaurant } from "../../store/actions/restaurants";

import { Ionicons } from "@expo/vector-icons";

const ReservationRow = () => {
	return (
		<View style={styles.reservationRowContainer}>
			<Card>
				<Text style={styles.text}>Ciao</Text>
			</Card>
		</View>
	);
};

const ReservationList = () => {
	return (
		<View style={styles.reservationListContainer}>
			<ReservationRow></ReservationRow>
		</View>
	);
};

const RestaurantNameModal = (props) => {
	const isNew = useSelector((state) => state.users.isNewState);
	const [visible, setVisible] = useState(isNew);

	const childToParent = (isVisible) => {
		setVisible(isVisible);
	};

	return (
		<View style={styles.containerModal}>
			{isNew && (
				<Dialog.Container visible={visible}>
					<Dialog.Title
						style={{ fontSize: 25, color: Colors.primary, fontWeight: "bold" }}
					>
						Nome Attività
					</Dialog.Title>
					<Dialog.Description style={{ fontSize: 18 }}>
						Prima di cominciare inserisci il nome del tuo ristorante.
					</Dialog.Description>
					<RestaurantNameInput childToParent={childToParent} />
				</Dialog.Container>
			)}
			<ReservationList></ReservationList>
		</View>
	);
};

const RestaurantNameInput = ({ childToParent }) => {
	const dispatch = useDispatch();
	const [restaurantName, onChangeRestaurantName] = useState("");
	let visibleChild = null;

	return (
		<View>
			<Dialog.Input
				style={styles.modalInput}
				placeholder="Nome ristorante..."
				value={restaurantName}
				onChangeText={onChangeRestaurantName}
				underlineColorAndroid={Colors.primary}
			></Dialog.Input>
			<Button
				disabled={restaurantName === "" ? true : false}
				color={restaurantName === "" ? "grey" : Colors.secondary}
				title="Conferma"
				onPress={() => {
					visibleChild = false;
					childToParent(visibleChild);
					dispatch(createRestaurant(restaurantName));
				}}
			/>
		</View>
	);
};

const ReservationScreen = () => {
	return <RestaurantNameModal style={styles.modal} />;
};

const styles = StyleSheet.create({
	containerModal: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	reservationRowContainer: {},

	reservationListContainer: {
		flex: 1,
		backgroundColor: "#fff",
		borderColor: "black",
		borderWidth: 1,
		alignItems: "center",
		justifyContent: "center",
	},

	modal: {
		alignItems: "center",
		justifyContent: "center",
	},
	modalInput: {
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 20,
	},
});

export default ReservationScreen;
