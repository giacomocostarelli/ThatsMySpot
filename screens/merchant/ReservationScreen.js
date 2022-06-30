import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "react-native-dialog";
import Colors from "../../constants/Colors";

const RestaurantNameModal = (props) => {
	const [visible, setVisible] = useState(true);
	const [restaurantName, onChangeRestaurantName] = useState("");

	const handleCancel = () => {
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
	return <View>{isNew && <RestaurantNameModal />}</View>;
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
