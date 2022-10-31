import ReactDOM from 'react-dom/client';
import { act } from "react-dom/test-utils";
import HeroCard from "../components/HeroCard/HeroCard";
import { createRootElement, unmountRoot } from './testUtils';
import { mockFetch, mockedCardData, mockErrorFetch } from './mock';
import { DOMAIN_URL, ERROR_DEFAULT_TEXT } from '../config';

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

    it('renders hero card and image with the correct data', async () => {
        const heroId = '144003';
        await act(async () => {
            root.render(
                <HeroCard
                    heroId={heroId}
                    setChoosenHero={() => jest.fn}
                />
            );
        });

        const heroCard = rootDiv.querySelector(`[data-testid=hero-card-${heroId}]`);
        expect(heroCard).toBeTruthy();

        const heroCardImage = rootDiv.querySelector(`[data-testid=img-${heroId}]`);
        expect(heroCardImage).toBeTruthy();
        expect(heroCardImage).toHaveProperty('src', `${DOMAIN_URL}${mockedCardData.imagesrc}`);
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

    it('renders error text', async () => {
        const heroId = '144003';
        await act(async () => {
            root.render(
                <HeroCard
                    heroId={heroId}
                    setChoosenHero={() => jest.fn}
                />
            );
        });

        expect(rootDiv.textContent).toContain(ERROR_DEFAULT_TEXT);
    });
 });