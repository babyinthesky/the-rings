import CloseIcon from '../../assets/close_icon.svg';

const CloseButton = ({
    onClick,
} : {
    onClick: () => void;
}) => (
    <div
        className="cursor-pointer close-button"
        onClick={onClick}
    >
        <img
            src={CloseIcon}
            className="close-button-svg"
        />
    </div>
)

export default CloseButton;
