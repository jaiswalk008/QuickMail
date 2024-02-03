import './Mail.css';
import MailHeader from "./MailHeader";
import Inbox from "./Inbox";
import MailMenu from './MailMenu';
import {  useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Email } from '../Context/email';
import InboxMesssage from './InboxMessage';
import useFetch from '../Hooks/useFetch';

const Mail = () => {
    const dispatch:any = useDispatch();
    const {token} = useSelector((state:any) => state.auth);
    const {receivedEmails} = useSelector((state:any) => state.email);
    const [showInbox , setShowInbox] = useState(true);
    const [emailId , setEmailId] = useState('');

    const emailViewHandler = (id:string) =>{
        setEmailId(id);
        setShowInbox(prev => !prev);
    }
    useFetch('http://localhost:4000/mail',token);
    return (
        <>
           <MailHeader type= "received"/>
            
            <div className='d-flex h-100'>
                <div className='w-25 h-100'><MailMenu/></div>
               {showInbox && <div className='d-flex flex-column mt-3 w-100 overflow-auto'>
                    {receivedEmails.length>0 && receivedEmails.map((element:Email) => {
                        return <Inbox onEmailClickHandler={emailViewHandler} type="received" key={element._id} isRead={element.isRead} _id={element._id} 
                        senderName={element.senderName}  subject ={element.subject} 
                        bodyHTML={element.bodyHtml}/>
                    })}

               </div>}
               {!showInbox && <div className='w-100 overflow-hidden'>
                    <InboxMesssage type="received" onEmailClickHandler={emailViewHandler} emails={receivedEmails} id={emailId}/>
               </div>}
            </div>
        </>
    )
}
export default Mail;