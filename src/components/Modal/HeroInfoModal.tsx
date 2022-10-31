import Modal from 'react-modal';
import { Hero } from '../../types';
import HeroCardImage from '../HeroCard/HeroCardImage';
import HeroInfoRow from './HeroInfoRow';
import { useEffect } from 'react';
import CloseButton from './CloseButton';

const customStyles = {
    content: {
        width: '70%',
        height: '70%',
        top: '50%',
        left: '50%',
        right: '50%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '2rem',
    },
    overlay: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    useEffect(() => {
        Modal.setAppElement('body');
    }, []);

    const briefFieldsToDisplay = ['name', 'pack_name', 'type_name', 'sphere_name', 'code', 'traits', 'threat', 'willpower', 'attack', 'defense', 'health', 'quantity', 'deck_limit', 'illustrator'];
    const longFieldsToDisplay = ['flavor', 'text'];

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div
                className="column"
                data-testid={`modal-${hero?.code}`}
            >
                <div className="row spacebetween">
                    <h2>
                        {hero?.name}
                    </h2>
                    <CloseButton
                        onClick={closeModal}
                    />
                </div>
                {hero && (
                    <div className="row margin-top-1">
                        <div className="column width30p padding-right-2">
                            {/* <h4>Hero card</h4> */}
                            <HeroCardImage
                                heroId={hero.code as string}
                                imgUrl={hero.imagesrc as string}
                                imgAlt={hero.name as string}
                            />
                        </div>
                        <div className="column width70p">
                            {/* <h4>Hero Info</h4> */}
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
                )}
            </div>
        </Modal>
    )
};

export default HeroInfoModal;
