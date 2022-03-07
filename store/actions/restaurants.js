export const CREATE_RESTAURANT = "CREATE_RESTAURANTS";
export const DELETE_RESTAURANT = "DELETE_RESTAURANTS";
export const FETCH_RESTAURANTS = "FETCH_RESTAURANTS";

export const createRestaurant = (
	name,
	imageUrl,
	description,
	stars,
	phoneNumber,
	address,
	city,
	latitude,
	longitude,
	openingTime,
	closingTime
) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		const userId = getState().auth.userId;
		const response = await fetch(
			`https://prog-mobile-6de61-default-rtdb.europe-west1.firebasedatabase.app/restaurants/${name}.json?auth=${token}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					ownerId: userId,
					imageUrl,
					description,
					stars,
					phoneNumber,
					address,
					city,
					latitude,
					longitude,
					openingTime,
					closingTime,
					menu: [],
					prenotations: [],
					takeaways: [],
				}),
			}
		);

		const resData = await response.json();

		dispatch({
			type: CREATE_RESTAURANT,
			restaurantData: resData,
		});
	};
};
