import React, { useCallback, useEffect } from 'react';
import CloseButton from './CloseButton';

const Modal = ({
    children,
    isOpen,
    customStyles,
    header,
    onClose,
} : {
    children: React.ReactElement;
    isOpen: boolean;
    customStyles?: {
        content?: React.CSSProperties;
        overlay?: React.CSSProperties;
    }
    header?: null | React.ReactElement;
    onClose: () => void;
}) => {
    const onEscapePress = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onClose();
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', onEscapePress, false);
        return () => document.removeEventListener('keydown', onEscapePress, false);
    }, []);

    if (!isOpen) return null;
    return (
        <div
            className="modal-overlay center"
            style={customStyles?.overlay}
        >
            <div
                className="modal-content column"
                style={customStyles?.content}
            >
                <div className="modal-header row spacebetween">
                    {header}
                    <CloseButton
                        onClick={onClose}
                    />
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

Modal.defaultProps = {
    customStyles: {},
    header: null,
};

export default Modal;
