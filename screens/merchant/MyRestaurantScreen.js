import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon, Input } from "react-native-elements";
import Colors from "../../constants/Colors";

const MyRestaurantScreen = (props) => {
	const [name, onChangeName] = useState("La pizzeria");
	const [address, onChangeAddress] = useState("Via delle Pizze 21");
	const [description, onChangeDescription] = useState(
		"La pizza più buona dell egitto"
	);
	const [openingTime, onChangeTime] = useState("8:00 - 20:00");
	const [phoneNumber, onChangePhone] = useState("392 098 7652");
	const [imageUrl, onChangeImage] = useState(
		"https://www.studioallievi.com/wp-content/uploads/2017/07/Aprire-un-fast-food.jpg"
	);

	return (
		<View style={styles.centered}>
			<View style={styles.cardBody}>
				<Input
					label="Nome del ristorante"
					labelStyle={{ color: Colors.secondary }}
					keyboardType="default"
					required
					autoCapitalize="none"
					value={name}
					onChangeText={onChangeName}
				/>
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
						console.log("bella");
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
