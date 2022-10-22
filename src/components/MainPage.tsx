import { useState, useCallback } from 'react';
import MainPageFrame from './MainPageFrame';
import DeckInput from './DeckInput';
import HeroList from './HeroList';
import HeroInfoModal from './HeroInfoModal';
import { DOMAIN_URL } from '../config';
import { HeroCardListType, Hero } from '../types';

const MainPage = () => {
    const [deckListIdValue, setDeckListIdValue] = useState('');
    const [heroIdListObj, setHeroIdListObj] = useState<HeroCardListType>({});
    // const [modalIsOpen, setModalIsOpen] = useState(false);
    const [choosenHero, setChoosenHero] = useState<Hero>();

    const fetchDeckList = useCallback(() => {
        fetch(`${DOMAIN_URL}/api/public/decklist/${deckListIdValue}.json`).then((res) => {
            if(res.ok) {
                return res.json();
            }
            throw new Error('HTTP ' + res.status);
        }).then((data) => {
            setHeroIdListObj(data.heroes);
        });
    }, [deckListIdValue]);

    return (
        <MainPageFrame>
            <>
                <h1>The Heroes of The Rings</h1>
                <DeckInput
                    deckListIdValue={deckListIdValue}
                    setDeckListIdValue={setDeckListIdValue}
                    onSearch={fetchDeckList}
                />
                <HeroList
                    idList={heroIdListObj}
                    setChoosenHero={setChoosenHero}
                />
                <HeroInfoModal
                    hero={choosenHero}
                    modalIsOpen={!!choosenHero}
                    closeModal={()=> setChoosenHero(undefined)}
                />
            </>
        </MainPageFrame>
    );
}

export default MainPage;
