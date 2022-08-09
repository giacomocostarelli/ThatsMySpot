import Restaurant from "../../models/restaurant";

export const FETCH_RESTAURANTS = "FETCH_RESTAURANTS";
export const GET_CURRENT_RESTAURANT = "GET_CURRENT_RESTAURANT";
export const CREATE_RESTAURANT = "CREATE_RESTAURANT";
export const GET_REST_BY_NAME = "GET_REST_BY_NAME";
export const UPDATE_RESTAURANT = "UPDATE_RESTAURANT";

export const fetchRestaurants = () => {
	return async (dispatch) => {
		console.log("-------------------------");
		console.log("FETCH_RESTAURANTS Request.");
		try {
			const response = await fetch(
				"https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/restaurants.json"
			);
			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			const resData = await response.json();
			console.log("FETCH_RESTAURANTS Response.");
			console.log("-------------------------");

			const loadedRestaurants = [];
			for (let restaurantName in resData) {
				loadedRestaurants.push(
					new Restaurant(
						restaurantName,
						resData[restaurantName].ownerId,
						resData[restaurantName].imageUrl,
						resData[restaurantName].description,
						resData[restaurantName].category,
						resData[restaurantName].stars,
						resData[restaurantName].phoneNumber,
						resData[restaurantName].address,
						resData[restaurantName].city,
						resData[restaurantName].latitude,
						resData[restaurantName].longitude,
						resData[restaurantName].openingTime,
						resData[restaurantName].closingTime,
						null, //resData[restaurantName].menu,
						null, //resData[restaurantName].prenotations,
						null //resData[restaurantName].takeaways
					)
				);
			}
			dispatch({
				type: FETCH_RESTAURANTS,
				restaurantsData: loadedRestaurants,
			});
		} catch (err) {
			throw err;
		}
	};
};

export const getRestByName = (name) => {
	return async (dispatch) => {
		console.log("-------------------------");
		console.log("GET_REST_BY_NAME Request.");
		try {
			const response = await fetch(
				"https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/restaurants.json"
			);
			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			const resData = await response.json();
			console.log("GET_REST_BY_NAME Response.");
			console.log("-------------------------");

			for (let restaurantName in resData) {
				loadedRestaurants.push(
					new Restaurant(
						restaurantName,
						resData[restaurantName].ownerId,
						resData[restaurantName].imageUrl,
						resData[restaurantName].description,
						resData[restaurantName].category,
						resData[restaurantName].stars,
						resData[restaurantName].phoneNumber,
						resData[restaurantName].address,
						resData[restaurantName].city,
						resData[restaurantName].latitude,
						resData[restaurantName].longitude,
						resData[restaurantName].openingTime,
						resData[restaurantName].closingTime,
						null, //resData[restaurantName].menu,
						null, //resData[restaurantName].prenotations,
						null //resData[restaurantName].takeaways
					)
				);
			}
			dispatch({
				type: GET_REST_BY_NAME,
				restaurantsData: loadedRestaurants,
			});
		} catch (err) {
			throw err;
		}
	};
};

export const getCurrentRestaurant = (name) => {
	return async (dispatch) => {
		dispatch({
			type: GET_CURRENT_RESTAURANT,
			currentRestName: name,
		});
	};
};

// Restaurant is the object from the model.
export const createRestaurant = (restaurantName) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		const ownerId = getState().auth.userId;

		let restaurantToAdd = {
			name: restaurantName,
			ownerId: ownerId,
			imageUrl: "empty",
			description: "empty",
			category: "empty",
			stars: "empty",
			phoneNumber: "empty",
			address: "empty",
			city: "empty",
			latitude: "empty",
			longitude: "empty",
			openingTime: "empty",
			closingTime: "empty",
			menu: "empty",
			prenotations: "empty",
			takeaway: "empty",
		};

		try {
			console.log("CREATE_RESTAURANT Request.");
			const response = await fetch(
				`https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/restaurants/${restaurantName}.json?auth=${token}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(restaurantToAdd),
				}
			);

			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			console.log("CREATE_RESTAURANT Response.");
			console.log("-------------------------");

			const resData = await response.json();

			dispatch({
				type: CREATE_RESTAURANT,
				restaurantData: restaurantToAdd,
			});
		} catch (err) {
			throw err;
		}
	};
};

export const updateRestaurant = (restaurantProps) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;

		try {
			console.log("UPDATE_RESTAURANT Request.");
			const response = await fetch(
				`https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/restaurants/${restaurantProps.name}.json?auth=${token}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(restaurantProps),
				}
			);

			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			console.log("UPDATE_RESTAURANT Response.");
			console.log("-------------------------");

			const resData = await response.json();

			dispatch({
				type: UPDATE_RESTAURANT,
				restaurantData: restaurantProps,
			});
		} catch (err) {
			throw err;
		}
	};
};
