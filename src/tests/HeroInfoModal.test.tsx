import { screen, render, cleanup } from '@testing-library/react';
import HeroInfoModal from '../components/Modal/HeroInfoModal';
import { mockFetch, mockedCardData } from './mock';

describe('expected data render', () => {
    beforeEach(() => {
        (jest.spyOn(window, 'fetch') as jest.MockInstance<any, any>).mockImplementation(mockFetch);
    });

    afterEach(() => {
        cleanup();
    });

    it('renders hero data in modal', async () => {
        const heroId = '144003';

        render(
            <HeroInfoModal
                hero={mockedCardData}
                modalIsOpen={true}
                closeModal={() => jest.fn()}
            />
        );
        const modal = await screen.findByTestId(`modal-${heroId}`);
        expect(modal).toBeInTheDocument();

        const heroCardImage = await screen.findByTestId(`img-${heroId}`);
        expect(heroCardImage).toBeInTheDocument();

        const heroName = await screen.findByTestId('modal-hero-name');
        expect(heroName).toBeInTheDocument();

        const heroInfoElements = await screen.findAllByTestId('modal-hero-info');
        expect(heroInfoElements).toHaveLength(16);
    });
});
