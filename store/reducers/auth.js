import { LOGIN, SIGNUP, LOGOUT, GET_USER_ROLE } from "../actions/auth";

const initialState = {
	token: null,
	userId: null,
	isMerchant: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				token: action.token,
				userId: action.userId,
			};
		case SIGNUP:
			return {
				token: action.token,
				userId: action.userId,
				isMerchant: action.isMerchant,
			};
		case LOGOUT:
			console.log("LOGOUT successful.");

			return {
				token: null,
				userId: null,
				isMerchant: null,
			};
		case GET_USER_ROLE:
			console.log("GET_USER_ROLE Reducer.");
			console.log("-------------------------");
			return {
				...state,
				isMerchant: action.role === "merchant" ? true : false,
			};
		default:
			return state;
	}
};
