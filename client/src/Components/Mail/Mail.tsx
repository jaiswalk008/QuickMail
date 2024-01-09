import './Mail.css';
import MailHeader from "./MailHeader";
import Inbox from "./Inbox";
import MailMenu from './MailMenu';
const Mail = () => {
    
    return (
        <div className='h-100'>
           <MailHeader/>
            
            <div className='d-flex h-100'>
                <div className='w-25 h-100'><MailMenu/></div>
               <div className='d-flex flex-column mt-3 w-100 overflow-auto'>
               <div className='bg-secondary inbox-container'> <Inbox/></div>
               <div className='bg-secondary inbox-container '> <Inbox/></div>
               <div className='bg-secondary inbox-container'> <Inbox/></div>
               <div className='bg-secondary inbox-container'> <Inbox/></div>
               </div>
            </div>
        </div>
    )
}
export default Mail;