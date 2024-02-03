import { useCallback } from 'react';
import { emailActions } from '../Context/store';
import { useDispatch } from 'react-redux';
import DeleteButton from '../UI/DeleteButton';
import { Email } from '../Context/email';
import axios from 'axios';
import DOMPurify from 'dompurify';
import './Inbox.css';
const Inbox=(props:any) =>{
    // console.log(props)
    const dispatch = useDispatch();
    // const email = props.emails.filter((element:Email) => element._id===props.id)[0]
    
    const sanitizedHTML = DOMPurify.sanitize(props.bodyHTML);

    const emailClickHandler = useCallback(async (id:string) =>{
        props.onEmailClickHandler(id);   

        if(!props.isRead){
            
            try {
                dispatch(emailActions.markEmailAsRead(id));
                await axios.put('http://localhost:4000/mail/'+id);
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
                <span className="truncate-text" dangerouslySetInnerHTML={{ __html: sanitizedHTML} }/>
            </span>
            <DeleteButton id={props._id} type={props.type}/>
            <hr/>
        </div>
    )
}

export default Inbox;