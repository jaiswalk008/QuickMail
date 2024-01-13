import MailHeader from "./MailHeader"
import './Mail.css';
import MailMenu from "./MailMenu";
import { useSelector } from 'react-redux';
import { useState } from "react";
import { Email } from "../Context/email";
import Inbox from "./Inbox";
import InboxMesssage from "./InboxMessage";
import useFetch from "../../useFetch";
const Sent = () =>{
    const {token} = useSelector((state:any) => state.auth);
    const {sentEmails} = useSelector((state:any) => state.email);
    const [showInbox , setShowInbox] = useState(true);
    const [emailId , setEmailId] = useState('');
    
    const emailViewHandler = (id:string) =>{
        setEmailId(id);
        setShowInbox(prev => !prev);
    }
    useFetch('http://localhost:4000/sentEmails',token,'sent');
   
    return (
        <div>
            <MailHeader/>
            <div className='d-flex h-100'>
                <div className='w-25 h-100'><MailMenu/></div>
               {showInbox && <div className='d-flex flex-column mt-3 w-100 overflow-auto'>
                    {sentEmails.length>0 && sentEmails.map((element:Email) => {
                        return <Inbox onEmailClickHandler={emailViewHandler} type="sent" key={element._id} isRead={true} _id={element._id} 
                        subject ={element.subject} 
                        bodyText={element.bodyText}/>
                    })}

               </div>}
               {!showInbox && <div className='w-100 overflow-hidden'>
                    <InboxMesssage onEmailClickHandler={emailViewHandler} type="sent" emails={sentEmails} id={emailId}/>
               </div>}
            </div>
        </div>
    )
}
export default Sent;