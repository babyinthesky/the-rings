import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import HeroInfoModal from '../components/Modal/HeroInfoModal';
import { mockFetch, mockedCardData } from './testUtils';


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

    it('renders hero data in modal', async () => {
        const heroId = '144003';
        await act(async () => {
            render(
                <HeroInfoModal
                    hero={mockedCardData}
                    modalIsOpen={true}
                    closeModal={() => jest.fn()}
                />,
                container,
            );
        });

        const heroCard = document?.querySelector(`[data-testid=modal-${heroId}]`);
        expect(heroCard).toBeTruthy();

        const heroCardImage = document?.querySelector(`[data-testid=img-${heroId}]`);
        expect(heroCardImage).toBeTruthy();

        expect(document.querySelector('h2')?.innerHTML).toBe(mockedCardData.name);

        expect(document.getElementsByTagName('span')).toHaveLength(14);
    });
});
