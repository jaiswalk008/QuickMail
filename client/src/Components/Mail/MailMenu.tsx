import './Mail.css';
import Compose from './Compose';
import { NavLink } from 'react-router-dom/';
import {createPortal} from 'react-dom';
import { useSelector } from 'react-redux';
const MailMenu = () =>{
    const {unreadEmails} = useSelector((state:any) => state.email);
    console.log(unreadEmails);
    return (
        <div className='mailmenu'>
            <div className='text-center'><button data-bs-toggle="modal" data-bs-target="#composeModal" className="btn compose btn-light">✏️Compose</button></div>
            
            {createPortal(<Compose/> , document.getElementById('modal-content') as HTMLDivElement)};
            <div className='button-container'>
                <NavLink exact   to="/inbox">Inbox <span className='unread-emails'>{unreadEmails}</span></NavLink>
                <NavLink  to="/sent">Sent</NavLink>
            </div>
        </div>
    )
}
export default MailMenu;