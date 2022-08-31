import React from "react";

import renderer, { act } from "react-test-renderer";
import Card from "../components/Card";

test("Renders component correctly.", () => {
	const tree = renderer.create(<Card />).toJSON();
	expect(tree).toMatchSnapshot();
});
