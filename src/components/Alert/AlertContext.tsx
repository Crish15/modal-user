// crea un context react per gestire gli alert

import React, {createContext, useContext, useEffect, useRef, useState} from 'react'
import './AlertContext.css'
import Modal, {IModalRef} from "../Modal/Modal";

export interface IAlertParams {
    title: string
    type: 'primary' | 'danger'
    message: string
}

interface IAlertContext {
    showAlert: (params : IAlertParams) => void
    hideAlert: () => void

}

export const AlertContext = createContext<IAlertContext>({
    showAlert: () => {},
    hideAlert: () => {},
})

export const AlertProvider = ({ children } :  {children: React.ReactNode}) => {
    const [params, setParams] = useState<IAlertParams & {show:boolean}>({
        title: '',
        type: 'primary',
        message: '',
        show: false,
    })
    const ref = useRef<IModalRef>(null)

    const showAlert = (obj: IAlertParams) => {
        setParams(() => ({ ...obj, show: true }));
    }

    const hideAlert = () => {
        setParams((prev) => ({ title:'', type:'primary', message:'', show: false }))
    }

    useEffect(() => {
        function showHideModal() {
            if(params.show) {
                ref.current?.open();
                ref.current?.bringOnTop();
            } else {
                ref.current?.close();
            }
        }

        showHideModal()
    }, [params.show])

    return (
        <AlertContext.Provider value={{ showAlert, hideAlert }}>
            <Modal ref={ref} onClose={hideAlert}>
                <h1 className={"alert-title alter-title-"+params.type}>{params.title}</h1>
                <p className="alert-message">{params.message}</p>
            </Modal>
            {children}
        </AlertContext.Provider>
    )
}
