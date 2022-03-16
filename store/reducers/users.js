import { GET_STARRED } from "../actions/users";

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
		default:
			return state;
	}
};
