import { NavLink } from 'react-router-dom/';
import {createPortal} from 'react-dom';
import { useSelector } from 'react-redux';
import Compose from './Compose';
import './Mail.css';
const MailMenu = () =>{
    const {unreadEmails} = useSelector((state:any) => state.email);

    return (
        <div className='mailmenu'>
            <div className='text-center'><button data-bs-toggle="modal" data-bs-target="#composeModal" className="btn compose btn-light">✏️Compose</button></div>
            
            {createPortal(<Compose/> , document.getElementById('modal-content') as HTMLDivElement)};
            <div className='button-container'>
                <NavLink to="/inbox">Inbox <span className='unread-emails'>{unreadEmails}</span></NavLink>
                <NavLink to="/sent">Sent</NavLink>
            </div>
        </div>
    )
}
export default MailMenu;