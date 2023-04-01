import React, {createRef, forwardRef, Ref, useImperativeHandle, useState} from "react";
import './Modal.css';
interface IModalProps {
    children: React.ReactNode;
    onClose?: () => void;
}


export interface IModalRef {
    open: () => void;
    close: () => void;
    bringOnTop: () => void;
}
const Modal = forwardRef(({children, onClose}: IModalProps, ref: Ref<IModalRef> | undefined) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [zIndex, setZIndex] = useState(100);
    const containerRef = createRef<HTMLDivElement>();

    const hideModel = () => {
        setIsModalOpen(false);
        if(onClose) onClose();
    }



    useImperativeHandle(ref, () => ({
        open: () => setIsModalOpen(true),
        close: hideModel,
        bringOnTop: () => {
            let allModal = document.getElementsByClassName('modal')

            //get max z-index
            let maxZIndex = 0;
            for(let i = 0; i < allModal.length; i++) {
                let zIndex = parseInt(window.getComputedStyle(allModal[i]).zIndex);
                if(zIndex > maxZIndex) {
                    maxZIndex = zIndex;
                }
            }

            //set z-index
            setZIndex(maxZIndex + 1);
        }
    }));

    if(!isModalOpen) return null;

    return (
        <div className={'modal'} ref={containerRef} style={{zIndex: zIndex}}>
            <div className="modal-overlay" onClick={hideModel} />
            <div className="modal-body" >
                <div className={'modal-close'} onClick={hideModel}>X</div>
                {children}
            </div>
        </div>
    );
});

export default Modal;
