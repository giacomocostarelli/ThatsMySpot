import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	Pressable,
	Image,
	Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SearchBar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

//Redux actions.
import {
	fetchRestaurants,
	getCurrentRestaurant,
} from "../../store/actions/restaurants";
import { getStarred } from "../../store/actions/users";
import Colors from "../../constants/Colors";

const Item = ({ item }) => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	return (
		<Pressable
			onPress={() => {
				dispatch(getCurrentRestaurant(item.name));
				navigation.navigate("Details");
			}}
		>
			<View style={styles.itemContainer}>
				<Image
					style={styles.tinyLogo}
					source={{
						uri: item.imageUrl,
					}}
				/>
				<Text style={styles.item}>{item.name}</Text>
			</View>
		</Pressable>
	);
};

const SearchScreen = (props) => {
	const dispatch = useDispatch();

	//States.
	const [searchText, setSearchText] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const searchTemp = useSelector((state) => state.restaurants.restaurantsState);

	//Handlers.
	const updateSearch = (search) => {
		setSearchText(search);
	};

	useEffect(() => {
		if (searchText !== "") {
			const searchTempFiltered = searchTemp.filter((restaurant) =>
				restaurant.name.toLowerCase().includes(searchText.toLowerCase())
			);
			setSearchResult(searchTempFiltered);
		} else {
			setSearchResult([]);
		}
	}, [searchText]);

	const renderItem = ({ item }) => {
		return <Item item={item} />;
	};

	//Component.
	return (
		<View style={styles.container}>
			{/*<Button
				title="FETCH"
				onPress={() => {
					dispatch(fetchRestaurants());
					console.log("FETCH");
				}}
			/>
			<Button
				title="STARRED"
				onPress={() => {
					console.log(searchResult);
				}}
			/>
            */}
			<SearchBar
				platform="android"
				containerStyle={styles.containerStyle}
				placeholder="Cerca un ristorante..."
				onChangeText={updateSearch}
				value={searchText}
			/>
			{searchText === "" && (
				<View
					style={{
						alignItems: "center",
						justifyContent: "flex-start",
					}}
				>
					<Text
						style={{ fontSize: 18, color: Colors.accent, textAlign: "center" }}
					>
						Ricordi il nome del ristorante? {"\n"}Prenota subito!
					</Text>
				</View>
			)}
			<FlatList
				style={styles.flatlist}
				data={searchResult}
				renderItem={renderItem}
				keyExtractor={(item) => item.name}
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
	title: {
		fontSize: 32,
	},
});

export default SearchScreen;
