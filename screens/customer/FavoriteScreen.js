import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	FlatList,
	Button,
	Image,
	StyleSheet,
	SectionList,
	Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../../constants/Colors";

const FavoriteScreen = (props) => {
	//Data for the section list.
	const starred = useSelector((state) => state.users.userStarred);
	const favs = [
		{ title: "A", data: [] },
		{ title: "B", data: [] },
		{ title: "C", data: [] },
		{ title: "D", data: [] },
		{ title: "E", data: [] },
		{ title: "F", data: [] },
		{ title: "G", data: [] },
		{ title: "H", data: [] },
		{ title: "I", data: [] },
		{ title: "J", data: [] },
		{ title: "K", data: [] },
		{ title: "L", data: [] },
		{ title: "M", data: [] },
		{ title: "N", data: [] },
		{ title: "O", data: [] },
		{ title: "P", data: [] },
		{ title: "Q", data: [] },
		{ title: "R", data: [] },
		{ title: "S", data: [] },
		{ title: "T", data: [] },
		{ title: "U", data: [] },
		{ title: "V", data: [] },
		{ title: "W", data: [] },
		{ title: "X", data: [] },
		{ title: "Y", data: [] },
		{ title: "Z", data: [] },
	];
	const [favsState, setFavsState] = useState(favs);
	useEffect(() => {
		for (let restaurant in starred) {
			for (let i = 0; i < favs.length; i++) {
				if (favs[i].title.toLowerCase() === restaurant[0]) {
					favs[i].data.push(restaurant);
				}
			}
		}
		setFavsState(favs);
	}, [starred]);

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
				sections={favsState}
				renderItem={({ item }) => (
					<Pressable onPress={() => {}}>
						<View style={styles.itemContainer}>
							<Image
								style={styles.tinyLogo}
								source={{
									uri: "https://www.collinsdictionary.com/images/full/restaurant_135621509.jpg",
								}}
							/>
							<Text style={styles.item}>{item}</Text>
						</View>
					</Pressable>
				)}
				renderSectionHeader={({ section }) =>
					section.data.length !== 0 && (
						<Text style={styles.sectionHeader}>{section.title}</Text>
					)
				}
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
		color: Colors.secondary,
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
