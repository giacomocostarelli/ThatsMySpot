import User from "../../models/user";

export const GET_STARRED = "GET_STARRED";
export const ADD_TO_FAV = "ADD_TO_FAV";
export const REMOVE_FROM_FAV = "REMOVE_FROM_FAV";
export const ADD_USER = "ADD_USER";

export const getStarred = () => {
	return async (dispatch, getState) => {
		const userId = getState().auth.userId;
		console.log(" -- GET_STARRED Request -- ");
		try {
			const response = await fetch(
				`https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/starred.json`
			);
			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			const resData = await response.json();
			dispatch({
				type: GET_STARRED,
				userStarredAct: resData,
			});
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

export const addUser = (name) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		const userId = getState().auth.userId;
		const isMerchant = getState().auth.isMerchant;

		var obj = { [userId]: { role: isMerchant } };
		console.log("ADD_USER Request.");

		const response = await fetch(
			`https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth=${token}`,
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
