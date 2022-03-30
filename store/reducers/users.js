import { GET_STARRED, REMOVE_FROM_FAV } from "../actions/users";

import User from "../../models/user";

const initialState = {
	usersState: [],
	userStarred: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_STARRED:
			console.log(" -- GET_STARRED store reducer started -- ");
			console.log(action.userStarredAct);
			console.log(" -- GET_STARRED store reducer ended -- ");
			return {
				...state,
				userStarred: action.userStarredAct,
			};
		case REMOVE_FROM_FAV:
			console.log(" -- REMOVE_FROM_FAV store reducer started -- ");
			console.log(action.toRemove);
			console.log(" -- REMOVE_FROM_FAV store reducer ended -- ");
			const userStarredUpdated = state.userStarred.filter(
				(restaurant) => restaurant !== action.remove
			);
			return {
				...state,
				userStarred: userStarredUpdated,
			};

		default:
			return state;
	}
};
