import {
	GET_RESERVATIONS,
	ASK_RESERVATION,
	DENY_RESERVATION,
	CONFIRM_RESERVATION,
} from "../actions/reservations";

const initialState = {
	pendingReservations: [],
	confirmedReservations: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_RESERVATIONS:
			return {
				state,
			};

		case ASK_RESERVATION:
			return {
				state,
			};

		default:
			return state;
	}
};
