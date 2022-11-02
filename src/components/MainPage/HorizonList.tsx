import React from 'react';
import HeroCard from '../HeroCard/HeroCard';
import CenterBox from '../CenterBox';
import { HeroCardListType, Hero } from '../../types';
import { EMPTY_DATA_DEFAULT_TEXT } from '../../config';

const HorizonList = ({
    data,
    setChoosenHero,
} : {
    data: HeroCardListType;
    setChoosenHero: (hero: Hero) => void;
}) => (
    (Object.keys(data)?.length === 0) ? (
        <CenterBox>
            <p>{EMPTY_DATA_DEFAULT_TEXT}</p>
        </CenterBox>
    ) : (
        <div className="row horizon-list-container">
            {Object.keys(data)?.map((heroId) => (
                <HeroCard
                    key={heroId}
                    heroId={heroId}
                    setChoosenHero={setChoosenHero}
                />
            ))}
        </div>
    )
);

export default HorizonList;
