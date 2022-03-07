import {
	CREATE_RESTAURANT,
	DELETE_RESTAURANT,
	FETCH_RESTAURANTS,
} from "../actions/restaurants";

import Restaurant from "../../models/restaurant";

const initialState = {
	restaurants: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATE_RESTAURANT:
			return state;
		case DELETE_RESTAURANT:
			return state;
		case FETCH_RESTAURANTS:
			return state;
		default:
			return state;
	}
};
