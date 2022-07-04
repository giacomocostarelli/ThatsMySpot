import AsyncStorage from "@react-native-async-storage/async-storage";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const GET_USER = "GET_USER";

export const signup = (email, password, merchant) => {
	return async (dispatch) => {
		const response = await fetch(
			"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC5lL_FB1PNybXJ94YF85QcVgAsLNzYXFw",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true,
				}),
			}
		);

		if (!response.ok) {
			const errorResData = await response.json();
			const errorId = errorResData.error.message;
			let message = "Something went wrong!";
			if (errorId === "EMAIL_EXISTS") {
				message = "This email exists already!";
			}
			throw new Error(message);
		}

		const resData = await response.json();
		console.log("SIGNUP Request.");
		console.log("Email : " + resData.email);
		console.log("UserId : " + resData.localId);
		console.log("-------------------------");
		dispatch({
			type: SIGNUP,
			token: resData.idToken,
			userId: resData.localId,
			isMerchant: merchant,
		});
	};
};

export const login = (email, password) => {
	return async (dispatch) => {
		const response = await fetch(
			"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC5lL_FB1PNybXJ94YF85QcVgAsLNzYXFw",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true,
				}),
			}
		);

		if (!response.ok) {
			const errorResData = await response.json();
			const errorId = errorResData.error.message;
			let message = "Something went wrong!";
			if (errorId === "EMAIL_NOT_FOUND") {
				message = "This email could not be found!";
			} else if (errorId === "INVALID_PASSWORD") {
				message = "This password is not valid!";
			}

			throw new Error(message);
		}

		const resData = await response.json();
		console.log("LOGIN Request.");
		console.log("Email : " + resData.email);
		console.log("UserId : " + resData.localId);
		console.log("-------------------------");
		dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
	};
};

export const getUser = () => {
	return async (dispatch, getState) => {
		const userId = getState().auth.userId;

		try {
			const response = await fetch(
				`https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/role.json`
			);
			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			const resData = await response.json();
			console.log("GET_USER Request.");
			console.log("Role : " + resData);

			//Async save role
			storeData(resData);

			dispatch({
				type: GET_USER,
				role: resData,
			});
		} catch (err) {
			throw err;
		}
	};
};

const storeData = async (value) => {
	try {
		await AsyncStorage.setItem("@role", value);
	} catch (e) {
		console.log(e);
	}
};

//create an action to delete the token and userId from the store
export const logout = () => {
	async () => {
		try {
			await AsyncStorage.clear();
		} catch (e) {
			console.log("Clear dell' AsyncStorage fallito.");
		}
	};
	return { type: LOGOUT };
};
