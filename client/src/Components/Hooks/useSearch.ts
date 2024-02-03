import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { emailActions } from "../Context/store";
import { Email } from "../Context/email";
const useSearch = (emailList : Email [] , searchInput:string) =>{
    const dispatch = useDispatch();
    // console.log(emailList)
    useEffect(() =>{
        const timer = setTimeout(() =>{

            const searchResults = emailList.filter((element:Email) => {
                // return element.senderName.toLowerCase().includes(searchInput.toLowerCase())
                // || element.sender.toLowerCase().includes(searchInput.toLowerCase());
                return '';
            })
            // console.log(searchResults);
            dispatch(emailActions.setreceivedEmails(searchResults));
            return () => {
                clearTimeout(timer);
            }
        },300)
    },[searchInput])
}
export default useSearch;