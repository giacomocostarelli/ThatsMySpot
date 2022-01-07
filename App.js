import React, { useState, useEffect } from "react";
import AppLoading from "expo-app-loading";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import ReduxThunk from "redux-thunk";
import authReducer from "./store/reducers/auth";

import AppNavigator from "./navigation/AppNavigator";

const rootReducer = combineReducers({
	auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = async () => {
	return Font.loadAsync({
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
};

export default function App() {
	const [fontLoaded, setFontLoaded] = useState(false);

	if (!fontLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => {
					setFontLoaded(true);
				}}
				onError={(error) => {
					console.log(error);
				}}
			/>
		);
	}

	return (
		<Provider store={store}>
			<AppNavigator />
		</Provider>
	);
}
