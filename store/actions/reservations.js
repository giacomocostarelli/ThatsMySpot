export const GET_RESERVATIONS = "GET_RESERVATIONS";
export const ASK_RESERVATION = "ASK_RESERVATION";
export const DENY_RESERVATION = "DENY_RESERVATION";
export const CONFIRM_RESERVATION = "CONFIRM_RESERVATION";

export const askForReservation = (reservObj) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		const userId = getState().auth.userId;
		const currentRestaurant = getState().restaurants.currentRestaurant;
		try {
			console.log("ASK_RESERVATION Request.");
			console.log("-------------------------");

			const response = await fetch(
				`https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/reservations/${currentRestaurant.ownerId}/${currentRestaurant.name}/pending/${userId}.json?auth=${token}`,
				{
					method: "PUT ",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						date: reservObj.date,
						time: reservObj.time,
						number: reservObj.number,
						email: reservObj.email,
					}),
				}
			);
			const resData = await response.json();

			dispatch({
				type: ASK_RESERVATION,
			});
		} catch (err) {
			throw err;
		}
	};
};

export const getCurrentReservations = () => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		const userId = getState().auth.userId;
		let confirmedList = [];
		let pendingList = [];

		try {
			// PENDING Reservations
			const response = await fetch(
				`https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/reservations/${userId}.json?auth=${token}`
			);
			if (!response.ok) {
				throw new Error("Qualcosa è andato storto : GET_RESERVATIONS.");
			}
			const resData = await response.json();

			if (resData !== "undefined" && resData !== null) {
				let pendingObj = Object.values(resData)[0].pending;

				for (const resObj in pendingObj) {
					let singleReservation = null;
					singleReservation = {
						customerId: resObj,
						date: pendingObj[resObj].date,
						time: pendingObj[resObj].time,
						number: pendingObj[resObj].number,
						email: pendingObj[resObj].email,
					};
					pendingList.push(singleReservation);
				}

				console.log("GET_RESERVATIONS Request.");
				console.log("-------------------------");

				// CONFIRMED Reservations
				let confirmedObj = Object.values(resData)[0].confirmed;

				for (const resObj in confirmedObj) {
					let singleReservation = null;
					singleReservation = {
						customerId: resObj,
						date: confirmedObj[resObj].date,
						time: confirmedObj[resObj].time,
						number: confirmedObj[resObj].number,
						email: confirmedObj[resObj].email,
					};
					confirmedList.push(singleReservation);
				}
			}
			dispatch({
				type: GET_RESERVATIONS,
				pendingListAction: pendingList,
				confirmedListAction: confirmedList,
			});
		} catch (err) {
			throw err;
		}
	};
};

export const confirmReservation = (reservObj) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		const userId = getState().auth.userId;
		const restaurant = getState().restaurants.restaurantsState.find(
			(restaurant) => restaurant.ownerId === userId
		);

		console.log("CONFIRM_RESERVATION Request.");
		console.log("-------------------------");
		try {
			//Add to confirmed
			const responseAdd = await fetch(
				`https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/reservations/${userId}/${restaurant.name}/confirmed/${reservObj.customerId}.json?auth=${token}`,
				{
					method: "PUT ",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						date: reservObj.date,
						time: reservObj.time,
						number: reservObj.number,
						email: reservObj.email,
					}),
				}
			);
			const resDataAdd = await responseAdd.json();

			//Remove from pending
			const responseDel = await fetch(
				`https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/reservations/${userId}/${restaurant.name}/pending/${reservObj.customerId}.json?auth=${token}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const resDataDel = await responseDel.json();

			dispatch({
				type: CONFIRM_RESERVATION,
				customerIdAction: reservObj.customerId,
			});
		} catch (err) {
			throw err;
		}
	};
};

//TODO
export const denyReservation = (reservObj) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		const userId = getState().auth.userId;
		const restaurant = getState().restaurants.restaurantsState.find(
			(restaurant) => restaurant.ownerId === userId
		);
		try {
			console.log("DENY_RESERVATION Request.");
			console.log("-------------------------");

			const responseDel = await fetch(
				`https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/reservations/${userId}/${restaurant.name}/pending/${reservObj.customerId}.json?auth=${token}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const resDataDel = await responseDel.json();

			dispatch({
				type: DENY_RESERVATION,
				customerIdAction: reservObj.customerId,
			});
		} catch (err) {
			throw err;
		}
	};
};
