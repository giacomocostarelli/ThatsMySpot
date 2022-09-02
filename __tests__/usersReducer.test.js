import React from "react";
import renderer, { act } from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react-native";

import { GET_EMAIL_BY_UID, getEmailByUid } from "../store/actions/users";
import reducer from "../store/reducers/users";

let expectation;

beforeEach(() => {
	expectation = { type: "GET_EMAIL_BY_UID", email: "email@email.com" };
	initialState = {
		usersState: [],
		userStarred: [],
		isNewState: null,
		emailToConfirm: null,
	};
});

describe("auth logic tests", () => {
	it("should return an empty list as initial state", () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	it("should create an action with type GET_EMAIL_BY_UID", () => {
		let getEmailByUidFn = jest.fn();
		getEmailByUidFn.mockReturnValue(expectation);
		expect(getEmailByUidFn()).toEqual(expectation);
	});

	it("should handle getEmailByUid action", () => {
		expect(
			reducer(undefined, {
				type: "GET_EMAIL_BY_UID",
				email: expectation.email,
			})
		).toEqual({ ...initialState, emailToConfirm: expectation.email });
	});
});
