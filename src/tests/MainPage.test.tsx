import { fireEvent } from "@testing-library/react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import MainPage from "../components/MainPage/MainPage";
import { mockFetch, mockedDeckListData, mockErrorFetch } from './testUtils';
import { EMPTY_DATA_DEFAULT_TEXT, ERROR_DEFAULT_TEXT } from '../config';

let container: HTMLDivElement | null = null;

describe('expected data render', () => {
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
        await act(async () => {
            render(<MainPage />, container);
        });
    
        const searchButton = container?.querySelector("[data-testid=search-button]");
        expect(searchButton?.innerHTML).toBe("Search");

        const inputField = container?.querySelector("[data-testid=deck-input]");
        expect(inputField).toBeTruthy();

        await act(async () => {
            fireEvent.change(inputField as Element, {target: {value: 1}});
            searchButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        Object.keys(mockedDeckListData.heroes).forEach((heroId) => {
            const heroCard = container?.querySelector(`[data-testid=hero-card-${heroId}]`);
            expect(heroCard).toBeTruthy();
        })
    });

    it("shows empty data text when data is empty", async () => {
        await act(async () => {
            render(<MainPage />, container);
        });
    
        expect(container?.textContent).toContain(EMPTY_DATA_DEFAULT_TEXT);
    });

    it("opens modal when press hero card", async () => {
        await act(async () => {
            render(<MainPage />, container);
        });
    
        const searchButton = container?.querySelector("[data-testid=search-button]");

        const inputField = container?.querySelector("[data-testid=deck-input]");

        await act(async () => {
            fireEvent.change(inputField as Element, {target: {value: 1}});
            searchButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });


        const heroCard = container?.querySelector(`[data-testid=hero-card-${Object.keys(mockedDeckListData.heroes)[0]}]`);
        expect(heroCard).toBeTruthy();
        
        await act(async () => {
            heroCard?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        const heroInfoModal = document.querySelector(`[data-testid=modal-${Object.keys(mockedDeckListData.heroes)[0]}]`);
        expect(heroInfoModal).toBeTruthy();
    });
});

describe('error handling', () => {
    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        (jest.spyOn(window, "fetch") as jest.MockInstance<any, any>).mockImplementation(mockErrorFetch);
    });

    afterEach(() => {
        if (container) {
            unmountComponentAtNode(container);
            container.remove();
            container = null;
        }
    });

    it("shows error message", async () => {
        await act(async () => {
            render(<MainPage />, container);
        });

        const searchButton = container?.querySelector("[data-testid=search-button]");
        expect(searchButton?.innerHTML).toBe("Search");

        const inputField = container?.querySelector("[data-testid=deck-input]");
        expect(inputField).toBeTruthy();

        await act(async () => {
            fireEvent.change(inputField as Element, {target: {value: 0}});
            searchButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
    
        expect(container?.textContent).toContain(ERROR_DEFAULT_TEXT);
    });
});
