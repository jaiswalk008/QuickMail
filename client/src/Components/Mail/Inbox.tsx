import './Inbox.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { emailActions } from '../Context/store';
import DeleteButton from '../UI/DeleteButton';
import { useCallback } from 'react';
const Inbox=(props:any) =>{
    const dispatch = useDispatch();
    
    const emailClickHandler = useCallback(async (id:string) =>{
        props.onEmailClickHandler(id);   

        if(!props.isRead){
           
            
            try {
                dispatch(emailActions.markEmailAsRead(id));
                await axios.get('http://localhost:4000/markread/'+id);
            } catch (error) {
                console.log(error)
            }
        }
    },[props,dispatch])
    
    const senderName = !props.isRead ? '*'+props.senderName : props.senderName;
    return (
        <div onClick={() => emailClickHandler(props._id)} id={props._id} className=" bg-dark inbox-container p-1 d-flex justify-content-around">
            <span className="sender-name">{senderName}</span>
            <span>
                <strong className="me-4">{props.subject}</strong>
                <span className="truncate-text">{props.bodyText}</span>
            </span>
            {props.type==='recieved' && <DeleteButton id={props._id}/>}
            <hr/>
        </div>
    )
}

export default Inbox;