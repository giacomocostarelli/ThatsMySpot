import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Icon, Input } from "react-native-elements";
import { useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";

import Colors from "../../constants/Colors";

const MyRestaurantScreen = (props) => {
	const userId = useSelector((state) => state.auth.userId);
	const restaurantOwned = useSelector((state) =>
		state.restaurants.restaurantsState.find(
			(restaurant) => restaurant.ownerId === userId
		)
	);
	const [open, setOpen] = useState(false);
	const [items, setItems] = useState([
		{ label: "Pizza", value: "Pizza" },
		{ label: "Fast Food", value: "Fast Food" },
		{ label: "Greco", value: "Greco" },
		{ label: "Hamburger", value: "Hamburger" },
		{ label: "Messicano", value: "Messicano" },
		{ label: "Carne", value: "Carne" },
		{ label: "Pesce", value: "Pesce" },
		{ label: "Sushi", value: "Sushi" },
		{ label: "Tavola Calda", value: "Tavola Calda" },
	]);

	const [address, onChangeAddress] = useState(restaurantOwned.address);
	const [description, onChangeDescription] = useState(
		restaurantOwned.description
	);
	const [category, onChangeCategory] = useState(restaurantOwned.category);
	const [openingTime, onChangeTime] = useState(
		`${restaurantOwned.openingTime} - ${restaurantOwned.closingTime}`
	);
	const [phoneNumber, onChangePhone] = useState(restaurantOwned.phoneNumber);
	const [imageUrl, onChangeImage] = useState(restaurantOwned.imageUrl);

	return (
		<View style={styles.centered}>
			<View style={styles.cardBody}>
				<View style={styles.dropdown}>
					<Text style={styles.dropdownLabel}> Category </Text>
					<DropDownPicker
						open={open}
						value={category}
						items={items}
						setOpen={setOpen}
						setValue={onChangeCategory}
						setItems={setItems}
					/>
				</View>

				<Input
					labelStyle={{ color: Colors.secondary }}
					label="Indirizzo"
					keyboardType="default"
					required
					autoCapitalize="none"
					value={address}
					onChangeText={onChangeAddress}
				/>

				<Input
					labelStyle={{ color: Colors.secondary }}
					label="Descrizione"
					keyboardType="default"
					required
					autoCapitalize="none"
					value={description}
					onChangeText={onChangeDescription}
				/>
				<Input
					labelStyle={{ color: Colors.secondary }}
					label="Orario di apertura"
					keyboardType="default"
					required
					autoCapitalize="none"
					value={openingTime}
					onChangeText={onChangeTime}
				/>
				<Input
					labelStyle={{ color: Colors.secondary }}
					label="Telefono"
					keyboardType="number-pad"
					required
					autoCapitalize="none"
					value={phoneNumber}
					onChangeText={onChangePhone}
				/>
				<Input
					labelStyle={{ color: Colors.secondary }}
					label="Immagine"
					keyboardType="default"
					required
					autoCapitalize="none"
					value={imageUrl}
					onChangeText={onChangeImage}
				/>
				<Icon
					name="check"
					color={Colors.secondary}
					size={35}
					type="font-awesome"
					onPress={() => {
						console.log(restaurantOwned);
					}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	cardBody: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	dropdown: {
		width: "95%",
		margin: 10,
	},

	dropdownLabel: {
		fontSize: 16,
		fontWeight: "bold",
		color: Colors.secondary,
		marginBottom: 10,
	},
});

export default MyRestaurantScreen;
