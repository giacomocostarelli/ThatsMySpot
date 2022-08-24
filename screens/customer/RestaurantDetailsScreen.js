import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	useWindowDimensions,
	ImageBackground,
	Pressable,
	Modal,
	Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { Icon } from "react-native-elements";
import { removeFromFav, addToFav, getStarred } from "../../store/actions/users";
import { askForReservation } from "../../store/actions/reservations";

const ProfileTab = () => {
	const dispatch = useDispatch();
	const current = useSelector((state) => state.restaurants.currentRestaurant);
	const userStarredState = useSelector((state) => state.users.userStarred);
	const [isFavorite, setIsFavorite] = useState(false);
	useEffect(() => {
		if (userStarredState == null) {
			setIsFavorite(false);
		} else if (current.name in userStarredState) {
			setIsFavorite(true);
		} else {
			setIsFavorite(false);
		}
	}, [current]);

	if (current != null) {
		return (
			<View style={styles.body}>
				<ImageBackground
					style={styles.imageContainer}
					source={{
						uri: current.imageUrl,
					}}
				>
					<View style={styles.bodyTitleContainer}>
						<Text style={styles.bodyTitle}>{current.name}</Text>
						{isFavorite ? (
							<FontAwesome
								name="star"
								size={28}
								color="white"
								onPress={() => {
									dispatch(removeFromFav(current.name));
									console.log("Rimuovo dai preferiti");
									setIsFavorite(false);
									setTimeout(() => {
										dispatch(getStarred());
									}, 500);
								}}
							/>
						) : (
							<FontAwesome
								name="star-o"
								size={28}
								color="white"
								onPress={() => {
									dispatch(addToFav(current.name));
									console.log("Aggiungo ai preferiti");
									setIsFavorite(true);
									setTimeout(() => {
										dispatch(getStarred());
									}, 500);
								}}
							/>
						)}
					</View>
				</ImageBackground>
				<View style={styles.descriptionContainer}>
					<Text style={styles.descriptionText}>{current.description}</Text>
					<View
						style={{
							flex: 1.5,
							flexDirection: "column",
							alignItems: "flex-start",
							justifyContent: "center",
						}}
					>
						<Text
							style={{ fontWeight: "bold", fontSize: 22, color: Colors.accent }}
						>
							Informazioni
						</Text>
						<FavoriteRow iconname={"star"}>{current.stars} / 5</FavoriteRow>
						<FavoriteRow iconname={"map-marker"}>{current.address}</FavoriteRow>
						<FavoriteRow iconname={"phone"}>{current.phoneNumber}</FavoriteRow>
					</View>
					<Text style={{ color: Colors.secondary }}>
						Fai swipe a destra per prenotare un tavolo.{" "}
					</Text>
				</View>
			</View>
		);
	}
};

const BookingTab = (props) => {
	const dispatch = useDispatch();
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(false);
	const [dateFormat, setDateFormat] = useState("");
	const [timeFormat, setTimeFormat] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const [isPressable, setIsPressable] = useState(false);
	const [numberOfPeople, setNumberOfPeople] = useState(0);

	const increment = () => {
		setNumberOfPeople(numberOfPeople + 1);
	};
	const decrement = () => {
		setNumberOfPeople(numberOfPeople - 1);
	};

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === "ios");
		currentDate.setHours(currentDate.getHours() + 2);
		setDate(currentDate);
	};

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode("date");
	};

	const showTimepicker = () => {
		showMode("time");
	};

	const showDate = () => {
		//date
		let datanew = date;
		setDateFormat(
			datanew.toISOString().slice(8, 10) +
				"/" +
				datanew.toISOString().slice(5, 7) +
				"/" +
				datanew.toISOString().slice(0, 4)
		);

		//time
		setTimeFormat(datanew.toISOString().slice(11, 16));
	};

	const sendEmail = async () => {
		let response = await fetch("http://192.168.1.59:3000", {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				date: dateFormat,
				time: timeFormat,
			}),
		});
		let json = await response.json();
	};

	const submit = async () => {
		let res = {
			date: dateFormat,
			time: timeFormat,
			number: numberOfPeople,
		};
		await dispatch(askForReservation(res));
	};

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
				margin: "9%",
			}}
		>
			<View style={{ flex: 1 }}>
				<Text
					style={{ fontSize: 18, fontWeight: "bold", color: Colors.accent }}
				>
					PRENOTA IL TUO TAVOLO.
				</Text>
				<Text style={{ fontSize: 18, marginVertical: "5%" }}>
					Seleziona il giorno, l'orario, il numero di persone e conferma subito
					la tua prenotazione e trova il tuo nuovo ristorante preferito!
				</Text>
			</View>

			<View
				style={{ flex: 2, width: "100%", alignItems: "center", borderWidth: 0 }}
			>
				<Pressable style={styles.button} onPress={showDatepicker}>
					<Text style={{ color: "white" }}>Scegli un giorno.</Text>
				</Pressable>
				<Pressable style={styles.button} onPress={showTimepicker}>
					<Text style={{ color: "white" }}>Scegli un orario.</Text>
				</Pressable>
				<PeoplePicker
					onPressPlus={increment}
					onPressMinus={decrement}
					numberOfPeople={numberOfPeople}
				/>
				<Divider
					width={1}
					color={Colors.accent}
					style={{ margin: "5%", width: "98%" }}
				/>

				<Pressable
					disabled={numberOfPeople === 0 ? true : false}
					style={styles.buttonConfirm}
					onPress={() => {
						setModalVisible(true);
						showDate();
					}}
				>
					<Text style={{ color: "white" }}>Prenota.</Text>
				</Pressable>
			</View>
			<View
				style={{
					borderWidth: 0.5,
					flex: 1,
					width: "100%",
					alignItems: "center",
					justifyContent: "center",
					borderColor: Colors.secondary,
					borderRadius: 5,
				}}
			>
				<Image
					style={{ height: 100, width: 220 }}
					source={require("../../assets/images/logo_large_accent.png")}
				/>
			</View>

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>{dateFormat}</Text>
						<Text style={styles.modalText}>{timeFormat}</Text>
						<View style={{ flexDirection: "row" }}>
							<Pressable
								style={[styles.buttonModal, styles.buttonClose]}
								onPress={() => {
									setModalVisible(!modalVisible);
								}}
							>
								<Text style={styles.textStyle}>Annulla</Text>
							</Pressable>
							<Pressable
								style={[styles.buttonModal, styles.buttonClose]}
								onPress={() => {
									setModalVisible(!modalVisible);
									submit();
								}}
							>
								<Text style={styles.textStyle}>Conferma</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>

			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={date}
					mode={mode}
					is24Hour={false}
					display="default"
					onChange={onChange}
					minimumDate={new Date()}
				/>
			)}
		</View>
	);
};

const TakeawayTab = () => {
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(false);
	const [dateFormat, setDateFormat] = useState("");
	const [timeFormat, setTimeFormat] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const [isPressable, setIsPressable] = useState(false);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === "ios");
		currentDate.setHours(currentDate.getHours() + 1);
		setDate(currentDate);
	};

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode("date");
	};

	const showTimepicker = () => {
		showMode("time");
	};

	const showDate = () => {
		//date
		let datanew = date;
		setDateFormat(
			datanew.toISOString().slice(8, 10) +
				"/" +
				datanew.toISOString().slice(5, 7) +
				"/" +
				datanew.toISOString().slice(0, 4)
		);

		//time
		setTimeFormat(datanew.toISOString().slice(11, 16));
	};

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
				margin: "9%",
				backgroundColor: Colors.back,
			}}
		>
			<View style={{ flex: 1 }}>
				<Text
					style={{ fontSize: 18, fontWeight: "bold", color: Colors.accent }}
				>
					ORDINA IL TUO TAKE AWAY.
				</Text>
				<Text style={{ fontSize: 18, marginVertical: "5%" }}>
					Sfoglia il menù, seleziona un giorno ed un orario a cui passare a
					prendere il tuo ordine.
				</Text>
			</View>

			<View style={{ flex: 3, width: "100%", alignItems: "center" }}>
				<Pressable style={styles.button} onPress={showDatepicker}>
					<Text style={{ color: "white" }}>Scegli un giorno.</Text>
				</Pressable>
				<Pressable style={styles.button} onPress={showTimepicker}>
					<Text style={{ color: "white" }}>Scegli un orario.</Text>
				</Pressable>
				<Pressable style={styles.button} onPress={() => {}}>
					<Text style={{ color: "white" }}>Guarda il menu</Text>
				</Pressable>
				<Divider
					width={1}
					color={Colors.accent}
					style={{ margin: "10%", width: "98%" }}
				/>
				<Pressable
					style={styles.buttonConfirm}
					onPress={() => {
						setModalVisible(true);
						showDate();
					}}
				>
					<Text style={{ color: "white" }}>Prenota.</Text>
				</Pressable>
				<View style={{ borderWidth: 0, marginTop: 10 }}>
					<Image
						style={{ height: 150, width: 150 }}
						source={{
							uri: "https://cdn-icons-png.flaticon.com/512/5578/5578682.png",
						}}
					/>
				</View>
			</View>

			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={date}
					mode={mode}
					is24Hour={false}
					display="default"
					onChange={onChange}
					minimumDate={new Date()}
				/>
			)}
		</View>
	);
};

const RestaurantDetailsScreen = () => {
	const layout = useWindowDimensions();

	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: "profile", title: "Profilo" },
		{ key: "booking", title: "Prenota" },
		{ key: "takeaway", title: "Take Away" },
	]);

	//Component.
	return (
		<View style={styles.container}>
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
				renderTabBar={renderTabBar}
			/>
		</View>
	);
};

const FavoriteRow = (props) => {
	return (
		<View
			style={{
				marginVertical: "5%",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "row",
			}}
		>
			<FontAwesome
				name={props.iconname}
				size={30}
				color={Colors.secondary}
				style={{ marginRight: "10%" }}
			/>
			<Text style={{ fontSize: 18 }}>{props.children}</Text>
		</View>
	);
};

const PeoplePicker = ({ onPressPlus, onPressMinus, numberOfPeople }) => {
	return (
		<View style={styles.personPickerRow}>
			<View>
				<Icon
					disabled={numberOfPeople === 0 ? true : false}
					name="minus"
					color={numberOfPeople === 0 ? "lightgrey" : Colors.accent}
					size={35}
					type="entypo"
					style={{}}
					disabledStyle={{ backgroundColor: Colors.back }}
					onPress={onPressMinus}
				/>
			</View>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					marginHorizontal: 10,
				}}
			>
				<Icon
					disabled
					name="person"
					color={Colors.accent}
					size={35}
					type="material"
					disabledStyle={{ backgroundColor: Colors.back }}
					style={{}}
				/>
				<Text style={{ fontSize: 25 }}>{numberOfPeople}</Text>
			</View>
			<View>
				<Icon
					name="plus"
					color={Colors.accent}
					size={35}
					type="entypo"
					style={{}}
					onPress={onPressPlus}
				/>
			</View>
		</View>
	);
};

const renderScene = SceneMap({
	profile: ProfileTab,
	booking: BookingTab,
	takeaway: TakeawayTab,
});

const renderTabBar = (props) => {
	return (
		<TabBar
			{...props}
			indicatorStyle={{ backgroundColor: Colors.accent }}
			labelStyle={{ color: Colors.accent, fontWeight: "bold" }}
			style={{ backgroundColor: "white" }}
		/>
	);
};

const styles = StyleSheet.create({
	personPickerRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 20,
	},

	container: {
		flex: 1,
		backgroundColor: "white",
	},

	body: {
		flex: 1,
		backgroundColor: "white",
	},

	bodyTitleContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
		backgroundColor: "rgba(52, 52, 52, 0.5)",
		paddingVertical: "1%",
	},

	bodyTitle: {
		color: "white",
		fontSize: 30,
		fontWeight: "bold",
	},

	imageContainer: {
		flex: 4,
	},

	descriptionContainer: {
		flex: 5,
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		margin: "9%",
	},

	descriptionText: {
		fontSize: 18,
		textAlign: "justify",
	},

	title: {
		fontSize: 32,
	},

	button: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
		marginTop: 15,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: Colors.accent,
	},

	buttonModal: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
		marginTop: 15,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: Colors.primary,
	},

	buttonConfirm: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: Colors.secondary,
	},

	centeredView: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
		marginTop: 22,
	},

	modalView: {
		width: "82%",
		height: "30%",
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},

	buttonClose: {
		backgroundColor: Colors.accent,
		margin: "5%",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
		fontSize: 25,
		fontWeight: "bold",
		color: Colors.accent,
	},
});

export default RestaurantDetailsScreen;
