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
				...state,
				pendingReservations: action.pendingListAction,
				confirmedReservations: action.confirmedListAction,
			};

		case ASK_RESERVATION:
			return {
				state,
			};

		case CONFIRM_RESERVATION:
			let toMoveRes = state.pendingReservations.find(
				(reservation) => reservation.customerId === action.customerIdAction
			);
			let pendingListTmp = state.pendingReservations.filter(
				(reservation) => reservation.customerId !== toMoveRes.customerId
			);
			let confirmedListTmp = state.confirmedReservations.concat(toMoveRes);

			return {
				pendingReservations: pendingListTmp,
				confirmedReservations: confirmedListTmp,
			};

		case DENY_RESERVATION:
			let toRemoveRes = state.pendingReservations.find(
				(reservation) => reservation.customerId === action.customerIdAction
			);
			let pendingListTmpDeny = state.pendingReservations.filter(
				(reservation) => reservation.customerId !== toRemoveRes.customerId
			);
			return {
				...state,
				pendingReservations: pendingListTmpDeny,
			};

		default:
			return state;
	}
};
