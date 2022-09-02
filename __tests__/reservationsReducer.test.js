import React from "react";
import renderer, { act } from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react-native";

import {
	GET_RESERVATIONS,
	DENY_RESERVATION,
	CONFIRM_RESERVATION,
} from "../store/actions/reservations";
import reducer from "../store/reducers/reservations";

let expectation;

beforeEach(() => {
	expectation_1st = {
		customerId: "user",
		date: "20/20/20",
		time: "18:00",
		number: 4,
	};
	expectation_2nd = {
		customerId: "user1",
		date: "20/20/21",
		time: "18:50",
		number: 2,
	};
	initialState = {
		pendingReservations: [],
		confirmedReservations: [],
	};
});

describe("reservations logic tests", () => {
	it("should return an empty list as initial state", () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	it("should create an action with type GET_RESERVATIONS", () => {
		let getReservationsFn = jest.fn();
		getReservationsFn.mockReturnValue({
			customerId: "user",
			date: "20/20/20",
			time: "18:00",
			number: 4,
		});
		expect(getReservationsFn()).toEqual(expectation_1st);
	});

	it("should handle denyReservation action", () => {
		expect(
			reducer(
				{
					...initialState,
					pendingReservations: [expectation_1st, expectation_2nd],
					confirmedReservations: [],
				},
				{
					type: DENY_RESERVATION,
					customerIdAction: expectation_2nd.customerId,
				}
			)
		).toEqual({
			...initialState,
			pendingReservations: [expectation_1st],
			confirmedReservations: [],
		});
	});

	it("should handle confirmReservation action", () => {
		expect(
			reducer(
				{
					...initialState,
					pendingReservations: [expectation_1st, expectation_2nd],
					confirmedReservations: [],
				},
				{
					type: CONFIRM_RESERVATION,
					customerIdAction: expectation_2nd.customerId,
				}
			)
		).toEqual({
			...initialState,
			pendingReservations: [expectation_1st],
			confirmedReservations: [expectation_2nd],
		});
	});

	it("should handle getReservations action", () => {
		expect(
			reducer(undefined, {
				type: GET_RESERVATIONS,
				pendingListAction: [
					{
						customerId: "user",
						date: "20/20/20",
						time: "18:00",
						number: 4,
					},
				],
				confirmedListAction: [
					{
						customerId: "user1",
						date: "20/20/21",
						time: "18:50",
						number: 2,
					},
				],
			})
		).toEqual({
			...initialState,
			pendingReservations: [expectation_1st],
			confirmedReservations: [expectation_2nd],
		});
	});
});
