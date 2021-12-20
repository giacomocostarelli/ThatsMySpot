import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	useWindowDimensions,
	ImageBackground,
	Button,
	Pressable,
} from "react-native";
import Colors from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import DateTimePicker from "@react-native-community/datetimepicker";

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
				color={Colors.accent}
				style={{ marginRight: "10%" }}
			/>
			<Text style={{ fontSize: 18 }}>{props.children}</Text>
		</View>
	);
};

const ProfileTab = () => (
	<View style={styles.body}>
		<ImageBackground
			style={styles.imageContainer}
			source={{
				uri: "https://www.collinsdictionary.com/images/full/restaurant_135621509.jpg",
			}}
		>
			<View style={styles.bodyTitleContainer}>
				<Text style={styles.bodyTitle}>Pizzeria da Giacomo</Text>
			</View>
		</ImageBackground>
		<View style={styles.descriptionContainer}>
			<Text style={styles.descriptionText}>
				Pizza al mattone o al tegamino, anche per celiaci, in un locale rustico
				con ampie vetrate e mattoni a vista.
			</Text>
			<View
				style={{
					flex: 1.5,
					flexDirection: "column",
					alignItems: "flex-start",
					justifyContent: "center",
				}}
			>
				<Text style={{ fontSize: 20, color: Colors.accent }}>Informazioni</Text>
				<FavoriteRow iconname={"star"}>2.7 / 5</FavoriteRow>
				<FavoriteRow iconname={"map-marker"}>Via delle Pizze, 22</FavoriteRow>
				<FavoriteRow iconname={"phone"}>392 079 4885</FavoriteRow>
			</View>
			<Text style={{ color: Colors.primary }}>
				Fai swipe a destra per prenotare un tavolo.{" "}
			</Text>
		</View>
	</View>
);

const BookingTab = () => {
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(false);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === "ios");
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
		datanew.setHours(date.getHours() + 1);
		console.log(
			datanew.toISOString().slice(8, 10) +
				"/" +
				datanew.toISOString().slice(5, 7) +
				"/" +
				datanew.toISOString().slice(0, 4)
		);
		//time
		console.log(datanew.toISOString().slice(11, 16));
	};

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
				margin: "5%",
			}}
		>
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Text style={{ fontSize: 20 }}>
					Seleziona il giorno, l'orario e conferma la tua prenotazione.
				</Text>
			</View>
			<View style={{ flex: 1 }}>
				<Pressable style={styles.button} onPress={showDatepicker}>
					<Text style={{ color: "white" }}>Scegli un giorno.</Text>
				</Pressable>
			</View>
			<View style={{ flex: 1 }}>
				<Pressable style={styles.button} onPress={showTimepicker}>
					<Text style={{ color: "white" }}>Scegli un orario.</Text>
				</Pressable>
			</View>
			<View style={{ flex: 1 }}>
				<Pressable style={styles.button} onPress={showDate}>
					<Text style={{ color: "white" }}>Mostra.</Text>
				</Pressable>
			</View>
			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={date}
					mode={mode}
					is24Hour={false}
					display="default"
					onChange={onChange}
				/>
			)}
		</View>
	);
};

const TakeawayTab = () => <View style={{ flex: 1 }} />;

const renderScene = SceneMap({
	profile: ProfileTab,
	booking: BookingTab,
	takeaway: TakeawayTab,
});

const renderTabBar = (props) => (
	<TabBar
		{...props}
		indicatorStyle={{ backgroundColor: Colors.accent }}
		labelStyle={{ color: Colors.accent, fontWeight: "bold" }}
		style={{ backgroundColor: "white" }}
	/>
);

const RestaurantDetailsScreen = (props) => {
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	body: {
		flex: 1,
	},

	bodyTitleContainer: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(52, 52, 52, 0.5)",
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
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
		marginTop: 15,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: Colors.accent,
	},
});

export default RestaurantDetailsScreen;
