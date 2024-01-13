import { Email } from "../Context/email";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { emailActions } from "../Context/store";
const useSearch = (emailList : Email [] , searchInput:string) =>{
    const dispatch = useDispatch();

    useEffect(() =>{
        const timer = setTimeout(() =>{

            const searchResults = emailList.filter((element:Email) => {
                return element.senderName.toLowerCase().includes(searchInput.toLowerCase())
                || element.bodyText.toLowerCase().includes(searchInput.toLowerCase())
                || element.sender.toLowerCase().includes(searchInput.toLowerCase());
                
            })
            dispatch(emailActions.setRecievedEmails(searchResults));
            return () => {
                clearTimeout(timer);
            }
        },300)
    },[searchInput])
}
export default useSearch;