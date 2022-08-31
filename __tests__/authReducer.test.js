describe("authentiacation logic", () => {
	it("login", () => {
		let login = jest.fn();

		login();
		expect(login).toHaveBeenCalled();
	});
});
