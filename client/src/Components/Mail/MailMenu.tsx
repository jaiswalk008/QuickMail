import './Mail.css';
import Compose from './Compose';
import { NavLink } from 'react-router-dom/';
import {createPortal} from 'react-dom';
const MailMenu = () =>{
    return (
        <div className='mailmenu'>
            <div className='text-center'><button data-bs-toggle="modal" data-bs-target="#composeModal" className="btn compose btn-light">✏️Compose</button></div>
            
            {createPortal(<Compose/> , document.getElementById('modal-content') as HTMLDivElement)};
            <div className='button-container'>
                <NavLink exact   to="/inbox">Inbox</NavLink>
                <NavLink  to="/sent">Sent</NavLink>
            </div>
        </div>
    )
}
export default MailMenu;