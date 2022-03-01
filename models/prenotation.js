class Prenotation {
	constructor(prenotationId, userId, restaurantId, date, time, chairs) {
		this.prenotationId = prenotationId;
		this.userId = userId;
		this.restaurantId = restaurantId;
		this.date = date;
		this.time = time;
		this.chairs = chairs;
	}
}

export default Prenotation;
