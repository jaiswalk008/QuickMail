import './Mail.css';
import MailHeader from "./MailHeader";
import Inbox from "./Inbox";
import MailMenu from './MailMenu';
import {  useEffect, useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
// import { emailActions } from '../Context/store';
import { Email, fetchRecievedEmails } from '../Context/email';
import InboxMesssage from './InboxMessage';
// import axios from 'axios';

const Mail = () => {

    const {token} = useSelector((state:any) => state.auth);
    const {recievedEmails} = useSelector((state:any) => state.email);
    const [showInbox , setShowInbox] = useState(true);
    const [emailId , setEmailId] = useState('');
    const dispatch:any = useDispatch();
    
    const emailViewHandler = (id:string) =>{
        setEmailId(id);
        setShowInbox(prev => !prev);
    }

    useEffect(() =>{
        dispatch(fetchRecievedEmails(token));
    },[dispatch,token])
    return (
        <div className='h-100'>
           <MailHeader/>
            
            <div className='d-flex h-100'>
                <div className='w-25 h-100'><MailMenu/></div>
               {showInbox && <div className='d-flex flex-column mt-3 w-100 overflow-auto'>
                    {recievedEmails.length>0 && recievedEmails.map((element:Email) => {
                        return <Inbox onEmailClickHandler={emailViewHandler} type="recieved" key={element._id} isRead={element.isRead} _id={element._id} 
                        senderName={element.senderName}  subject ={element.subject} 
                        bodyText={element.bodyText}/>
                    })}

               </div>}
               {!showInbox && <div className='w-100 overflow-hidden'>
                    <InboxMesssage type="recieved" onEmailClickHandler={emailViewHandler} emails={recievedEmails} id={emailId}/>
               </div>}
            </div>
        </div>
    )
}
export default Mail;