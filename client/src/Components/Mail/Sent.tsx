import MailHeader from "./MailHeader"
import './Mail.css';
import MailMenu from "./MailMenu";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { Email } from "../Context/email";
import Inbox from "./Inbox";
import InboxMesssage from "./InboxMessage";
import useFetch from "../Hooks/useFetch";

const Sent = () =>{

    const dispatch:any = useDispatch();
    const {token} = useSelector((state:any) => state.auth);
    const {sentEmails } = useSelector((state:any) => state.email);
    const [showInbox , setShowInbox] = useState(true);
    const [emailId , setEmailId] = useState('');
    
    const emailViewHandler = (id:string) =>{
        setEmailId(id);
        setShowInbox(prev => !prev);
    }
    useFetch('http://localhost:4000/mail',token);
    
    return (
        <div>
            <MailHeader type="sent"/>
            <div className='d-flex h-100'>
                <div className='w-25 h-100'><MailMenu/></div>
               {showInbox && <div className='d-flex flex-column mt-3 w-100 overflow-auto'>
                    {sentEmails.length>0 && sentEmails.map((element:Email) => {
                        return <Inbox onEmailClickHandler={emailViewHandler} type="sent" key={element._id} isRead={true} _id={element._id} 
                        subject ={element.subject} 
                        bodyHTML={element.bodyHtml}/>
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