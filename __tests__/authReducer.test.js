import React from "react";

import {
	createRestaurant,
	fetchRestaurants,
	getCurrentRestaurant,
	CREATE_RESTAURANT,
	FETCH_RESTAURANTS,
	GET_CURRENT_RESTAURANT,
} from "../store/actions/restaurants";
import reducer from "../store/reducers/restaurants";
import renderer, { act } from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react-native";
