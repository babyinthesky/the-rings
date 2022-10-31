import { memo } from 'react';
import HeroCard from '../HeroCard/HeroCard';
import LoadingSpinner from '../LoadingSpinner';
import CenterBox from '../CenterBox';
import { HeroCardListType, Hero } from '../../types';
import { ERROR_DEFAULT_TEXT, EMPTY_DATA_DEFAULT_TEXT } from '../../config';

const areTwoIdListDifferent = (list1: HeroCardListType, list2: HeroCardListType) => {
    if (Object.keys(list1).length !== Object.keys(list2).length) return true;
    return Object.keys(list1).some((key1) => !list2.hasOwnProperty(key1));
}

const HeroList = memo(({
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
    <>
        {/* {Object.keys(idList).length > 0 && (
            <h3>Here are your heroes:</h3>
        )} */}
        <div
            data-testid="hero-list"
            className="row hero-list-container margin-top-3"
        >
            {loading ? (
                <CenterBox>
                    <LoadingSpinner />
                </CenterBox>
            ) : (
                <>
                    {error ? (
                        <CenterBox>
                            <p>{ERROR_DEFAULT_TEXT}</p>
                        </CenterBox>
                    ) : (
                        <>
                            {(Object.keys(idList)?.length === 0) ? (
                                <CenterBox>
                                    <p>{EMPTY_DATA_DEFAULT_TEXT}</p>
                                </CenterBox>
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
    </>
), (prevProps, nextProps) => {
    if (
        prevProps.error === nextProps.error
        && prevProps.loading === nextProps.loading
        && prevProps.setChoosenHero === nextProps.setChoosenHero
        && !areTwoIdListDifferent(prevProps.idList, nextProps.idList)
    ) {
        return true;
    }
    return false;
});

export default HeroList;
