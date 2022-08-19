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
			console.log(action.pendingListAction);
			let pendingTmp = state.confirmedReservations.concat(
				action.pendingListAction
			);
			return {
				...state,
				pendingReservations: pendingTmp,
			};

		case ASK_RESERVATION:
			return {
				state,
			};

		default:
			return state;
	}
};
