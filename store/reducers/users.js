import { GET_STARRED, REMOVE_FROM_FAV, ADD_TO_FAV } from "../actions/users";

import User from "../../models/user";

const initialState = {
	usersState: [],
	userStarred: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_STARRED:
			console.log(" -- GET_STARRED store REDUCER -- ");
			console.log(action.userStarredAct);
			return {
				...state,
				userStarred: action.userStarredAct,
			};

		case REMOVE_FROM_FAV:
			console.log(" -- REMOVE_FROM_FAV store REDUCER -- ");
			console.log(action.toRemove);

			return {
				...state,
			};

		case ADD_TO_FAV:
			console.log(" -- ADD_TO_FAV store REDUCER -- ");
			console.log(action.toAddAction);

			return {
				...state,
			};

		default:
			return state;
	}
};
