import { LOGIN, SIGNUP, LOGOUT } from "../actions/auth";

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
			return {
				token: null,
				userId: null,
			};
		default:
			return state;
	}
};
