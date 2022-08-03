import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Button,
	Text,
	TouchableWithoutFeedback,
	ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "react-native-dialog"; // PACKAGE
import Collapsible from "react-native-collapsible"; // PACKAGE
import { Icon } from "react-native-elements";
import Colors from "../../constants/Colors";
import Card from "../../components/Card";
import { createRestaurant } from "../../store/actions/restaurants";
import { ownerOf } from "../../store/actions/users";

const ReservationRow = (props) => {
	// BLACK BORDER
	return (
		<View style={styles.reservationRowContainer}>
			<View
				style={{
					width: "100%",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-around",
					backgroundColor: "#E8E8E8",
				}}
			>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "flex-start",
					}}
				>
					<Text
						style={{ textTransform: "uppercase", fontSize: 20, margin: 10 }}
					>
						Giacomo
					</Text>
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
			<View
				style={{
					flex: 1,
					borderColor: "green",
					borderWidth: 0,
					width: "80%",
					flexDirection: "column",
					alignItems: "flex-start",
					justifyContent: "center",
				}}
			>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "flex-start",
						borderColor: "green",
						borderWidth: 0,
					}}
				>
					<Icon
						name="calendar"
						color={Colors.primary}
						size={25}
						type="material-community"
					/>
					<Text style={styles.text}>22/10/2022</Text>
				</View>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "flex-start",
					}}
				>
					<Icon name="clock" color={Colors.primary} size={25} type="feather" />
					<Text style={styles.text}>18:45</Text>
				</View>

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
			</View>
		</View>
	);
};

const PendingReservationList = () => {
	// RED BORDER
	//number is the id of reservation TODO
	const [isPendingExpanded, setIsPendingExpanded] = useState(true);

	return (
		<View
			style={{
				alignItems: "center",
				justifyContent: "flex-start",
			}}
		>
			<TouchableWithoutFeedback
				onPress={() => {
					setIsPendingExpanded(!isPendingExpanded);
				}}
			>
				<View style={styles.pendingTextView}>
					<Text style={styles.pendingText}> In attesa </Text>
					{isPendingExpanded ? (
						<Icon
							name="expand-less"
							color="white"
							size={30}
							type="material-icons"
						/>
					) : (
						<Icon
							name="expand-more"
							color="white"
							size={30}
							type="material-icons"
						/>
					)}
				</View>
			</TouchableWithoutFeedback>
			<ScrollView style={styles.pendingListContainer}>
				<Collapsible collapsed={!isPendingExpanded}>
					<ReservationRow number="" />
					<ReservationRow />
					<ReservationRow />
					<ReservationRow />
					<ReservationRow />
					<ReservationRow />
					<ReservationRow />
					<ReservationRow />
					<ReservationRow />
					<ReservationRow />
					<ReservationRow />
					<ReservationRow />
					<ReservationRow />
					<ReservationRow />
					<ReservationRow />
				</Collapsible>
			</ScrollView>
		</View>
	);
};

const CurrentReservationList = () => {
	//number is the id of reservation TODO
	const [isPendingExpanded, setIsPendingExpanded] = useState(true);

	return (
		<View
			style={{
				alignItems: "center",
				justifyContent: "flex-start",
			}}
		>
			<TouchableWithoutFeedback
				onPress={() => {
					setIsPendingExpanded(!isPendingExpanded);
				}}
			>
				<View style={styles.pendingTextView}>
					<Text style={styles.pendingText}> Attive </Text>
					{isPendingExpanded ? (
						<Icon
							name="expand-less"
							color="white"
							size={30}
							type="material-icons"
						/>
					) : (
						<Icon
							name="expand-more"
							color="white"
							size={30}
							type="material-icons"
						/>
					)}
				</View>
			</TouchableWithoutFeedback>
			<ScrollView style={styles.pendingListContainer}>
				<Collapsible collapsed={!isPendingExpanded}>
					<ReservationRow number="" />
					<ReservationRow />
					<ReservationRow />
					<ReservationRow />
					<ReservationRow />
					<ReservationRow />
					<ReservationRow />
					<ReservationRow />
					<ReservationRow />
					<ReservationRow />
					<ReservationRow />
					<ReservationRow />
					<ReservationRow />
					<ReservationRow />
					<ReservationRow />
				</Collapsible>
			</ScrollView>
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
					dispatch(ownerOf(restaurantName));
				}}
			/>
		</View>
	);
};

const ReservationScreen = () => {
	return (
		<View style={{ flex: 1 }}>
			<RestaurantNameModal style={styles.modal} />

			<PendingReservationList></PendingReservationList>
			<CurrentReservationList></CurrentReservationList>
			<View
				style={{
					flex: 1,
					maxHeight: "50%",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Icon name="corner-left-up" color="black" size={30} type="feather" />
				<Text style={styles.text}>Controlla le tue prenotazioni.</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	containerModal: {
		alignItems: "center",
		justifyContent: "center",
		borderColor: "blue",
		borderWidth: 0,
	},

	reservationRowContainer: {
		flex: 1,

		alignItems: "center",
		justifyContent: "center",
		borderColor: "grey",
		borderBottomWidth: 1,
	},

	pendingListContainer: {
		width: "100%",
		flexDirection: "column",
		borderColor: "red",
		borderWidth: 0,
	},

	modal: {
		minWidth: "100%",
		alignItems: "center",
		justifyContent: "center",
		borderColor: "blue",
		borderWidth: 0,
	},
	modalInput: {
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 20,
		margin: 10,
	},

	pendingTextView: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		width: "100%",
		padding: 10,

		backgroundColor: Colors.secondary,
		borderTopColor: "white",
		borderTopWidth: 2,
	},
	pendingText: {
		textAlign: "center",
		fontSize: 20,
		fontFamily: "roboto-font",
		color: "white",
	},
});

export default ReservationScreen;
