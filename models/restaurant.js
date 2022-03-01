class Restaurant {
	constructor(
		id,
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
		closingTime,
		menu,
		prenotations,
		takeaways
	) {
		this.id = id;
		this.name = name;
		this.imageUrl = imageUrl;
		this.description = description;
		this.stars = stars;
		this.address = address;
		this.city = city;
		this.phoneNumber = phoneNumber;
		this.latitude = latitude;
		this.longitude = longitude;
		this.openingTime = openingTime;
		this.closingTime = closingTime;
		this.menu = menu;
		this.prenotations = prenotations;
		this.takeaways = takeaways;
	}
}

export default Restaurant;
