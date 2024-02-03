import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { emailActions } from "../Context/store";
import { Email } from "../Context/email";
const useFetch = (url:string, token:string ) => {
    const dispatch = useDispatch();
    useEffect(()=>{

        const fetchdata = async () =>{
            try{
                const res = await axios.get(url,{headers:{'Authorization':token}});
                console.log(res);
                
                //received email - bodyhtml,isread,rid,sid,subject , 
                //required - semail , remail , sname
                const receivedEmails = res.data.receivedEmails.map((element:Email) =>{
                    const {name,email} =  res.data.senders.filter((sender:any) => sender._id===element.senderId)[0];
                    return {...element,senderName:name,sender:email};
                })
                const sentEmails = res.data.sentEmails.map((element:Email) =>{
                    const {name,email} =  res.data.receivers.filter((receiver:any) => receiver._id===element.receiverId)[0];
                    return {...element,receiverName:name,receiver:email};
                })
                console.log(sentEmails);
                // console.log(ReceivedEmails)
                dispatch(emailActions.setreceivedEmails(receivedEmails.reverse()));
                dispatch(emailActions.setreceivedEmailsClone(receivedEmails.reverse()));
                dispatch(emailActions.setSentEmails(sentEmails.reverse()));
                
            }
            catch(err:any){
              
                console.log(err);
            }
        
        }
        fetchdata();
    },[url,token,dispatch])
    return ;
}
export default useFetch;