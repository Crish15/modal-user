import {useEffect, useMemo, useState} from "react";
import Button from "../../../components/Button/Button";
import './Users.css';
import {calculatePageSize} from "../../../util/Common";

export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
}

interface IUsersProp {
    data: IUser[] | undefined;
}

const Users = ({data}: IUsersProp) => {
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    useEffect(() => {
        if (data)
            setSelectedUser(data[0]);
    }, [data])

    const pageSize = useMemo(() => {
        if (data) {
            return calculatePageSize(data.length, 5)
        }
        return 5;
    }, [data]);

    if (selectedUser)
        return (<>
            <div className='user-detail'>
                <div className='user-image-holder' style={{backgroundImage: 'url(' + selectedUser.avatar + ')'}}
                     title={selectedUser.first_name + " " + selectedUser.last_name}/>
                <div className='user-info-container'>
                    <h2 className='user-full-name'>{selectedUser.first_name + " " + selectedUser.last_name}</h2>
                    <p className='user-email'>{selectedUser.email}</p>
                </div>
            </div>
            <div className={'users-switch grid-column-'+pageSize}>
                {
                    data?.map((user) => {
                        return <Button
                            key={user.id}
                            onPress={() => setSelectedUser(user)}
                            type={user.id === selectedUser?.id ? 'primary' : 'info'}>
                            {user.first_name}
                        </Button>
                    })
                }
            </div>

        </>)

    return (
        <>
            <div> Loading...</div>
        </>
    )
}

export default Users
