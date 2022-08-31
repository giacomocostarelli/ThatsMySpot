import React from "react";

import renderer, { act } from "react-test-renderer";
import WelcomeScreen from "../screens/WelcomeScreen";

test("Renders screen correctly before loading", () => {
	const tree = renderer.create(<WelcomeScreen />).toJSON();
	expect(tree).toMatchSnapshot();
});
