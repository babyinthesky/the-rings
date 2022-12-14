import React, {
    useEffect,
    useState,
    memo,
    useCallback,
} from 'react';
import { DOMAIN_URL, ERROR_DEFAULT_TEXT } from '../../config';
import { Hero } from '../../types';
import HeroCardImage from './HeroCardImage';

const HeroCard = memo(({
    heroId,
    setChoosenHero,
} : {
    heroId: string;
    setChoosenHero: (hero: Hero) => void;
}) => {
    const [heroInfo, setHeroInfo] = useState<Hero>();
    const [errorText, setErrorText] = useState('');

    const handleCardOnClick = useCallback(() => {
        if (heroInfo) {
            setChoosenHero(heroInfo);
        }
    }, [heroInfo]);

    const handleCardOnKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            handleCardOnClick();
        }
    }, [heroInfo]);

    useEffect(() => {
        if (heroId) {
            fetch(`${DOMAIN_URL}/api/public/card/${heroId}.json`).then((res) => {
                if (res.ok) {
                    setErrorText('');
                    return res.json();
                }
                throw new Error(`HTTP ${res.status}`);
            }).then((data) => {
                setHeroInfo(data);
            }).catch((error) => {
                setErrorText(error.message);
            });
        }
    }, []);

    return (
        <div
            className="cursor-pointer hero-card-container"
            role="button"
            tabIndex={0}
            onClick={handleCardOnClick}
            onKeyDown={handleCardOnKeyDown}
            data-testid={`hero-card-${heroId}`}
        >
            {errorText ? (
                <p>{ERROR_DEFAULT_TEXT}</p>
            ) : (
                <HeroCardImage
                    heroId={heroId}
                    imgUrl={heroInfo?.imagesrc as string}
                    imgAlt={heroInfo?.name as string}
                />
            )}
        </div>
    );
});

export default HeroCard;
