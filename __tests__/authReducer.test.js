import React from "react";
import renderer, { act } from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react-native";

import {
	LOGIN,
	SIGNUP,
	LOGOUT,
	login,
	signup,
	logout,
} from "../store/actions/auth";
import reducer from "../store/reducers/auth";

describe("auth logic tests", () => {
	it("should return an empty list as initial state", () => {
		expect(reducer(undefined, {})).toEqual({
			token: null,
			userId: null,
			isMerchant: null,
		});
	});
	/* 
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
            */
});
