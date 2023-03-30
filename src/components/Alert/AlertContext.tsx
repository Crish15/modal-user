// crea un context react per gestire gli alert

import React, { createContext, useContext, useState } from 'react'
import './AlertContext.css'

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

    const showAlert = (obj: IAlertParams) => {
        setParams(() => ({ ...obj, show: true }));
    }

    const hideAlert = () => {
        setParams((prev) => ({ title:'', type:'primary', message:'', show: false }))
    }

    return (
        <AlertContext.Provider value={{ showAlert, hideAlert }}>
            {params.show ? <div className={'alert alert-'+params.type}>
                <h1 className="alert-title">{params.title}</h1>
                <p className="alert-message">{params.message}</p>
            </div> : null}
            {children}
        </AlertContext.Provider>
    )
}
