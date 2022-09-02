import React from "react";
import renderer, { act } from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react-native";

import { LOGIN, SIGNUP, LOGOUT } from "../store/actions/auth";
import reducer from "../store/reducers/auth";

let expectation;

beforeEach(() => {
	expectation = { type: "LOGIN", token: "token", userId: "userId" };
	initialState = { token: null, userId: null, isMerchant: null };
});

describe("auth logic tests", () => {
	it("should return an empty list as initial state", () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	it("should create an action with type LOGIN", () => {
		let loginFn = jest.fn();
		loginFn.mockReturnValue(expectation);
		expect(loginFn()).toEqual(expectation);
	});

	it("should handle login action", () => {
		expect(
			reducer(undefined, {
				type: "LOGIN",
				token: "token",
				userId: "userId",
			})
		).toEqual({ token: expectation.token, userId: expectation.userId });
	});

	it("should handle signup action", () => {
		let signupExp = { ...expectation, isMerchant: "merchant" };
		delete signupExp.type;
		expect(
			reducer(undefined, {
				type: "SIGNUP",
				token: "token",
				userId: "userId",
				isMerchant: "merchant",
			})
		).toEqual(signupExp);
	});

	it("should handle logout action", () => {
		let fullInitialState = { ...expectation, isMerchant: "merchant" };
		expect(
			reducer(fullInitialState, {
				type: "LOGOUT",
			})
		).toStrictEqual(initialState);
	});
});
