import React, { useCallback, KeyboardEvent } from 'react';
import CloseIcon from '../../assets/close_icon.svg';

const CloseButton = ({
    onClick,
} : {
    onClick: () => void;
}) => {
    const onKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            onClick();
        }
    }, []);

    return (
        <div
            className="cursor-pointer close-button"
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={onKeyDown}
        >
            <img
                src={CloseIcon}
                className="close-button-svg"
                alt="close"
            />
        </div>
    );
};

export default CloseButton;
