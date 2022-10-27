import { useEffect, useState } from "react";
import { DOMAIN_URL } from "../config";
import { Hero } from "../types";
import HeroCardImage from "./HeroCardImage";

const HeroCard = ({
    heroId,
    setChoosenHero,
} : {
    heroId: string;
    setChoosenHero: (hero: Hero) => void;
}) => {
    const [heroInfo, setHeroInfo] = useState<Hero>();

    useEffect(() => {
        if (heroId) {
            fetch(`${DOMAIN_URL}/api/public/card/${heroId}.json`).then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error('HTTP ' + res.status);
            }).then((data) => {
                setHeroInfo(data);
            })
        }
    }, [heroId, setHeroInfo]);

    return (
        <div
            onClick={() => {
                if (heroInfo) {
                    setChoosenHero(heroInfo);
                }
            }}
        >
            {heroInfo?.imagesrc && (
                <div>
                    <HeroCardImage
                        imgUrl={`${DOMAIN_URL}${heroInfo?.imagesrc}`}
                        imgAlt={heroInfo.name as string}
                    />
                </div>
            )}
        </div>
    )
}

export default HeroCard;
