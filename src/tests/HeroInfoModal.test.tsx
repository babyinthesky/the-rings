import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import HeroInfoModal from '../components/Modal/HeroInfoModal';
import { mockFetch, mockedCardData } from './mock';
import { createRootElement, unmountRoot } from './testUtils';

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

    it('renders hero data in modal', async () => {
        const heroId = '144003';
        await act(async () => {
            root.render(
                <HeroInfoModal
                    hero={mockedCardData}
                    modalIsOpen={true}
                    closeModal={() => jest.fn()}
                />
            );
        });

        const modal = document.querySelector(`[data-testid=modal-${heroId}]`);
        expect(modal).toBeTruthy();

        const heroCardImage = modal?.querySelector(`[data-testid=img-${heroId}]`);
        expect(heroCardImage).toBeTruthy();

        expect(modal?.querySelector('h2')?.innerHTML).toBe(mockedCardData.name);

        expect(modal?.getElementsByTagName('span')).toHaveLength(14);
    });
});
