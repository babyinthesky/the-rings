import React, { useState, useCallback } from 'react';
import PageFrame from '../PageFrame';
import DeckInput from './DeckInput';
import HeroList from './HeroList';
import HeroInfoModalNew from '../Modal/HeroInfoModal';
import { DOMAIN_URL } from '../../config';
import { HeroCardListType, Hero } from '../../types';

const MainPage = () => {
    const [deckListIdValue, setDeckListIdValue] = useState('');
    const [heroIdListObj, setHeroIdListObj] = useState<HeroCardListType>({});
    const [choosenHero, setChoosenHero] = useState<Hero>();
    const [errorText, setErrorText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchDeckList = useCallback(() => {
        setIsLoading(true);
        fetch(`${DOMAIN_URL}/api/public/decklist/${deckListIdValue}.json`).then((res) => {
            setIsLoading(false);
            if (res.ok) {
                setErrorText('');
                return res.json();
            }
            throw new Error(`HTTP ${res.status}`);
        }).then((data) => {
            setHeroIdListObj(data.heroes || {});
        }).catch((error) => {
            setIsLoading(false);
            setErrorText(error.message);
        });
    }, [deckListIdValue]);

    const handleCloseModal = useCallback(() => setChoosenHero(undefined), [setChoosenHero]);
    return (
        <PageFrame>
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
                    error={errorText}
                    loading={isLoading}
                />
                <HeroInfoModalNew
                    hero={choosenHero}
                    modalIsOpen={!!choosenHero}
                    closeModal={handleCloseModal}
                />
            </>
        </PageFrame>
    );
};

export default MainPage;
