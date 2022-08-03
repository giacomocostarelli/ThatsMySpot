import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Icon, Input } from "react-native-elements";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";

const MyRestaurantScreen = (props) => {
	const userId = useSelector((state) => state.auth.userId);
	const restaurantOwned = useSelector((state) =>
		state.restaurants.restaurantsState.find(
			(restaurant) => restaurant.ownerId === userId
		)
	);

	const [category, onChangeCategory] = useState(restaurantOwned.category);
	const [address, onChangeAddress] = useState(restaurantOwned.address);
	const [description, onChangeDescription] = useState(
		restaurantOwned.description
	);
	const [openingTime, onChangeTime] = useState(
		`${restaurantOwned.openingTime} - ${restaurantOwned.closingTime}`
	);
	const [phoneNumber, onChangePhone] = useState(restaurantOwned.phoneNumber);
	const [imageUrl, onChangeImage] = useState(restaurantOwned.imageUrl);

	return (
		<View style={styles.centered}>
			<View style={styles.cardBody}>
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
					label="Categoria"
					keyboardType="default"
					required
					autoCapitalize="none"
					value={category}
					onChangeText={onChangeCategory}
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
					keyboardType="default"
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
});

export default MyRestaurantScreen;
