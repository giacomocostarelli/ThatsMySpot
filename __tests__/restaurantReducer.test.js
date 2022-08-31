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

let restaurantToAdd;
let expectation;

beforeEach(() => {
	restaurantToAdd = {
		name: "restaurantName",
		ownerId: "ownerId",
		imageUrl: "imageUrl",
		description: "empty",
		category: "empty",
		stars: "0",
		phoneNumber: "empty",
		address: "empty",
		city: "city",
		openingTime: "19:00",
		closingTime: "24:00",
	};
	expectation = {
		type: "CREATE_RESTAURANT",
		restaurantToAdd,
	};
});

describe("restaurant reducer", () => {
	it("should return an empty list as initial state", () => {
		expect(reducer(undefined, {})).toEqual({
			currentRestaurant: null,
			restaurantsState: [],
		});
	});

	it("should create an action with type CREATE_RESTAURANT", () => {
		let createRestaurantFn = jest.fn();
		createRestaurantFn.mockReturnValue(expectation);
		expect(createRestaurantFn(restaurantToAdd.name)).toEqual(expectation);
	});

	it("should handle createRestaurant action", () => {
		let expectation = {
			currentRestaurant: null,
			restaurantsState: [restaurantToAdd],
		};
		expect(
			reducer(undefined, {
				type: "CREATE_RESTAURANT",
				restaurantData: restaurantToAdd,
			})
		).toStrictEqual(expectation);
	});

	it("should handle fetchRestaurant action", () => {
		let expectation = {
			currentRestaurant: null,
			restaurantsState: [restaurantToAdd],
		};

		expect(
			reducer(undefined, {
				type: "FETCH_RESTAURANTS",
				restaurantsData: [restaurantToAdd],
			})
		).toStrictEqual(expectation);
	});

	it("should handle getCurrentRestaurant action", () => {
		let expectation = {
			currentRestaurant: restaurantToAdd,
			restaurantsState: [restaurantToAdd],
		};

		expect(
			reducer(
				{ currentRestaurant: null, restaurantsState: [restaurantToAdd] },
				{
					type: "GET_CURRENT_RESTAURANT",
					currentRestName: restaurantToAdd.name,
				}
			)
		).toStrictEqual(expectation);
	});
});
