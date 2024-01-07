import './Mail.css';
import Compose from './Compose';
const MailMenu = () =>{
    return (
        <div className='mailmenu'>
            <div className='text-center'><button data-bs-toggle="modal" data-bs-target="#composeModal" className="btn compose btn-light">✏️Compose</button></div>
            
            <Compose/>
        </div>
    )
}
export default MailMenu;