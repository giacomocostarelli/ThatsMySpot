import User from "../../models/user";

export const GET_STARRED = "GET_STARRED";
export const ADD_TO_FAV = "ADD_TO_FAV";
export const REMOVE_FROM_FAV = "REMOVE_FROM_FAV";
export const ADD_USER = "ADD_USER";
export const IS_USER_NEW = "IS_USER_NEW";
export const OWNER_OF = "OWNER_OF";
export const DELETE_CUSTOMER = "DELETE_CUSTOMER";
export const DELETE_MERCHANT = "DELETE_MERCHANT";
export const GET_EMAIL_BY_UID = "GET_EMAIL_BY_UID";

export const getEmailByUid = (uid) => {
	return async (dispatch, getState) => {
		try {
			const response = await fetch(
				`https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/email.json`
			);
			if (!response.ok) {
				throw new Error("GET_EMAIL_BY_UID Something went wrong!");
			}

			const resData = await response.json();
			console.log("GET_EMAIL_BY_UID Request.");
			console.log("email : " + resData);

			dispatch({
				type: GET_EMAIL_BY_UID,
				email: resData,
			});
		} catch (err) {
			throw err;
		}
	};
};

export const deleteCustomer = () => {
	return async (dispatch, getState) => {
		const userId = getState().auth.userId;
		const token = getState().auth.token;
		console.log(" DELETE_CUSTOMER Request.");
		console.log("-------------------------");

		const response = await fetch(
			`https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json?auth=${token}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const resData = await response.json();
		dispatch({
			type: DELETE_CUSTOMER,
			toRemove: userId,
		});
	};
};

export const deleteMerchant = () => {
	return async (dispatch, getState) => {
		const userId = getState().auth.userId;
		const token = getState().auth.token;
		const restaurantName = getState().restaurants.restaurantsState.find(
			(restaurant) => restaurant.ownerId === userId
		).name;

		console.log(" -- DELETE_MERCHANT Request -- ");
		console.log(restaurantName);

		// DELETION of the merchant profile
		const responseDelUser = await fetch(
			`https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json?auth=${token}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (!responseDelUser.ok) {
			throw new Error("Qualcosa è andato storto (responseDelUser)");
		}
		const resDataU = await responseDelUser.json();

		// DELETION of the merchant's restaurant
		const responseDelRest = await fetch(
			`https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/restaurants/${restaurantName}.json?auth=${token}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (!responseDelRest.ok) {
			throw new Error("Qualcosa è andato storto (responseDelRest)");
		}

		const resDataR = await responseDelRest.json();

		dispatch({
			type: DELETE_MERCHANT,
		});
	};
};

export const getStarred = () => {
	return async (dispatch, getState) => {
		const userId = getState().auth.userId;
		const restList = getState().restaurants.restaurantsState;
		console.log("GET_STARRED Request for user: " + userId);

		try {
			const response = await fetch(
				`https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/starred.json`
			);

			if (!response.ok) {
				throw new Error("Qualcosa è andato storto (GET_STARRED)");
			}

			const resData = await response.json();

			dispatch({
				type: GET_STARRED,
				userStarredAct: resData,
			});

			for (const favoriteRest in resData) {
				if (restList.find((rest) => rest === favoriteRest) === "undefined") {
					console.log("Starred but to be removed : " + favoriteRest);
					dispatch(removeFromFav(favoriteRest));
				}
			}
		} catch (err) {
			throw err;
		}
	};
};

export const addToFav = (name) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		const userId = getState().auth.userId;
		const toAdd = name[0];

		console.log("ADD_TO_FAV Request.");

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

		if (!response.ok) {
			throw new Error("Qualcosa è andato storto (ADD_TO_FAV)");
		}

		const resData = await response.json();
		dispatch({
			type: ADD_TO_FAV,
			toAddAction: name,
		});
	};
};

export const removeFromFav = (name) => {
	return async (dispatch, getState) => {
		const userId = getState().auth.userId;
		const token = getState().auth.token;
		console.log(" -- REMOVE_FROM_FAV Request -- ");

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
	};
};

export const addUser = (emailPar) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		const userId = getState().auth.userId;
		const isMerchant = getState().auth.isMerchant;

		var obj = { role: isMerchant ? "merchant" : "customer", email: emailPar };
		console.log("ADD_USER Request.");

		const response = await fetch(
			`https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json?auth=${token}`,
			{
				method: "PUT ",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(obj),
			}
		);

		dispatch({
			type: ADD_USER,
		});
	};
};

export const ownerOf = (restaurantName) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		const userId = getState().auth.userId;

		var obj = { ownerOf: restaurantName };
		console.log("OWNER_OF Request.");

		const response = await fetch(
			`https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json?auth=${token}`,
			{
				method: "PATCH ",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(obj),
			}
		);

		dispatch({
			type: OWNER_OF,
		});
	};
};

export const isUserNew = (isNew) => {
	return async (dispatch) => {
		dispatch({
			type: IS_USER_NEW,
			isNewAction: isNew,
		});
	};
};
