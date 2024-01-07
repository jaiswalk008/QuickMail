import './Mail.css';
import MailHeader from "./MailHeader";
import Inbox from "./Inbox";
import MailMenu from './MailMenu';
const Mail = () => {
    return (
        <div>
           <MailHeader/>

            <div className='d-flex'>
                <div className='w-25 h-100'><MailMenu/></div>
               <div className='bg-secondary inbox-container w-75'> <Inbox/></div>
            </div>
        </div>
    )
}
export default Mail;