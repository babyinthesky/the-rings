import HeroCard from './HeroCard';
import { HeroCardListType, Hero } from '../types';

const HeroList = ({
    idList,
    setChoosenHero,
} : {
    idList: HeroCardListType;
    setChoosenHero: (hero: Hero) => void;
}) => {
    return (
        <div>
            {/* {Object.keys(idList).length > 0 && (
                <h3>Here are your heroes:</h3>
            )} */}
            <div className="row heroListContainer marginTop">
                {Object.keys(idList)?.map((heroId) => (
                    <HeroCard
                        key={heroId}
                        heroId={heroId}
                        setChoosenHero={setChoosenHero}
                    />
                ))}
            </div>
        </div>
    )
}

export default HeroList;
