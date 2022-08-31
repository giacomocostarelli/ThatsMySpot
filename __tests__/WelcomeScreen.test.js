import React from "react";

import renderer, { act } from "react-test-renderer";
import WelcomeScreen from "../screens/WelcomeScreen";
import { render, screen, fireEvent } from "@testing-library/react-native";

test("Renders screen correctly before loading", () => {
	let tree;
	tree = renderer.create(<WelcomeScreen />).toJSON();
	expect(tree).toMatchSnapshot();
});

test("Renders screen correctly after pressing the button loading", () => {
	const { update } = render(<WelcomeScreen />);
	const button = screen.getByText("Iniziamo!");
	fireEvent.press(button);
	update(<WelcomeScreen />);
	expect(screen.toJSON()).toMatchSnapshot();
});

/* 
test("Renders screen correctly after loading", () => {
	let tree;
	act(() => {
		tree = renderer.create(<WelcomeScreen />).toJSON();
	});

	expect(setTimeout).toHaveBeenCalledTimes(2);
	expect(tree).toMatchSnapshot();
});

test("Renders screen correctly after 2loading", () => {
	let tree;
	act(() => {
		tree = renderer.create(<WelcomeScreen />).toJSON();
	});

	expect(setTimeout).toHaveBeenCalledTimes(2);
	expect(tree).toMatchSnapshot();
}); */
