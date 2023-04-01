import Button from "../../components/Button/Button";
import {AlertContext} from "../../components/Alert/AlertContext";
import React, {useContext, useRef, useState} from "react";
import Modal, {IModalRef} from "../../components/Modal/Modal";
import Users, {IUser} from "./Users/Users";
import {getUsers} from "../../service/getUser";
import './Main.css';

export const Main  = () => {
    const { showAlert } = useContext(AlertContext);
    const [users, setUsers] = useState<IUser[]>([]);
    const [userNumber, setUserNumber] = useState<number>(10);
    const modalRef = useRef<IModalRef>(null);

    const doRequest = async () => {
        if(userNumber <= 0 || userNumber > 20) {
            showAlert({
                title: 'Error',
                type: 'danger',
                message: 'Please enter a number between 1 and 20',
            });
            return
        }
        const res = await getUsers(userNumber);
        if(res)
            setUsers(res);
    }
    const onPress = async function(){


        if(modalRef.current) {
            modalRef.current.open();
            if(users.length === 0)
                doRequest();
        }
    }

    const refreshData = () => {
        doRequest();
    }

   return (<div className="App">
               <Modal ref={modalRef}>
                   <Users data={users}/>
                   <div className={'action-bar'}>
                       <div>
                           <span style={{marginRight:"0.5rem"}}>Page size</span>
                           <input type={'number'} value={userNumber} onChange={(e) => {setUserNumber(parseInt(e.target.value))}}/>
                       </div>
                       <Button onPress={refreshData}>Refresh</Button>
                   </div>
               </Modal>
               <Button onPress={onPress}>
                   Click me
               </Button>
       </div>)
}
