import React, {forwardRef, Ref, useImperativeHandle, useState} from "react";
import './Modal.css';
interface IModalProps {
    children: React.ReactNode;
}


export interface IModalRef {
    open: () => void;
    close: () => void;
}
const Modal = forwardRef(({children}: IModalProps, ref: Ref<IModalRef> | undefined) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onClose = () => {
        setIsModalOpen(false);
    }


    useImperativeHandle(ref, () => ({
        open: () => setIsModalOpen(true),
        close: onClose,
    }));

    if(!isModalOpen) return null;

    return (
        <div className={'modal'}>
            <div className="modal-overlay" onClick={onClose} />
            <div className="modal-body" >
                <div className={'modal-close'} onClick={onClose}>X</div>
                {children}
            </div>
        </div>
    );
});

export default Modal;
