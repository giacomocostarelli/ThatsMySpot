import {
	CREATE_RESTAURANT,
	DELETE_RESTAURANT,
	FETCH_RESTAURANTS,
	GET_CURRENT_RESTAURANT,
} from "../actions/restaurants";

import Restaurant from "../../models/restaurant";

const initialState = {
	restaurantsState: [],
	currentRestaurant: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATE_RESTAURANT:
			/*let restaurantsStateTmp = state.restaurantsState.concat(
				action.restaurantToAdd
			);*/
			return {
				...state,
				//	restaurantsState: restaurantsStateTmp,
			};
		case FETCH_RESTAURANTS:
			return {
				...state,
				restaurantsState: action.restaurantsData,
			};

		case DELETE_RESTAURANT:
			return state;

		case GET_CURRENT_RESTAURANT:
			const currentRestaurantObj = state.restaurantsState.find(
				(restaurant) => restaurant.name === action.currentRestName
			);
			return {
				...state,
				currentRestaurant: currentRestaurantObj,
			};

		default:
			return state;
	}
};
