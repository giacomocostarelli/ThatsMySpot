import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Button,
	Text,
	TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "react-native-dialog"; // PACKAGE
import Collapsible from "react-native-collapsible"; // PACKAGE
import { Icon } from "react-native-elements";
import Colors from "../../constants/Colors";
import Card from "../../components/Card";
import { createRestaurant } from "../../store/actions/restaurants";

const ReservationRow = () => {
	const [isCollapsed, setIsCollapsed] = useState(false);

	// RED BORDER
	return (
		<View style={styles.reservationRowContainer}>
			<TouchableWithoutFeedback
				onPress={() => {
					setIsCollapsed(!isCollapsed);
				}}
			>
				<View style={{ flex: 1 }}>
					<View
						style={{
							flex: 1,
							borderWidth: 0,
							minWidth: "80%",
							maxWidth: "80%",
							borderColor: "green",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<Text style={styles.text}>Nome Persona</Text>

						{
							// Confirm and cancel icons group
						}

						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Icon
								name="account"
								color={Colors.primary}
								size={25}
								type="material-community"
							/>
							<Text style={styles.text}>10</Text>
						</View>

						{
							// Confirm and cancel icons group
						}
						<View style={{ flexDirection: "row" }}>
							<Icon
								name="checksquareo"
								color={Colors.secondary}
								size={40}
								type="antdesign"
								onPress={() => {}}
							/>
							<Icon
								name="closesquareo"
								color={Colors.primary}
								size={40}
								type="antdesign"
								onPress={() => {}}
							/>
						</View>
					</View>
					<Collapsible collapsed={isCollapsed}>
						<Text style={styles.text}>Data</Text>
						<Text style={styles.text}>Ora</Text>
					</Collapsible>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

const ReservationList = () => {
	// BLACK BORDER
	return (
		<View style={styles.reservationListContainer}>
			<ReservationRow></ReservationRow>
			<ReservationRow></ReservationRow>
			<ReservationRow></ReservationRow>
			<ReservationRow></ReservationRow>
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

		alignItems: "center",
		justifyContent: "center",
	},

	reservationRowContainer: {
		flex: 1,
		minWidth: "90%",
		alignItems: "center",
		justifyContent: "center",
		borderColor: "red",
		borderWidth: 0,
	},

	reservationListContainer: {
		flex: 1,
		minWidth: "95%",

		borderColor: "black",
		borderWidth: 0,
		alignItems: "center",
		justifyContent: "center",
	},

	modal: {
		flex: 1,
		minWidth: "100%",
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
