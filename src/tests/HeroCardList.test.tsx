import { findByTestId, fireEvent } from "@testing-library/react";
import React from "react";

import { render, unmountComponentAtNode } from "react-dom";
import { createRoot, Root } from 'react-dom/client';
import { act } from "react-dom/test-utils";
import MainPage from "../components/MainPage/MainPage";
import { mockFetch, mockedDeckListResponse, mockedDeckListData } from './testUtils';

let container: HTMLDivElement | null = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    (jest.spyOn(window, "fetch") as jest.MockInstance<any, any>).mockImplementation(mockFetch);
});

afterEach(() => {
    if (container) {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    }
});

it("fetches data when click 'Search'", async () => {
    act(() => {
        render(<MainPage />, container);
    });
  
    // get a hold of the button element, and trigger some clicks on it
    const searchButton = document.querySelector("[data-testid=search-button]");
    expect(searchButton?.innerHTML).toBe("Search");

    const inputField = document.querySelector("[data-testid=deck-input]");
    expect(inputField).toBeTruthy();

    await act(async () => {
        fireEvent.change(inputField as Element, {target: {value: 1}});
        searchButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    Object.keys(mockedDeckListData.heroes).forEach((heroId) => {
        const heroCard = document.querySelector(`[data-testid=heroId-${heroId}]`);
        expect(heroCard).toBeTruthy();
    })
  });