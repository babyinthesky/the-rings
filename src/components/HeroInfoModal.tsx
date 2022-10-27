import Modal from 'react-modal';
import { Hero } from '../types';
import HeroCardImage from './HeroCardImage';
import { DOMAIN_URL } from '../config';

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

const HeroInfoRow = ({
    field,
    value,
} : {
    field: string;
    value: string | number | boolean;
}) => {
    const newValue = (typeof value === 'number' || typeof value === 'boolean') ? value.toString() : value;
    const newField = field.replace('_', ' ');
    return (
        <div className="row spacebetween">
            <span>{`${newField}:`}</span>
            <div dangerouslySetInnerHTML={{__html: newValue}}/>
        </div>
    );
}

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
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div className="column">
                <div className="row spacebetween">
                    <h3>
                        {hero?.name}
                    </h3>
                    <div
                        onClick={closeModal}
                    >
                        x
                    </div>
                </div>
                {hero && (
                    <div className="row">
                        <div className="column width30p">
                            {/* <h4>Hero card</h4> */}
                            <HeroCardImage
                                imgUrl={`${DOMAIN_URL}${hero?.imagesrc}`}
                                imgAlt={hero.name as string}
                            />
                        </div>
                        <div className="column width70p">
                            {/* <h4>Hero Info</h4> */}
                            <div className="row">
                                <div className="width40p marginRight">
                                    {briefFieldsToDisplay.map((field) => (
                                        <HeroInfoRow
                                            field={field}
                                            value={hero[field]}
                                        />
                                    ))}
                                </div>
                                <div className="width60p">
                                    {longFieldsToDisplay.map((field) => (
                                        <HeroInfoRow
                                            field={field}
                                            value={hero[field]}
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
