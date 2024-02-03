import { createSlice } from "@reduxjs/toolkit";

export type Email = {
    _id: string;
    subject: string;
    sender: string;
    bodyHtml:string,
    senderName:string,
    senderId:string,
    isRead: boolean;
    receiverId:string;
};

const initialEmailState: {receivedEmails:Email [] , sentEmails:Email [] ,   unreadEmails:number , receivedEmailsClone:Email [] } = {
    receivedEmails:[],
    sentEmails:[],
    unreadEmails:0,
    receivedEmailsClone:[],
}

export const emailSlice = createSlice({
    name:"email",
    initialState:initialEmailState,
    reducers:{
        setreceivedEmails(state,action){
            state.receivedEmails = action.payload;
            state.unreadEmails = action.payload.reduce((acc:number  , curr:{isRead:boolean}) =>{
                return curr.isRead === false ? acc + 1 : acc;
            },0);

        },
        setreceivedEmailsClone(state,action){
            state.receivedEmailsClone = action.payload;
            // console.log(state.receivedEmailsClone);
        },
        setSentEmails(state,action){
            state.sentEmails = action.payload;
           
        },
        addToSentEmail(state,action){
            state.sentEmails.unshift(action.payload);
        },

        markEmailAsRead(state,action){
            state.receivedEmails.forEach((email) =>{
                if(email._id === action.payload){
                    email.isRead = true;
                }
            })
            state.unreadEmails--;
            
        },
        deleteEmail(state,action){
            if(action.payload.type==='received') state.receivedEmails = state.receivedEmails.filter((email:Email )=> email._id!==action.payload.id)
            else state.sentEmails = state.sentEmails.filter((email:Email )=> email._id!==action.payload.id)
        
        }

    }

})
