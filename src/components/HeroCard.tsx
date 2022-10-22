import { useEffect, useState } from "react";
import { DOMAIN_URL } from "../config";
import { Hero } from "../types";
import HeroCardImage from "./HeroCardImage";


/*{
    "pack_code": "Core",
    "pack_name": "Core Set",
    "type_code": "hero",
    "type_name": "Hero",
    "sphere_code": "leadership",
    "sphere_name": "Leadership",
    "position": 2,
    "code": "01002",
    "name": "Théodred",
    "traits": "Noble. Rohan. Warrior.",
    "text": "<b>Response:</b> After Théodred commits to a quest, choose a hero committed to that quest. Add 1 resource to that hero's resource pool.",
    "flavor": "\"Not all is dark. Take courage, Lord of the Mark...\"\n<cite>Gandalf, The Two Towers</cite>",
    "is_unique": true,
    "threat": 8,
    "willpower": 1,
    "attack": 2,
    "defense": 1,
    "health": 4,
    "quantity": 1,
    "deck_limit": 1,
    "illustrator": "Jeff Himmelman",
    "octgnid": "51223bd0-ffd1-11df-a976-0801200c9002",
    "has_errata": false,
    "url": "https://ringsdb.com/card/01002",
    "imagesrc": "/bundles/cards/01002.png"
  }*/

const HeroCard = ({
    heroId,
    setChoosenHero,
    // heroAmount,
} : {
    heroId: string;
    // heroAmount: number;
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

    // Insert skeleton
    return (
        <div
            onClick={() => {
                if (heroInfo) {
                    setChoosenHero(heroInfo);
                }
            }}
        >
            {heroInfo?.imagesrc ? (
                <div>
                    <HeroCardImage
                        imgUrl={`${DOMAIN_URL}${heroInfo?.imagesrc}`}
                        imgAlt={heroInfo.name as string}
                    />
                    {/* <span>
                        {heroAmount}
                    </span> */}
                </div>
            ) : (
                <div
                    className="heroCardImage"
                />
            )}
        </div>
    )
}

export default HeroCard;
