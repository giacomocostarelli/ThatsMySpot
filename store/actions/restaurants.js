export const CREATE_RESTAURANT = "CREATE_RESTAURANTS";
export const DELETE_RESTAURANT = "DELETE_RESTAURANTS";
export const FETCH_RESTAURANTS = "FETCH_RESTAURANTS";

export const fetchRestaurants = () => {
	return async (dispatch) => {
		console.log("fetchRestaurants REQUEST");
		try {
			const response = await fetch(
				"https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/restaurants.json"
			);

			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			const resData = await response.json();
			console.log("fetchRestaurants RESPONSE");
			console.log(resData);

			const loadedRestaurants = [];
			for (const name in resData) {
				loadedRestaurants.push(name);
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

export const createRestaurant = (restaurant) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		const userId = getState().auth.userId;
		console.log("user Id: " + userId);
		restaurant.ownerId = userId;

		const response = await fetch(
			`https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/restaurants/${restaurant.name}.json?auth=${token}`,
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
