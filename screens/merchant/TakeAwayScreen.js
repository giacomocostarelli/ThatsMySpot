import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const TakeAwayScreen = (props) => {
	return (
		<View style={styles.centered}>
			<Image
				style={{ width: "50%", height: "30%" }}
				source={{
					uri: "https://cdn-icons-png.flaticon.com/512/5578/5578682.png",
				}}
			/>
		</View>
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
