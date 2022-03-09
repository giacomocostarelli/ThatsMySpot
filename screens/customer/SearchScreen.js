import React, { useState } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	Pressable,
	Button,
} from "react-native";
import { SearchBar } from "react-native-elements";
import Colors from "../../constants/Colors";
import Restaurant from "../../models/restaurant";
import { createRestaurant } from "../../store/actions/restaurants";
import { useDispatch } from "react-redux";

const DUMMYDATA = [
	{
		id: "1",
		title: "First Item",
	},
	{
		id: "2",
		title: "Second Item",
	},
	{
		id: "3",
		title: "Third Item",
	},
	{
		id: "4",
		title: "Third Item",
	},
	{
		id: "5",
		title: "Third Item",
	},
	{
		id: "6",
		title: "Third Item",
	},
	{
		id: "7",
		title: "Third Item",
	},
	{
		id: "8",
		title: "Third Item",
	},
];

const RESTA = new Restaurant(
	"Fast Food 3",
	null,
	"https://blog.italotreno.it/wp-content/uploads/2018/10/Ristoranti-particolari-Brescia-Areadocks-4-1140x660.jpg",
	"Fast food di prima classe per i più piccoli e per i più grandi",
	"Fast",
	5,
	123456789,
	"Via del Veloce 3",
	"Torino",
	"39.2343",
	"12.3456",
	"08:00",
	"22:00",
	null,
	null,
	null
);

const Item = ({ item, onPress, backgroundColor, textColor }) => (
	<Pressable onPress={onPress} style={[styles.item, backgroundColor]}>
		<Text style={[styles.title, textColor]}>{item.title}</Text>
	</Pressable>
);

const SearchScreen = (props) => {
	const dispatch = useDispatch();

	//States.
	const [searchText, setSearchText] = useState(" ");

	//Handlers.
	const updateSearch = (search) => {
		setSearchText(search);
	};
	const [selectedId, setSelectedId] = useState(null);

	const renderItem = ({ item }) => {
		const backgroundColor =
			item.id === selectedId ? Colors.accent : Colors.primary;
		const color = item.id === selectedId ? "white" : "black";
		return (
			<Item
				item={item}
				onPress={() => setSelectedId(item.id)}
				backgroundColor={{ backgroundColor }}
				textColor={{ color }}
			/>
		);
	};

	//Component.
	return (
		<View style={styles.container}>
			<Button
				title="ADD RESTAURANT"
				onPress={() => {
					dispatch(createRestaurant(RESTA));
					console.log("PRESSATO");
				}}
			/>
			<SearchBar
				platform="android"
				containerStyle={styles.containerStyle}
				placeholder="Cerca un ristorante..."
				onChangeText={updateSearch}
				value={searchText}
			/>
			<FlatList
				style={styles.flatlist}
				data={DUMMYDATA}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				extraData={selectedId}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
		flexDirection: "column",
	},
	containerStyle: {
		width: "90%",
		margin: "5%",
		borderRadius: 10,
		elevation: 3,
	},
	flatlist: {
		width: "90%",
	},
	item: {
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	title: {
		fontSize: 32,
	},
});

export default SearchScreen;
