import { createSlice } from "@reduxjs/toolkit";

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

const initialEmailState: {recievedEmails:Email [] , sentEmails:Email [] ,   unreadEmails:number , recievedEmailsClone:Email [] } = {
    recievedEmails:[],
    sentEmails:[],
    unreadEmails:0,
    recievedEmailsClone:[],
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
            // console.log(state.unreadEmails);
        },
        setRecievedEmailsClone(state,action){
            state.recievedEmailsClone = action.payload;
            // console.log(state.recievedEmailsClone);
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

            state.recievedEmails = state.recievedEmails.filter((email:Email )=> email._id!==action.payload)
        
        }

    }

})

 