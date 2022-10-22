type HeroCardListType = {[key: string]: number};

type Hero = {[key: string] : string|number|boolean}

// type Hero = {
//     pack_name: string;
//     type_name: string;
//     sphere_name: string;
//     position: number;
//     code: string;
//     name: string;
//     traits: string;
//     text: string;
//     flavor: string;
//     is_unique: boolean;
//     threat: number;
//     willpower: number;
//     attack: number;
//     defense: number;
//     health: number;
//     quantity: number;
//     deck_limit: number;
//     illustrator: string;
//     has_errata: boolean;
//     imagesrc: string;
// };

export type {
    HeroCardListType,
    Hero,
}
