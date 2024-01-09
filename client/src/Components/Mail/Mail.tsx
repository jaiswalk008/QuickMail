import './Mail.css';
import MailHeader from "./MailHeader";
import Inbox from "./Inbox";
import MailMenu from './MailMenu';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Mail = () => {

    const {token} = useSelector((state:any) => state.auth);
    const [receivedEmails , setReceivedEmails] = useState([]);
    
    const fetchReceievedEmails = useCallback(async () =>{
        try{
            const res = await axios.get('http://localhost:4000/inbox',{
                headers:{'Authorization':token}
            })
            console.log(res.data);
            setReceivedEmails(res.data);
            
        }
        catch(err:any) { console.log(err)}
    },[token])
    useEffect(() =>{
        fetchReceievedEmails();
    },[fetchReceievedEmails])
    return (
        <div className='h-100'>
           <MailHeader/>
            
            <div className='d-flex h-100'>
                <div className='w-25 h-100'><MailMenu/></div>
               <div className='d-flex flex-column mt-3 w-100 overflow-auto'>
                    {receivedEmails.length>0 && receivedEmails.map((element:any) => {
                        return <Inbox key={element._id} senderName={element.senderName}  subject ={element.subject} 
                        body={element.bodyText}/>
                    })}
              
               </div>
            </div>
        </div>
    )
}
export default Mail;