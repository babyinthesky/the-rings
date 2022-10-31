import { useEffect, useState, memo } from "react";
import { DOMAIN_URL } from "../../config";
import { Hero } from "../../types";
import HeroCardImage from "./HeroCardImage";
import { ERROR_DEFAULT_TEXT } from '../../config';

const HeroCard = memo(({
    heroId,
    setChoosenHero,
} : {
    heroId: string;
    setChoosenHero: (hero: Hero) => void;
}) => {
    const [heroInfo, setHeroInfo] = useState<Hero>();
    const [errorText, setErrorText] = useState('');

    const handleCardOnClick = () => {
        if (heroInfo) {
            setChoosenHero(heroInfo);
        }
    }

    useEffect(() => {
        if (heroId) {
            fetch(`${DOMAIN_URL}/api/public/card/${heroId}.json`).then((res) => {
                if (res.ok) {
                    setErrorText('');
                    return res.json();
                }
                throw new Error('HTTP ' + res.status);
            }).then((data) => {
                setHeroInfo(data);
            }).catch((error) => {
                setErrorText(error.message);
            })
        }
    }, [heroId, setHeroInfo]);

    return (
        <div
            className="cursor-pointer hero-card-container"
            onClick={handleCardOnClick}
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
    )
});

export default HeroCard;
