import { DOMAIN_URL } from '../config';

export const mockedDeckListData = {
    "id": 1,
    "heroes": {
        "144003": 1,
        "05001": 1,
        "05002": 1
    },
}

export const mockedCardData = {
    "pack_code": "LoS",
    "pack_name": "The Land of Shadow",
    "type_code": "hero",
    "type_name": "Hero",
    "sphere_code": "lore",
    "sphere_name": "Lore",
    "position": 3,
    "code": "144003",
    "name": "Damrod",
    "traits": "Gondor. Ranger.",
    "text": "Reduce the cost of the first <b><i>Trap</i></b> card you play each round by 1 (to a minimum of 0).\n<b>Response:</b> After a <b><i>Trap</i></b> card you control is attached to an enemy, draw 1 card.",
    "flavor": "\"See! Some of the Southrons have broken from the trap and are flying from the road.\" <cite>The Two Towers</cite>",
    "is_unique": true,
    "threat": 9,
    "willpower": 2,
    "attack": 2,
    "defense": 1,
    "health": 4,
    "quantity": 1,
    "deck_limit": 1,
    "illustrator": "Joshua Cairós",
    "octgnid": "3f482b9c-aa18-415e-ab9b-58f9c3b328a1",
    "has_errata": false,
    "url": "https://ringsdb.com/card/144003",
    "imagesrc": "/bundles/cards/144003.png"
};

export const mockOkResponse = (mockedData: {[key: string]: string | number | boolean | object}) => ({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: () => Promise.resolve(mockedData),
});

export const mockErrorResponse = {
    ok: false,
    status: 404,
    statusText: 'Not Found',
};

export const mockFetch = async (url: URL | RequestInfo) => {
    const urlStr = url.toString();
    if (urlStr.startsWith(DOMAIN_URL) && urlStr.includes('decklist')) {
        return Promise.resolve(mockOkResponse(mockedDeckListData));
    }

    if (urlStr.startsWith(DOMAIN_URL) && urlStr.includes('card')) {
        return Promise.resolve(mockOkResponse(mockedCardData));
    }
}

export const mockErrorFetch = async (_url: URL | RequestInfo) => Promise.resolve(mockErrorResponse);
