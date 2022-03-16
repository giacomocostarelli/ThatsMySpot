import User from "../../models/user";

export const GET_STARRED = "GET_STARRED";

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
