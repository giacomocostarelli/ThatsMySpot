import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "react-native-dialog"; // PACKAGE
import Colors from "../../constants/Colors";
import { createRestaurant } from "../../store/actions/restaurants";

const RestaurantNameModal = (props) => {
	const isNew = useSelector((state) => state.users.isNewState);
	const [visible, setVisible] = useState(isNew);

	const childToParent = (isVisible) => {
		setVisible(isVisible);
	};

	return (
		<View style={styles.container}>
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
	return (
		<View style={styles.container}>
			<RestaurantNameModal style={styles.modal} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
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
});

export default ReservationScreen;
