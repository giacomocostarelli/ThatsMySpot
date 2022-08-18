export const GET_RESERVATIONS = "GET_RESERVATIONS";
export const ASK_RESERVATION = "ASK_RESERVATION";
export const DENY_RESERVATION = "DENY_RESERVATION";
export const CONFIRM_RESERVATION = "CONFIRM_RESERVATION";

export const askForReservation = (reservObj) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		const userId = getState().auth.userId;
		const currentRestaurant = getState().restaurants.currentRestaurant;

		console.log(currentRestaurant);

		console.log("ASK_RESERVATION Request.");
		console.log("-------------------------");

		const response = await fetch(
			`https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/reservations/${currentRestaurant.ownerId}/${currentRestaurant.name}/pending.json?auth=${token}`,
			{
				method: "PUT ",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					date: reservObj.date,
					time: reservObj.time,
					number: reservObj.number,
					customerId: userId,
				}),
			}
		);
		const resData = await response.json();

		dispatch({
			type: ASK_RESERVATION,
		});
	};
};

//TODO
export const getCurrentReservations = (merchantId) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		const userId = getState().auth.userId;

		console.log("GET_RESERVATIONS Request.");
		/*
        const response = await fetch(
            `https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/starred/${name}/starts.json?auth=${token}`,
            {
                method: "PUT ",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(toAdd),
            }
        );
        const resData = await response.json();
*/
		dispatch({
			type: GET_RESERVATIONS,
			//toAddAction: name,
		});
	};
};

//TODO
export const denyReservation = (name) => {
	return async (dispatch, getState) => {
		const userId = getState().auth.userId;
		const token = getState().auth.token;
		console.log(" -- REMOVE_FROM_FAV Request -- ");
		/*
		const response = await fetch(
			`https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/starred/${name}.json?auth=${token}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const resData = await response.json();
		dispatch({
			type: REMOVE_FROM_FAV,
			toRemove: name,
		});
        */
	};
};

//TODO
export const confirmReservation = (name) => {
	return async (dispatch, getState) => {
		const userId = getState().auth.userId;
		const token = getState().auth.token;
		console.log(" -- REMOVE_FROM_FAV Request -- ");
		/*
		const response = await fetch(
			`https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/starred/${name}.json?auth=${token}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const resData = await response.json();
		dispatch({
			type: REMOVE_FROM_FAV,
			toRemove: name,
		});
        */
	};
};
