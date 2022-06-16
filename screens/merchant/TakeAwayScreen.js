import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const TakeAwayScreen = (props) => {
	return (
		<View style={styles.centered}>
			<Text>TakeAwayScreen</Text>
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
