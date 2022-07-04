import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "react-native-dialog"; // PACKAGE
import Colors from "../../constants/Colors";
import { createRestaurant } from "../../store/actions/restaurants";

const RestaurantNameModal = (props) => {
	const dispatch = useDispatch();
	const [visible, setVisible] = useState(true);
	const [restaurantName, onChangeRestaurantName] = useState("");

	const handleCancel = () => {
		//dispatch(createRestaurant(restaurantName));
		setVisible(false);
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
				<Dialog.Input
					placeholder="Nome ristorante..."
					style={{ fontSize: 16 }}
					value={restaurantName}
					onChangeText={onChangeRestaurantName}
					underlineColorAndroid={Colors.primary}
				></Dialog.Input>
				<Dialog.Button
					disabled={restaurantName === "" ? true : false}
					color={restaurantName === "" ? "grey" : Colors.secondary}
					label="Conferma"
					onPress={handleCancel}
				/>
			</Dialog.Container>
		</View>
	);
};

const ReservationScreen = () => {
	const isNew = useSelector((state) => state.users.isNewState);
	const dispatch = useDispatch();
	return (
		<View style={styles.container}>
			{isNew && <RestaurantNameModal />}
			<Button
				title="Crea restorante"
				onPress={dispatch(createRestaurant("Call me Giorgio"))}
			/>
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
});

export default ReservationScreen;
