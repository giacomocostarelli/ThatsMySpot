import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Icon, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";

import Colors from "../../constants/Colors";
import { updateRestaurant } from "../../store/actions/restaurants";

const MyRestaurantScreen = (props) => {
	const dispatch = useDispatch();

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

	const submit = () => {
		let restaurantProps = {
			name: restaurantOwned.name,
			category: category,
			address: address === "" ? "empty" : address,
			description: description === "" ? "empty" : description,
			openingTime: restaurantOwned.openingTime,
			closingTime: restaurantOwned.closingTime,
			phoneNumber: phoneNumber === "" ? "empty" : phoneNumber,
			imageUrl: imageUrl,
		};
		dispatch(updateRestaurant(restaurantProps));
	};

	return (
		<View style={styles.centered}>
			<View style={styles.cardBody}>
				<View style={styles.dropdown}>
					<Text style={styles.dropdownLabel}> Category </Text>
					<DropDownPicker
						open={open}
						value={category}
						items={items}
						placeholder="Scegli la categoria del ristorante."
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
					value={address === "empty" ? "" : address}
					placeholder="Inserisci l'indirizzo."
					onChangeText={onChangeAddress}
				/>

				<Input
					labelStyle={{ color: Colors.secondary }}
					label="Descrizione"
					keyboardType="default"
					required
					autoCapitalize="none"
					value={description === "empty" ? "" : description}
					placeholder="Inserisci una descrizione."
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
					keyboardType="default"
					required
					autoCapitalize="none"
					value={phoneNumber === "empty" ? "" : phoneNumber}
					placeholder="Inserisci il tuo numero di telefono."
					onChangeText={onChangePhone}
				/>
				<Input
					labelStyle={{ color: Colors.secondary }}
					label="Immagine"
					keyboardType="default"
					required
					autoCapitalize="none"
					value={imageUrl === "empty" ? "" : imageUrl}
					onChangeText={onChangeImage}
				/>
				<Icon
					name="check"
					color={Colors.secondary}
					size={35}
					type="font-awesome"
					onPress={submit}
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
