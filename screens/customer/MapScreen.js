import React, { useState } from "react";
import {
	View,
	Text,
	FlatList,
	Button,
	StyleSheet,
	ActivityIndicator,
} from "react-native";

const MapScreen = (props) => {
	return (
		<View style={styles.centered}>
			<Text>MapScreen</Text>
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

export default MapScreen;
