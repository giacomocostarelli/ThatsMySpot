import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	useWindowDimensions,
} from "react-native";
import Colors from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { TabView, SceneMap } from "react-native-tab-view";

const FavoriteRow = (props) => {
	return (
		<View
			style={{
				margin: "5%",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "row",
			}}
		>
			<Text style={{ fontSize: 18, marginRight: "5%" }}>
				{props.children} / 5
			</Text>
			<FontAwesome name="star" size={24} color={Colors.accent} />
		</View>
	);
};

const FirstRoute = () => (
	<View style={{ flex: 1, backgroundColor: "#ff4081" }} />
);

const SecondRoute = () => (
	<View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

const renderScene = SceneMap({
	first: FirstRoute,
	second: SecondRoute,
});

const RestaurantDetailsScreen = (props) => {
	const [stars, setStars] = useState(2.7);
	const layout = useWindowDimensions();

	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: "first", title: "First" },
		{ key: "second", title: "Second" },
	]);

	//Component.
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image
					style={styles.leftHeader}
					source={{
						uri: "https://www.collinsdictionary.com/images/full/restaurant_135621509.jpg",
					}}
				/>
				<View style={styles.rightHeader}>
					<Text style={styles.rightHeaderTitle}>Pizzeria da Giacomo</Text>
					<Text>Via delle Pizze 22 </Text>
					<Text>392 079 4880</Text>
					<FavoriteRow>{stars}</FavoriteRow>
				</View>
			</View>
			<View style={styles.body}>
				<TabView
					navigationState={{ index, routes }}
					renderScene={renderScene}
					onIndexChange={setIndex}
					initialLayout={{ width: layout.width }}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	header: {
		flexDirection: "row",
		flex: 2,
		borderWidth: 1,
		borderColor: "lightgrey",
		margin: "5%",
	},

	leftHeader: {
		flex: 1,
	},

	rightHeader: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		margin: "3%",
	},

	rightHeaderTitle: {
		fontFamily: "roboto-font",
		fontSize: 18,
	},

	body: {
		flex: 4,
	},

	title: {
		fontSize: 32,
	},
});

export default RestaurantDetailsScreen;
