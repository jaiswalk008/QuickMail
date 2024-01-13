import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { emailActions } from "./store";
// import { Dispatch } from "@reduxjs/toolkit";
export type Email = {
    _id: string;
    subject: string;
    sender: string;
    receiver: string;
    bodyText: string;
    timestamp: number;
    bodyHtml:string,
    senderName:string,
    senderId:string,
    isRead: boolean;
  };
  

const initialEmailState: {recievedEmails:Array<Email> , sentEmails:Array<Email> , unreadEmails:number} = {
    recievedEmails:[],
    sentEmails:[],
    unreadEmails:0,
}

export const emailSlice = createSlice({
    name:"email",
    initialState:initialEmailState,
    reducers:{
        setRecievedEmails(state,action){
            state.recievedEmails = action.payload;
            state.unreadEmails = action.payload.reduce((acc:number  , curr:{isRead:boolean}) =>{
                return curr.isRead === false ? acc + 1 : acc;
            },0)
            console.log(state.unreadEmails);
        },
        setSentEmails(state,action){
            state.sentEmails = action.payload;
        },
        addToSentEmail(state,action){
            state.sentEmails.unshift(action.payload);
        },

        markEmailAsRead(state,action){
            state.recievedEmails.forEach((email) =>{
                if(email._id === action.payload){
                    email.isRead = true;
                }
            })
            state.unreadEmails--;
            // console.log(state.unreadEmails);
        },
        deleteEmail(state,action){

            if(action.payload.type==='sent'){
                state.sentEmails = state.sentEmails.filter((email:Email )=> email._id!==action.payload.id)
            }
            else state.recievedEmails = state.recievedEmails.filter((email:Email )=> email._id!==action.payload.id)
        }

    }

})
export const fetchRecievedEmails = (token:string)=>{
    return async (dispatch:any)=>{
        const getRecievedEmails =async () =>{
            const res =  await axios.get('http://localhost:4000/inbox',
                    {headers:{'Authorization' : token}}) ;
            console.log(res.data);
            dispatch(emailActions.setRecievedEmails(res.data.reverse()))
        }
        try{
            await getRecievedEmails();
        }
        catch(err:any){
            console.log(err);
        }
    }
}
export const fetchSentEmails = (token:string) =>{
    return async (dispatch:any) =>{
        const getSentEmails = async () =>{
            const res = await axios.get('http://localhost:4000/sentEmails',{
                headers:{'Authorization':token}
            })
            console.log(res.data);
            dispatch(emailActions.setSentEmails(res.data.reverse()));
        }
        try {
            await getSentEmails();
        } catch (error) {
            console.log(error);
        }
    }
}
 