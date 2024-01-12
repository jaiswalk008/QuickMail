import './Inbox.css';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { emailActions } from '../Context/store';
import DeleteButton from '../UI/DeleteButton';
const Inbox=(props:any) =>{
    const dispatch = useDispatch();
    const {recievedEmails} = useSelector((state:any)=> state.email);
    
    const emailClickHandler = async (id:string) =>{
        props.onEmailClickHandler(id);   
        const isRead = recievedEmails.filter((element:any) => element._id===id)[0].isRead;
        if(isRead) return;
        try {
            dispatch(emailActions.markEmailAsRead(id));
            await axios.get('http://localhost:4000/markread/'+id);
        } catch (error) {
            console.log(error)
        }
    }
    
    const senderName = !props.isRead ? '*'+props.senderName : props.senderName;
    return (
        <div onClick={() => emailClickHandler(props._id)} id={props._id} className=" bg-dark inbox-container p-1 d-flex justify-content-around">
            <span className="sender-name">{senderName}</span>
            <span>
                <strong className="me-4">{props.subject}</strong>
                <span className="truncate-text">{props.bodyText}</span>
            </span>
            <DeleteButton id={props._id}/>
            <hr/>
        </div>
    )
}

export default Inbox;