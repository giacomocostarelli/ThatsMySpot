import React, { useState, useEffect, setState } from "react";
import {
	View,
	Text,
	FlatList,
	Button,
	StyleSheet,
	ActivityIndicator,
	Dimensions,
} from "react-native";
import Geolocation from "react-native-geolocation-service";
import * as Location from "expo-location";
import MapView from "react-native-maps";

const MapScreen = (props) => {
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [initial, setInitial] = useState(null);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}
			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
			let text = "Waiting..";
			if (errorMsg) {
				text = errorMsg;
			} else if (location) {
				text = JSON.stringify(location);
				setInitial({
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					latitudeDelta: 0.0025,
					longitudeDelta: 0.0025,
				});
			}
		})();
	}, []);

	return (
		<View style={styles.container}>
			{initial && (
				<MapView
					loadingEnabled={true}
					showsTraffic={true}
					mapPadding={{ top: 100 }}
					showsMyLocationButton={true}
					showsUserLocation={true}
					initialRegion={initial}
					style={styles.map}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
});

export default MapScreen;
