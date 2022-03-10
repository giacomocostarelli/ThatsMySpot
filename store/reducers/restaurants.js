import {
	CREATE_RESTAURANT,
	DELETE_RESTAURANT,
	FETCH_RESTAURANTS,
} from "../actions/restaurants";

import Restaurant from "../../models/restaurant";

const initialState = {
	restaurantsState: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATE_RESTAURANT:
			const newRestaurant = new Restaurant(
				action.restaurantData.name,
				action.restaurantData.ownerId,
				action.restaurantData.imageUrl,
				action.restaurantData.description,
				action.restaurantData.category,
				action.restaurantData.stars,
				action.restaurantData.phoneNumber,
				action.restaurantData.address,
				action.restaurantData.city,
				action.restaurantData.latitude,
				action.restaurantData.longitude,
				action.restaurantData.openingTime,
				action.restaurantData.closingTime,
				action.restaurantData.menu,
				action.restaurantData.prenotations,
				action.restaurantData.takeaways
			);
			return {
				...state,
				restaurants: state.restaurants.concat(newRestaurant),
			};
		case FETCH_RESTAURANTS:
			const loadedRestaurants = [];
			for (const key in action.restaurantsData) {
				loadedRestaurants.push(
					new Restaurant(
						key,
						action.restaurantsData[key].ownerId,
						action.restaurantsData[key].imageUrl,
						action.restaurantsData[key].description,
						action.restaurantsData[key].category,
						action.restaurantsData[key].stars,
						action.restaurantsData[key].phoneNumber,
						action.restaurantsData[key].address,
						action.restaurantsData[key].city,
						action.restaurantsData[key].latitude,
						action.restaurantsData[key].longitude,
						action.restaurantsData[key].openingTime,
						action.restaurantsData[key].closingTime
					)
				);
			}
			return {
				...state,
				restaurantsState: loadedRestaurants,
			};

		case DELETE_RESTAURANT:
			return state;
		default:
			return state;
	}
};
