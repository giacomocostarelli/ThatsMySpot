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
import { getCurrentRestaurant } from "../../store/actions/restaurants";
import Colors from "../../constants/Colors";

const FavoriteScreen = (props) => {
	//Data for the section list.
	const dispatch = useDispatch();
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
	const [favsState, setFavsState] = useState([]);

	useEffect(() => {
		createSections();
		//console.log(starred);
	}, [starred]);

	const createSections = () => {
		//Create sections for the list.
		for (let restaurant in starred) {
			for (let i = 0; i < favs.length; i++) {
				if (favs[i].title === restaurant[0]) {
					favs[i].data.push(restaurant);
				}
			}
		}
		let sectionsFilled = [];
		for (let i = 0; i < favs.length; i++) {
			if (favs[i].data.length > 0) {
				sectionsFilled.push({ title: favs[i].title, data: favs[i].data });
			}
		}
		//console.log(sectionsFilled)
		setFavsState(sectionsFilled);
	};
	//check if favs.data is empty
	const isEmpty = (favs) => {
		for (let i = 0; i < favs.length; i++) {
			if (favs[i].data.length > 0) {
				return false;
			}
		}
		return true;
	};

	let favComponent;
	if (isEmpty(favsState)) {
		favComponent = (
			<View style={styles.containerEmpty}>
				<Text style={styles.emptyText}>
					Non hai ancora aggiunto dei Preferiti.
				</Text>
			</View>
		);
	} else {
		favComponent = (
			<View style={styles.container}>
				<SectionList
					style={styles.sectionContainer}
					sections={favsState}
					renderItem={({ item }) => (
						<Pressable
							onPress={() => {
								dispatch(getCurrentRestaurant(item));
								props.navigation.navigate("Details");
							}}
						>
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
					renderSectionHeader={({ section }) => (
						<Text style={styles.sectionHeader}>{section.title}</Text>
					)}
					keyExtractor={(item, index) => index}
				/>
			</View>
		);
	}
	return favComponent;
};

const styles = StyleSheet.create({
	containerEmpty: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
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
	emptyText: {
		fontSize: 18,
		color: Colors.secondary,
		fontFamily: "open-sans",
	},
});

export default FavoriteScreen;
