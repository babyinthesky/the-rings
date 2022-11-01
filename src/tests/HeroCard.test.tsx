import { screen, render, cleanup } from '@testing-library/react';
import HeroCard from '../components/HeroCard/HeroCard';
import { mockFetch, mockedCardData, mockErrorFetch } from './mock';
import { DOMAIN_URL, ERROR_DEFAULT_TEXT } from '../config';

describe('expected data render', () => {
    beforeEach(() => {
        (jest.spyOn(window, 'fetch') as jest.MockInstance<any, any>).mockImplementation(mockFetch);
    });

    afterEach(() => {
        cleanup();
    });

    it('renders hero card and image with the correct data', async () => {
        const heroId = '144003';
        render(
            <HeroCard
                heroId={heroId}
                setChoosenHero={() => jest.fn}
            />
        );

        const heroCard = await screen.findByTestId(`hero-card-${heroId}`);
        expect(heroCard).toBeInTheDocument();

        const heroCardImage = await screen.findByTestId(`img-${heroId}`);
        expect(heroCardImage).toBeInTheDocument();
        expect(heroCardImage).toHaveProperty('src', `${DOMAIN_URL}${mockedCardData.imagesrc}`);
    });
});

describe('error handling', () => {
    beforeEach(() => {
        (jest.spyOn(window, 'fetch') as jest.MockInstance<any, any>).mockImplementation(mockErrorFetch);
    });

    afterEach(() => {
        cleanup();
    });

    it('renders error text', async () => {
        const heroId = '144003';
        render(
            <HeroCard
                heroId={heroId}
                setChoosenHero={() => jest.fn}
            />
        );

        const errorTextElement = await screen.findByText(ERROR_DEFAULT_TEXT);
        expect(errorTextElement).toBeInTheDocument();
    });
 });