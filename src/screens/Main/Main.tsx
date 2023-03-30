import Button from "../../components/Button/Button";
import {AlertContext} from "../../components/Alert/AlertContext";
import React, {useContext, useRef, useState} from "react";
import Modal, {IModalRef} from "../../components/Modal/Modal";
import Users, {IUser} from "./Users/Users";
import {getUsers} from "../../service/getUser";
import './Main.css';

export const Main  = () => {
    const { showAlert, hideAlert } = useContext(AlertContext);
    const [users, setUsers] = useState<IUser[]>([]);
    const [userNumber, setUserNumber] = useState<number>(10);
    const modalRef = useRef<IModalRef>(null);

    const doRequest = async () => {
        if(userNumber <= 0 || userNumber >= 20) {
            showAlert({
                title: 'Error',
                type: 'danger',
                message: 'Please enter a number between 1 and 20',
            });

            setTimeout(() => {
                hideAlert();
            }, 2000);
            return
        }
        const res = await getUsers(userNumber);
        if(res)
            setUsers(res);
    }
    const onPress = async function(){
        if(users.length === 0)
            doRequest();


        if(modalRef.current) {
            modalRef.current.open();
        }


        /*showAlert({
            title: 'Hello',
            type: 'danger',
            message: 'Hello world',
        })*/
    }

    const refreshData = () => {
        doRequest();
    }

   return (<div className="App">
               <Modal ref={modalRef}>
                   <Users data={users}/>
                   <div className={'action-bar'}>
                       <span>Page size</span><input type={'number'} value={userNumber} onChange={(e) => {setUserNumber(parseInt(e.target.value))}}/>
                       <Button onPress={refreshData}>Refresh</Button>
                   </div>
               </Modal>
               <Button onPress={onPress}>
                   Click me
               </Button>
       </div>)
}
