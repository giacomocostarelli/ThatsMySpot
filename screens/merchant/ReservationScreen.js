import React, { useState, useEffect } from "react";
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
import { createRestaurant } from "../../store/actions/restaurants";
import { getEmailByUid } from "../../store/actions/users";
import {
	confirmReservation,
	denyReservation,
} from "../../store/actions/reservations";

const ReservationRow = (props) => {
	const dispatch = useDispatch();

	const sendEmail = async (isConfirm) => {
		if (isConfirm) {
			let responseConfirm = await fetch("http://192.168.205.145:3000/yes", {
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify({
					date: props.date,
					time: props.time,
					number: props.number,
					email: props.email,
					id: props.customerId.slice(0, 6),
				}),
			});
			let json = await responseConfirm.json();
		} else {
			let responseCancel = await fetch("http://192.168.205.145:3000/no", {
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify({
					date: props.date,
					time: props.time,
					number: props.number,
					email: props.email,
				}),
			});
			let json = await responseCancel.json();
		}
	};

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
						style={{ textTransform: "uppercase", fontSize: 18, margin: 10 }}
					>
						{props.pn + " . " + props.customerId.slice(0, 6)}
					</Text>
				</View>

				{
					// Confirm and cancel icons group
				}

				{props.isPendingList === true && (
					<View style={{ flexDirection: "row" }}>
						<Icon
							name="checksquareo"
							color={Colors.secondary}
							size={40}
							type="antdesign"
							onPress={() => {
								dispatch(
									confirmReservation({
										date: props.date,
										time: props.time,
										number: props.number,
										customerId: props.customerId,
									})
								);
								sendEmail(true);
							}}
						/>
						<Icon
							name="closesquareo"
							color={Colors.primary}
							size={40}
							type="antdesign"
							onPress={() => {
								dispatch(
									denyReservation({
										date: props.date,
										time: props.time,
										number: props.number,
										customerId: props.customerId,
									})
								);
								sendEmail(false);
							}}
						/>
					</View>
				)}
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
					<Text style={styles.text}>{props.date}</Text>
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
					<Text style={styles.text}>{props.time}</Text>
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
					<Text style={styles.text}>{props.number}</Text>
				</View>
			</View>
		</View>
	);
};

const PendingReservationList = () => {
	//number is the id of reservation TODO
	const [rows, setRows] = useState([]);
	const [isPendingExpanded, setIsPendingExpanded] = useState(false);
	let pendingList;

	pendingList = useSelector((state) => state.reservations.pendingReservations);

	useEffect(() => {
		let rowsTmp = [];
		if (pendingList !== undefined) {
			for (let i = 0; i < pendingList.length; i++) {
				rowsTmp.push(
					<ReservationRow
						customerId={pendingList[i].customerId}
						date={pendingList[i].date}
						number={pendingList[i].number}
						time={pendingList[i].time}
						email={pendingList[i].email}
						pn={i + 1}
						key={i + 1}
						isPendingList={true}
					/>
				);
			}
		} else {
			console.log("E' undefined? " + pendingList);
		}

		setRows(rowsTmp);
		setIsPendingExpanded(false);
	}, [pendingList]);

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
				<Collapsible collapsed={!isPendingExpanded}>{rows}</Collapsible>
			</ScrollView>
		</View>
	);
};

const ConfirmedReservationList = () => {
	//number is the id of reservation TODO
	const [isConfirmedExpanded, setIsConfirmedExpanded] = useState(false);
	const [rows, setRows] = useState([]);
	let confirmedList;

	confirmedList = useSelector(
		(state) => state.reservations.confirmedReservations
	);

	useEffect(() => {
		let rowsTmp = [];
		if (confirmedList !== undefined) {
			for (let i = 0; i < confirmedList.length; i++) {
				rowsTmp.push(
					<ReservationRow
						customerId={confirmedList[i].customerId}
						date={confirmedList[i].date}
						number={confirmedList[i].number}
						time={confirmedList[i].time}
						email={confirmedList[i].email}
						pn={i + 1}
						key={i + 1}
						isPendingList={false}
					/>
				);
			}
		} else {
			console.log("E' undefined? " + confirmedList);
		}
		setRows(rowsTmp);
		setIsConfirmedExpanded(false);
	}, [confirmedList]);

	return (
		<View
			style={{
				alignItems: "center",
				justifyContent: "flex-start",
			}}
		>
			<TouchableWithoutFeedback
				onPress={() => {
					setIsConfirmedExpanded(!isConfirmedExpanded);
				}}
			>
				<View style={styles.pendingTextView}>
					<Text style={styles.pendingText}> Attive </Text>
					{isConfirmedExpanded ? (
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
			<ScrollView style={styles.confirmedListContainer}>
				<Collapsible collapsed={!isConfirmedExpanded}>{rows}</Collapsible>
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
				}}
			/>
		</View>
	);
};

const ReservationScreen = () => {
	return (
		<View style={{ flex: 1, backgroundColor: "white" }}>
			<RestaurantNameModal style={styles.modal} />
			<PendingReservationList></PendingReservationList>
			<ConfirmedReservationList></ConfirmedReservationList>
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
	confirmedListContainer: {
		width: "100%",
		flexDirection: "column",
		borderColor: "red",
		borderWidth: 0,
		marginBottom: 105,
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
