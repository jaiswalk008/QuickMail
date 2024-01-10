import { Email } from '../Context/email';
import './Inbox.css';
import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify';


const InboxMesssage = (props:any) =>{
    const {recievedEmails} = useSelector((state:any) => state.email);
    const email = recievedEmails.filter((element:Email) => element._id===props.id)[0]
    // console.log(email);
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
                    <strong className='fs-4 m-2'>{email.senderName}</strong>
                    <span className='fs-6'>{email.sender}</span>
                </p>
                {/* In this example, dangerouslySetInnerHTML is an object
                 with a __html property, and the value of __html is set to the 
                 HTML content you want to render. The double underscore (__) is used to 
                 indicate that you understand the potential risks associated with rendering raw HTML.*/}
                <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />

            </div>
        </div>
    )
}
export default InboxMesssage;