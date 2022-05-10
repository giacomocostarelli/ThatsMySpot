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

export const addToFav = (name) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		const userId = getState().auth.userId;
		const toAdd = name[0];

		/* 
            "Fast Food 1": Object {
                "starts": "F",
            },
         */

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

		console.log("ADD_TO_FAV Request.");
		console.log("ADD_TO_FAV Response.");

		dispatch({
			type: ADD_TO_FAV,
			toAddAction: toAdd,
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
