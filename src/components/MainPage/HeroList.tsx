import HeroCard from '../HeroCard/HeroCard';
import LoadingSpinner from '../LoadingSpinner';
import { HeroCardListType, Hero } from '../../types';
import { ERROR_DEFAULT_TEXT, EMPTY_DATA_DEFAULT_TEXT } from '../../config';

const HeroList = ({
    idList,
    error,
    loading,
    setChoosenHero,
} : {
    idList: HeroCardListType;
    error: string;
    loading: boolean;
    setChoosenHero: (hero: Hero) => void;
}) => (
    <div>
        {/* {Object.keys(idList).length > 0 && (
            <h3>Here are your heroes:</h3>
        )} */}
        <div className="row hero-list-container margin-top-3 center">
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    {error ? (
                        <p>{ERROR_DEFAULT_TEXT}</p>
                    ) : (
                        <>
                            {(Object.keys(idList)?.length === 0) ? (
                                <p>{EMPTY_DATA_DEFAULT_TEXT}</p>
                            ) : (
                                <>
                                    {Object.keys(idList)?.map((heroId) => (
                                        <HeroCard
                                            key={heroId}
                                            heroId={heroId}
                                            setChoosenHero={setChoosenHero}
                                        />
                                    ))}
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    </div>
);

export default HeroList;
