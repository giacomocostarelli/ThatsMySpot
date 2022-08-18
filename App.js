import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { LogBox } from "react-native";

import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import * as Font from "expo-font";

import authReducer from "./store/reducers/auth";
import restaurantsReducer from "./store/reducers/restaurants";
import usersReducer from "./store/reducers/users";
import reservationsReducer from "./store/reducers/reservations";

import AppNavigator from "./navigation/AppNavigator";

const rootReducer = combineReducers({
	auth: authReducer,
	restaurants: restaurantsReducer,
	users: usersReducer,
	reservations: reservationsReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false);

	useEffect(() => {
		async function prepare() {
			console.log("\n************************************************");
			console.log("***************** THATS MY SPOT! ***************");
			console.log("************************************************\n");

			try {
				// Keep the splash screen visible while we fetch resources
				await SplashScreen.preventAutoHideAsync();
				// Pre-load fonts
				await Font.loadAsync({
					"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
					"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
					"open-sans-italic": require("./assets/fonts/OpenSans-Italic.ttf"),
					"open-sans-semi-bold-italic": require("./assets/fonts/OpenSans-SemiBoldItalic.ttf"),
					"rooster-font": require("./assets/fonts/RoosterPersonalUse-3z8d8.ttf"),
					"metropolis-font": require("./assets/fonts/MetropolisPersonalUseRegular-nR5LY.ttf"),
					"backslash-font": require("./assets/fonts/Backslash-RpJol.otf"),
					"youthtouch-font": require("./assets/fonts/YouthTouchDemoRegular-4VwY.ttf"),
					"standlist-font": require("./assets/fonts/Standlist-qZ6rq.ttf"),
					"roboto-font": require("./assets/fonts/Roboto-Regular.ttf"),
				});
			} catch (e) {
				console.warn(e);
			} finally {
				// Tell the application to render
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			// This tells the splash screen to hide immediately! If we call this after
			// `setAppIsReady`, then we may see a blank screen while the app is
			// loading its initial state and rendering its first pixels. So instead,
			// we hide the splash screen once we know the root view has already
			// performed layout.
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	LogBox.ignoreLogs([
		"EventEmitter.removeListener('keyboardDidHide', ...): Method has been deprecated. Please instead use `remove()` on the subscription returned by `EventEmitter.addListener`.",
	]);

	return (
		<View style={{ flex: 1 }} onLayout={onLayoutRootView}>
			<Provider store={store}>
				<AppNavigator />
			</Provider>
		</View>
	);
}
