import React from 'react';
import CloseButton from './CloseButton';

const Modal = ({
    header,
    children,
    isOpen,
    customStyles = {},
    onClose,
} : {
    children: React.ReactElement;
    isOpen: boolean;
    customStyles?: {
        content?: React.CSSProperties;
        overlay?: React.CSSProperties;
    }
    header?: React.ReactElement;
    onClose: () => void;
}) => {
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

export default Modal;