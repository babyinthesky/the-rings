import React, { memo } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import CenterBox from '../CenterBox';
import HorizonList from './HorizonList';
import { HeroCardListType, Hero } from '../../types';
import { ERROR_DEFAULT_TEXT } from '../../config';

const areTwoIdListDifferent = (list1: HeroCardListType, list2: HeroCardListType) => {
    if (Object.keys(list1).length !== Object.keys(list2).length) return true;
    return Object.keys(list1).some((key1) => !Object.prototype.hasOwnProperty.call(list2, key1));
};

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
}) => {
    if (loading) {
        return (
            <CenterBox>
                <LoadingSpinner />
            </CenterBox>
        );
    }

    return (
        <>
            {/* Here are your heroes */}
            <div
                data-testid="hero-list"
                className="margin-top-3"
            >
                {error ? (
                    <CenterBox>
                        <p>{ERROR_DEFAULT_TEXT}</p>
                    </CenterBox>
                ) : (
                    <HorizonList
                        data={idList}
                        setChoosenHero={setChoosenHero}
                    />
                )}
            </div>
        </>
    );
}, (prevProps, nextProps) => {
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
