import { Email } from '../Context/email';
import './Inbox.css';

import DOMPurify from 'dompurify';


const InboxMesssage = (props:any) =>{
    console.log(props);
    const email = props.emails.filter((element:Email) => element._id===props.id)[0]
    const name = props.type==='sent'? 'To:'+email.receiverName: email.senderName
    const mail = props.type==='sent'? email.receiver: email.sender;
    //sanitization example, removing <script> tags and event attributes like onload and onclick may be removed.
    const sanitizedHTML = DOMPurify.sanitize(email.bodyHTML);
    return (
        <div className="inbox-content overflow-auto">
            <nav className='navbar bg-dark'>
                <i onClick={() => props.onEmailClickHandler('')} 
                className="bi back-icon bi-arrow-left-circle-fill"></i>
                
            </nav>
            <div className='message-div p-3'>
                <h3 className='text-center mt-2 w-100'>{email.subject}</h3>
                <hr style={{color:'black'}}></hr>
                <p>
                    <strong className='fs-4 m-2'>{name}</strong>
                    <span className='fs-6'>{'<'+mail+'>'}</span>
                     
                </p>
                {/* In this example, dangerouslySetInnerHTML is an object
                 with a __html property, and the value of __html is set to the 
                 HTML content we want to render. The double underscore (__) is used to 
                 indicate that we understand the potential risks associated with rendering raw HTML.*/}
                <div className='message-body' dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />

            </div>
        </div>
    )
}
export default InboxMesssage;