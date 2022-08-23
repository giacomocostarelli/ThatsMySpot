import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";

const TakeAwayScreen = (props) => {
	const image = {
		uri: "https://background-tiles.com/overview/blue/patterns/large/1063.png",
	};
	return (
		<ImageBackground source={image} resizeMode="repeat" style={styles.centered}>
			<Image
				style={{ width: "70%", height: "45%" }}
				source={{
					uri: "https://cdn-icons-png.flaticon.com/512/5578/5578682.png",
				}}
			/>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default TakeAwayScreen;
