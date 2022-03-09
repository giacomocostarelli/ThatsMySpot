class Restaurant {
	constructor(
		name,
		ownerId,
		imageUrl,
		description,
		category,
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
		this.name = name;
		this.ownerId = ownerId;
		this.imageUrl = imageUrl;
		this.description = description;
		this.category = category;
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
