import React from 'react';
import Modal from './Modal';
import { Hero } from '../../types';
import HeroCardImage from '../HeroCard/HeroCardImage';
import HeroInfoRow from './HeroInfoRow';

const customStyles = {
    content: {
        width: '70%',
        height: '70%',
        padding: '2rem',
    },
};

const HeroInfoModal = ({
    hero,
    modalIsOpen,
    closeModal,
} : {
    hero: Hero | undefined;
    modalIsOpen: boolean;
    closeModal: () => void;
}) => {
    const briefFieldsToDisplay = ['name', 'pack_name', 'type_name', 'sphere_name', 'code', 'traits', 'threat', 'willpower', 'attack', 'defense', 'health', 'quantity', 'deck_limit', 'illustrator'];
    const longFieldsToDisplay = ['flavor', 'text'];

    const modalHeader = (
        <h2
            data-testid="modal-hero-name"
        >
            {hero?.name}
        </h2>
    );

    if (!hero) return null;

    return (
        <Modal
            isOpen={modalIsOpen}
            onClose={closeModal}
            customStyles={customStyles}
            header={modalHeader}
        >
            <div
                className="row margin-top-1"
                data-testid={`modal-${hero.code}`}
            >
                <div className="column width30p padding-right-2">
                    {/* Hero card */}
                    <HeroCardImage
                        heroId={hero.code as string}
                        imgUrl={hero.imagesrc as string}
                        imgAlt={hero.name as string}
                    />
                </div>
                <div className="column width70p">
                    {/* Hero Info */}
                    <div className="row">
                        <div className="width40p padding-right-2">
                            {briefFieldsToDisplay.map((field) => (
                                <HeroInfoRow
                                    key={field}
                                    field={field}
                                    value={hero[field]}
                                />
                            ))}
                        </div>
                        <div className="width60p">
                            {longFieldsToDisplay.map((field) => (
                                <HeroInfoRow
                                    key={field}
                                    field={field}
                                    value={hero[field]}
                                    isLongTextField
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default HeroInfoModal;
