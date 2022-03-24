import React, { useState, useEffect, setState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Marker, Callout } from "react-native-maps";
import { WebView } from "react-native-webview";
import { useDispatch, useSelector } from "react-redux";

/*// generate random coords around x0 and y0.
function generateCoordinate() {
	var r = 200 / 111300, // = 100 meters
		y0 = 45.1239837,
		x0 = 7.6243529,
		u = Math.random(),
		v = Math.random(),
		w = r * Math.sqrt(u),
		t = 2 * Math.PI * v,
		x = w * Math.cos(t),
		y1 = w * Math.sin(t),
		x1 = x / Math.cos(y0);

	let newY = y0 + y1;
	let newX = x0 + x1;
	return { latitude: newY, longitude: newX };
}
*/
/* // given a list of restaus returns their coordinates.
function findCoordinates(state) {
	let markers = [];
	const restaurantLatLong = state;
	for (let i = 0; i < restaurantLatLong.length; i++) {
		markers.push({
			latitude: restaurantLatLong[i].latitude,
			longitude: restaurantLatLong[i].longitude,
		});
	}
	return markers;
}
*/

const MapScreen = (props) => {
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [initial, setInitial] = useState(null);
	const { navigate } = props.navigation;

	//Read restaurants coordinates from redux store.
	const restaurants = useSelector(
		(state) => state.restaurants.restaurantsState
	);

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
				//console.log(initial);
			}
		})();
	}, []);

	return (
		<View style={styles.container}>
			{initial && (
				<MapView
					loadingEnabled={true}
					showsTraffic={false}
					mapPadding={{ top: 100 }}
					showsMyLocationButton={true}
					showsUserLocation={true}
					initialRegion={initial}
					style={styles.map}
				>
					{restaurants.map(function (object, i) {
						return (
							<Marker
								onPress={(e) => console.log(e.nativeEvent)}
								coordinate={{
									latitude: object.latitude,
									longitude: object.longitude,
								}}
								key={i}
							>
								<Callout
									style={{}}
									onPress={() => {
										//NAVIGATE TO RESTAURANT SCREEN.
										props.navigation.navigate("Details");
									}}
								>
									<View
										style={{ alignItems: "center", justifyContent: "center" }}
									>
										<WebView
											style={{ height: 100, width: 150 }}
											source={{
												uri: object.imageUrl,
											}}
										/>
										<Text>{object.name}</Text>
									</View>
								</Callout>
							</Marker>
						);
					})}
				</MapView>
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
