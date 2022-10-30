import { DOMAIN_URL } from "../config";

export const mockedDeckListData = {
    "id": 1,
    "heroes": {
        "144003": 1,
        "05001": 1,
        "05002": 1
    },
}

export const mockedDeckListResponse = {
    ok: true,
    status: 200,
    statusText: 'OK',
    json: () => Promise.resolve(mockedDeckListData),
};

export const mockedCardData = () =>{
    const map = new Map();
    map.set('144003', {
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
    });
    return map;
}  

// {
//     "144003": ,
//     "05001": {
//         "pack_code": "HoN",
//         "pack_name": "Heirs of Númenor",
//         "type_code": "hero",
//         "type_name": "Hero",
//         "sphere_code": "tactics",
//         "sphere_name": "Tactics",
//         "position": 1,
//         "code": "05001",
//         "name": "Beregond",
//         "traits": "Gondor. Warrior.",
//         "text": "Sentinel.\nLower the cost to play <b><i>Weapon</i></b> and <b><i>Armor</i></b> attachments on Beregond by 2.",
//         "flavor": "\"It is over-late to send for aid when you are already besiged.\" <cite>The Return of the King</cite>",
//         "is_unique": true,
//         "threat": 10,
//         "willpower": 0,
//         "attack": 1,
//         "defense": 4,
//         "health": 4,
//         "quantity": 1,
//         "deck_limit": 1,
//         "illustrator": "Magali Villeneuve",
//         "octgnid": "4823aae3-46ef-4a75-89f9-cbd3aa1b9005",
//         "has_errata": false,
//         "url": "https://ringsdb.com/card/05001",
//         "imagesrc": "/bundles/cards/05001.png"
//     },
//     "05002": {
//         "pack_code": "HoN",
//         "pack_name": "Heirs of Númenor",
//         "type_code": "hero",
//         "type_name": "Hero",
//         "sphere_code": "leadership",
//         "sphere_name": "Leadership",
//         "position": 2,
//         "code": "05002",
//         "name": "Boromir",
//         "traits": "Gondor. Warrior. Noble.",
//         "text": "While Boromir has at least 1 resource in his resource pool, <b><i>Gondor</i></b> allies get +1 [attack].",
//         "flavor": "\"By our valour the wild fold of the East are still restrained, and the terror of Morgul kept at bay...\" <cite>The Fellowship of the Ring</cite>",
//         "is_unique": true,
//         "threat": 11,
//         "willpower": 1,
//         "attack": 3,
//         "defense": 2,
//         "health": 5,
//         "quantity": 1,
//         "deck_limit": 1,
//         "illustrator": "Magali Villeneuve",
//         "octgnid": "4823aae3-46ef-4a75-89f9-cbd3aa1b9008",
//         "has_errata": false,
//         "url": "https://ringsdb.com/card/05002",
//         "imagesrc": "/bundles/cards/05002.png"
//     }
// };

export const mockHeroCardResponse = (cardId: string) => ({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: () => Promise.resolve(mockedCardData().get(cardId)),
});

const mockFetch = async (url: URL | RequestInfo) => {
    const urlStr = url.toString();
    if (urlStr.startsWith(DOMAIN_URL) && urlStr.includes('decklist')) {
        return Promise.resolve(mockedDeckListResponse);
    }
    if (urlStr.startsWith(DOMAIN_URL) && urlStr.includes('card')) {
        const cardId = urlStr.split('card/')[1].split('.json')[0];
        console.log({cardId});
        return Promise.resolve(mockHeroCardResponse(cardId));
    }
}

export {
    mockFetch,
}
