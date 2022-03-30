import User from "../../models/user";

export const GET_STARRED = "GET_STARRED";
export const ADD_TO_FAV = "ADD_TO_FAV";
export const REMOVE_FROM_FAV = "REMOVE_FROM_FAV";

export const getStarred = () => {
	return async (dispatch, getState) => {
		const userId = getState().auth.userId;
		console.log(" -- getStarred REQUEST -- ");
		try {
			const response = await fetch(
				`https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/starred.json`
			);
			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			const resData = await response.json();
			console.log(" -- getStarred RESPONSE -- ");
			//console.log(resData);
			console.log(" -- Dispatching getStarred -- ");
			dispatch({
				type: GET_STARRED,
				userStarredAct: resData,
			});
		} catch (err) {
			throw err;
		}
	};
};

export const addToFav = () => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		const userId = getState().auth.userId;
		console.log("user Id: " + userId);

		const response = await fetch(
			`https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/starred.json?auth=${token}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					restaurant,
				}),
			}
		);

		console.log("CREATE_RESTAURANT Request.");
		const resData = await response.json();
		console.log("CREATE_RESTAURANT Response.");

		dispatch({
			type: CREATE_RESTAURANT,
			restaurantData: resData,
		});
	};
};

export const removeFromFav = (name) => {
	return async (dispatch, getState) => {
		const userId = getState().auth.userId;
		const token = getState().auth.token;
		console.log(" -- removeFromFav REQUEST -- ");
		try {
			const response = await fetch(
				`https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/starred/${name}.json?auth=${token}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (!response.ok) {
				throw new Error("Something went wrong!");
			}
			console.log(response);

			dispatch({
				type: REMOVE_FROM_FAV,
				toRemove: name,
			});
		} catch (err) {
			throw err;
		}
	};
};
