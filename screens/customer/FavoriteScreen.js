import React, { useState } from "react";
import {
	View,
	Text,
	FlatList,
	Button,
	Image,
	StyleSheet,
	SectionList,
} from "react-native";
import { SearchBar } from "react-native-elements";

import Colors from "../../constants/Colors";

const FavoriteScreen = (props) => {
	//Data for the section list.
	const favorites = [
		{ title: "A", data: ["Alberto", "Angelo", "Anna"] },
		{ title: "D", data: ["Devin", "Dan", "Dominic"] },
		{ title: "E", data: ["Emanuele", "Elia", "Ernesto"] },
		{ title: "J", data: ["Jackson", "James", "Jillian"] },
		{ title: "M", data: ["Marco", "Moira", "Martina"] },
	];

	return (
		<View style={styles.container}>
			<SectionList
				style={styles.sectionContainer}
				sections={favorites}
				renderItem={({ item }) => (
					<View style={styles.itemContainer}>
						<Image
							style={styles.tinyLogo}
							source={{
								uri: "https://www.collinsdictionary.com/images/full/restaurant_135621509.jpg",
							}}
						/>
						<Text style={styles.item}>{item}</Text>
					</View>
				)}
				renderSectionHeader={({ section }) => (
					<Text style={styles.sectionHeader}>{section.title}</Text>
				)}
				keyExtractor={(item, index) => index}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	sectionContainer: {
		margin: "5%",
	},
	sectionHeader: {
		color: Colors.accent,
		marginHorizontal: "5%",
		marginVertical: "3%",
		fontSize: 24,
		fontWeight: "bold",
	},
	itemContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	item: {
		flex: 8,
		margin: "5%",
		padding: 10,
		fontSize: 18,
		height: 44,
	},
	tinyLogo: {
		flex: 2,
		width: 50,
		height: 50,
	},
});

export default FavoriteScreen;
