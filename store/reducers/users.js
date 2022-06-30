import {
	GET_STARRED,
	REMOVE_FROM_FAV,
	ADD_TO_FAV,
	ADD_USER,
	IS_USER_NEW,
} from "../actions/users";

import User from "../../models/user";

const initialState = {
	usersState: [],
	userStarred: [],
	isNewState: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_STARRED:
			console.log(" -- GET_STARRED store REDUCER -- ");
			return {
				...state,
				userStarred: action.userStarredAct,
			};

		case REMOVE_FROM_FAV:
			console.log(" -- REMOVE_FROM_FAV store REDUCER -- ");
			return {
				...state,
			};

		case ADD_TO_FAV:
			console.log(" -- ADD_TO_FAV store REDUCER -- ");
			return {
				...state,
			};

		case ADD_USER:
			console.log(" -- ADD_USER store REDUCER -- ");
			return {
				...state,
			};

		case IS_USER_NEW:
			console.log("-- IS_NEW_USER store REDUCER: " + action.isNewAction);
			return {
				...state,
				isNewState: action.isNewAction,
			};
		default:
			return state;
	}
};
