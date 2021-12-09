import React, { useState } from "react";
import {
	View,
	Text,
	FlatList,
	Button,
	StyleSheet,
	ActivityIndicator,
	ScrollView,
	Pressable,
} from "react-native";
import { SearchBar } from "react-native-elements";
import Colors from "../../constants/Colors";
import Card from "../../components/Card";

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
const Item = ({ item, onPress, backgroundColor, textColor }) => (
	<Pressable onPress={onPress} style={[styles.item, backgroundColor]}>
		<Text style={[styles.title, textColor]}>{item.title}</Text>
	</Pressable>
);

const SearchScreen = (props) => {
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
