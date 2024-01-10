import './Inbox.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { emailActions } from '../Context/store';
const Inbox=(props:any) =>{
    const dispatch = useDispatch();
    const emailClickHandler = async (id:string) =>{
        props.onEmailClickHandler(id);   
        try {
            dispatch(emailActions.markEmailAsRead(id));
            await axios.get('http://localhost:4000/markread/'+id);
        } catch (error) {
            console.log(error)
        }
    }
    const senderName = !props.isRead ? '🔵'+props.senderName : props.senderName;
    return (
        <div onClick={() => emailClickHandler(props._id)} id={props._id} className=" bg-dark inbox-container p-1 d-flex justify-content-around">
            <span className="sender-name">{senderName}</span>
            <span>
                <strong className="me-4">{props.subject}</strong>
                <span className="truncate-text">{props.bodyText}</span>
            </span>
            <hr/>
        </div>
    )
}
export default Inbox;