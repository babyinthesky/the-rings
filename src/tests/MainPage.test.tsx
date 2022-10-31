import { fireEvent } from "@testing-library/react";
import ReactDOM from 'react-dom/client';
import { act } from "react-dom/test-utils";
import MainPage from "../components/MainPage/MainPage";
import { mockFetch, mockedDeckListData, mockErrorFetch } from './mock';
import { createRootElement, unmountRoot } from "./testUtils";
import { EMPTY_DATA_DEFAULT_TEXT, ERROR_DEFAULT_TEXT } from '../config';

let root: ReactDOM.Root;
let rootDiv: HTMLElement;

describe('expected data render', () => {
    beforeEach(() => {
        ({rootDiv, root} = createRootElement());
        (jest.spyOn(window, "fetch") as jest.MockInstance<any, any>).mockImplementation(mockFetch);
    });

    afterEach(() => {
        unmountRoot(root);
    });

    it("fetches data when click 'Search'", async () => {
        await act(async () => {
            root.render(<MainPage />);
        });
    
        const searchButton = rootDiv.querySelector("[data-testid=search-button]");
        expect(searchButton?.innerHTML).toBe("Search");

        const inputField = rootDiv.querySelector("[data-testid=deck-input]");
        expect(inputField).toBeTruthy();

        await act(async () => {
            fireEvent.change(inputField as Element, {target: {value: 1}});
            searchButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        const heroList = rootDiv.querySelector(`[data-testid=hero-list]`);

        Object.keys(mockedDeckListData.heroes).forEach((heroId) => {
            const heroCard = heroList?.querySelector(`[data-testid=hero-card-${heroId}]`);
            expect(heroCard).toBeTruthy();
        })
    });

    it("shows empty data text when data is empty", async () => {
        await act(async () => {
            root.render(<MainPage />);
        });
    
        const heroList = rootDiv.querySelector(`[data-testid=hero-list]`);
        expect(heroList?.textContent).toContain(EMPTY_DATA_DEFAULT_TEXT);
    });

    it("opens modal when press hero card", async () => {
        await act(async () => {
            root.render(<MainPage />);
        });
    
        const searchButton = rootDiv.querySelector("[data-testid=search-button]");

        const inputField = rootDiv.querySelector("[data-testid=deck-input]");

        await act(async () => {
            fireEvent.change(inputField as Element, {target: {value: 1}});
            searchButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });


        const heroCard = rootDiv.querySelector(`[data-testid=hero-card-${Object.keys(mockedDeckListData.heroes)[0]}]`);
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
        ({rootDiv, root} = createRootElement());
        (jest.spyOn(window, "fetch") as jest.MockInstance<any, any>).mockImplementation(mockErrorFetch);
    });

    afterEach(() => {
        unmountRoot(root);
    });

    it("shows error message", async () => {
        await act(async () => {
            root.render(<MainPage />);
        });

        const searchButton = rootDiv.querySelector("[data-testid=search-button]");
        expect(searchButton?.innerHTML).toBe("Search");

        const inputField = rootDiv.querySelector("[data-testid=deck-input]");
        expect(inputField).toBeTruthy();

        await act(async () => {
            fireEvent.change(inputField as Element, {target: {value: 0}});
            searchButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        const heroList = rootDiv.querySelector(`[data-testid=hero-list]`);
        expect(heroList?.textContent).toContain(ERROR_DEFAULT_TEXT);
    });
});
