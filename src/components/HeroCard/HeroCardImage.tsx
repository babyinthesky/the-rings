import { memo } from 'react';
import LoadingSpinner from "../LoadingSpinner";
import { DOMAIN_URL } from "../../config";

const HeroCardImage = memo(({
    imgUrl,
    imgAlt,
} : {
    imgUrl: string | undefined;
    imgAlt: string | undefined;
}) => (
    <>
        {imgUrl ? (
            <img
                src={`${DOMAIN_URL}${imgUrl}`}
                className="hero-card-image"
                alt={imgAlt}
            />
        ) : (
            <div className="hero-card-loading-container center">
                <LoadingSpinner />
            </div>
        )}
    </>
));

export default HeroCardImage;
