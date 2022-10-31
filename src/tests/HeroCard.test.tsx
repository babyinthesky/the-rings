import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import HeroCard from "../components/HeroCard/HeroCard";
import { mockFetch, mockedCardData, mockErrorFetch } from './testUtils';
import { DOMAIN_URL, ERROR_DEFAULT_TEXT } from '../config';

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

    it('renders hero card and image with the correct data', async () => {
        const heroId = '144003';
        await act(async () => {
            render(
                <HeroCard
                    heroId={heroId}
                    setChoosenHero={() => jest.fn}
                />,
                container,
            );
        });

        const heroCard = container?.querySelector(`[data-testid=hero-card-${heroId}]`);
        expect(heroCard).toBeTruthy();

        const heroCardImage = container?.querySelector(`[data-testid=img-${heroId}]`);
        expect(heroCardImage).toBeTruthy();
        expect(heroCardImage).toHaveProperty('src', `${DOMAIN_URL}${mockedCardData.imagesrc}`);
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

    it('renders hero card and image with the correct data', async () => {
        const heroId = '144003';
        await act(async () => {
            render(
                <HeroCard
                    heroId={heroId}
                    setChoosenHero={() => jest.fn}
                />,
                container,
            );
        });

        expect(container?.textContent).toContain(ERROR_DEFAULT_TEXT);
    });
});