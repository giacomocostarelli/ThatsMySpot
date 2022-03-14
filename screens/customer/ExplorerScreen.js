import React from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	ScrollView,
	Image,
	Pressable,
} from "react-native";

import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";

const RISTORANTI = [
	{
		id: "1",
		title: "First ",
		uri: "https://www.collinsdictionary.com/images/full/restaurant_135621509.jpg",
	},
	{
		id: "2",
		title: "Second ",
		uri: "https://www.collinsdictionary.com/images/full/restaurant_135621509.jpg",
	},
	{
		id: "3",
		title: "Third ",
		uri: "https://www.collinsdictionary.com/images/full/restaurant_135621509.jpg",
	},
	{
		id: "4",
		title: "Third ",
		uri: "https://www.collinsdictionary.com/images/full/restaurant_135621509.jpg",
	},
	{
		id: "5",
		title: "Third ",
		uri: "https://www.collinsdictionary.com/images/full/restaurant_135621509.jpg",
	},
	{
		id: "6",
		title: "Third ",
		uri: "https://www.collinsdictionary.com/images/full/restaurant_135621509.jpg",
	},
	{
		id: "7",
		title: "Third ",
		uri: "https://www.collinsdictionary.com/images/full/restaurant_135621509.jpg",
	},
	{
		id: "8",
		title: "Third ",
		uri: "https://www.collinsdictionary.com/images/full/restaurant_135621509.jpg",
	},
];

const renderItem = ({ item }) => {
	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
				marginRight: 22,
			}}
		>
			<Pressable onPress={() => {}}>
				<Image
					style={styles.tinyLogo}
					source={{
						uri: item.imageUrl,
					}}
				/>
			</Pressable>
			<Text
				style={{
					fontSize: 17,
				}}
			>
				{item.name}
			</Text>
		</View>
	);
};

const Row = ({ category }) => {
	const userId = useSelector((state) => state.auth.userId);
	const token = useSelector((state) => state.auth.token);
	const rests = useSelector((state) => state.restaurants.restaurantsState);
	// restaurant with category = category
	const restsWithCategory = rests.filter((rest) => rest.category === category);
	return (
		<View style={styles.rowContainer}>
			<View style={styles.tipology}>
				<Text
					style={{
						fontSize: 20,
						fontWeight: "bold",
						color: Colors.secondary,
						marginBottom: 20,
					}}
					onPress={() => {
						console.log("USER ID : ", userId);
						console.log("TOKEN : ", token);
						//console.log("REST : ", rests);
					}}
				>
					{category}
				</Text>
			</View>
			<View style={styles.list}>
				<FlatList
					showsHorizontalScrollIndicator={false}
					horizontal={true}
					style={styles.list}
					data={restsWithCategory}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
				/>
			</View>
		</View>
	);
};

const ExplorerScreen = () => {
	return (
		<View style={{ flex: 1 }}>
			<ScrollView style={styles.container}>
				<Row category={"Pizza"} />
				<Row category={"Hamburger"} />
				<Row category={"Sushi"} />
				<Row category={"Tavola Calda"} />
				<Row category={"Pesce"} />
				<Row category={"Carne"} />
				<Row category={"Fast Food"} />
				<Row category={"Messicano"} />
				<Row category={"Greco"} />
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		margin: 20,
	},

	rowContainer: {
		display: "flex",
		borderColor: "black",
		margin: 10,
	},
	tipology: {
		flex: 1,
	},

	list: {
		flex: 1,
	},

	tinyLogo: {
		width: 150,
		height: 150,
	},
});

export default ExplorerScreen;
