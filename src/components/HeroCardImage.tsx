import { DOMAIN_URL } from "../config";

const HeroCardImage = ({
    imgUrl,
    imgAlt,
} : {
    imgUrl: string;
    imgAlt: string;
}) => {
    return (
        <img
            src={imgUrl}
            className="heroCardImage"
            alt={imgAlt}
        />
    )
}

export default HeroCardImage;
