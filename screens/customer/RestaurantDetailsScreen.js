import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "../../constants/Colors";
import { Icon } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import PagerView from "react-native-pager-view";

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

const RestaurantDetailsScreen = (props) => {
	const [stars, setStars] = useState(2.7);

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
				<PagerView style={styles.pagerView} initialPage={0}>
					<View collapsable={false} key="1">
						<Text>First page</Text>
					</View>
					<View collapsable={false} key="2">
						<Text>Second page</Text>
					</View>
				</PagerView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},

	header: {
		flexDirection: "row",
		flex: 2,
		borderBottomWidth: 1,
		borderBottomColor: "lightgrey",
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
		alignItems: "center",
		justifyContent: "center",
	},

	title: {
		fontSize: 32,
	},
	pagerView: { flex: 1 },
	page: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default RestaurantDetailsScreen;
