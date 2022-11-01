import { screen, render, cleanup, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MainPage from '../components/MainPage/MainPage';
import { mockFetch, mockedDeckListData, mockErrorFetch } from './mock';
import { EMPTY_DATA_DEFAULT_TEXT, ERROR_DEFAULT_TEXT } from '../config';

describe('expected data render', () => {
    beforeEach(() => {
        (jest.spyOn(window, 'fetch') as jest.MockInstance<any, any>).mockImplementation(mockFetch);
    });

    afterEach(() => {
        cleanup();
    });

    it('fetches data when click Search', async () => {
        render(<MainPage />);

        const searchButton = await screen.findByTestId('search-button');
        expect(searchButton).toBeInTheDocument();

        const inputField = await screen.findByTestId('deck-input');
        expect(inputField).toBeInTheDocument();

        fireEvent.change(inputField as Element, {target: {value: 1}});
        await userEvent.click(searchButton);

        const { findByTestId } = within(screen.getByTestId('hero-list'));

        Object.keys(mockedDeckListData.heroes).forEach(async (heroId) => {
            const heroCard = await findByTestId(`hero-card-${heroId}`);
            expect(heroCard).toBeInTheDocument();
        })
    });

    it('shows empty data text when data is empty', async () => {
        render(<MainPage />);
    
        const { findByText } = within(await screen.findByTestId('hero-list'));
        const errorTextElement = await findByText(EMPTY_DATA_DEFAULT_TEXT);
        expect(errorTextElement).toBeInTheDocument();
    });

    it('opens modal when press hero card', async () => {
        render(<MainPage />);
    
        const searchButton = await screen.findByTestId('search-button');

        const inputField = await screen.findByTestId('deck-input');

        fireEvent.change(inputField as Element, {target: {value: 1}});
        await userEvent.click(searchButton);

        const heroCard = await screen.findByTestId(`hero-card-${Object.keys(mockedDeckListData.heroes)[0]}`);
        expect(heroCard).toBeInTheDocument();

        const modalTestId = `modal-${Object.keys(mockedDeckListData.heroes)[0]}`
        expect(screen.queryByTestId(modalTestId)).not.toBeInTheDocument();

        await userEvent.click(heroCard);

        const heroInfoModal = await screen.findByTestId(modalTestId);
        expect(heroInfoModal).toBeInTheDocument();
    });
});

describe('error handling', () => {
    beforeEach(() => {
        (jest.spyOn(window, 'fetch') as jest.MockInstance<any, any>).mockImplementation(mockErrorFetch);
    });

    afterEach(() => {
        cleanup();
    });

    it('shows error message', async () => {
        render(<MainPage />);

        const searchButton = await screen.findByTestId('search-button');
        expect(searchButton).toBeInTheDocument();

        const inputField = await screen.findByTestId('deck-input');
        expect(inputField).toBeInTheDocument();

        fireEvent.change(inputField as Element, {target: {value: 0}});
        await userEvent.click(searchButton);

        const { findByText } = within(await screen.findByTestId('hero-list'));
        const errorTextElement = await findByText(ERROR_DEFAULT_TEXT);
        expect(errorTextElement).toBeInTheDocument();
    });
});
