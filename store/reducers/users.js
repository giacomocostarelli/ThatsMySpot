import {
	GET_STARRED,
	REMOVE_FROM_FAV,
	ADD_TO_FAV,
	ADD_USER,
	IS_USER_NEW,
	OWNER_OF,
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
			console.log("GET_STARRED Reducer.");
			console.log("-------------------------");

			return {
				...state,
				userStarred: action.userStarredAct,
			};

		case REMOVE_FROM_FAV:
			console.log("REMOVE_FROM_FAV Reducer.");
			console.log("-------------------------");

			return {
				...state,
			};

		case ADD_TO_FAV:
			console.log("ADD_TO_FAV Reducer.");
			console.log("-------------------------");

			return {
				...state,
			};
		case OWNER_OF:
			console.log("OWNER_OF Reducer.");
			console.log("-------------------------");

			return {
				...state,
			};

		case ADD_USER:
			console.log("ADD_USER Reducer.");
			console.log("-------------------------");

			return {
				...state,
			};

		case IS_USER_NEW:
			console.log("IS_NEW_USER Reducer.");
			console.log("Is User new : " + action.isNewAction);
			console.log("-------------------------");
			return {
				...state,
				isNewState: action.isNewAction,
			};
		default:
			return state;
	}
};
