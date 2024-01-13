import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { emailActions } from "../Context/store";
import '../Mail/Inbox.css';
import axios from "axios";
const DeleteButton = (props:{id:string , type:string}) =>{
    const dispatch = useDispatch();
    const deleteHandler = useCallback( async (id:string , type:string) =>{
        console.log(type);
        dispatch(emailActions.deleteEmail({id:id , type:type}));
        try{
            if(type==='recieved') await axios.delete('http://localhost:4000/delete-recieved-email/'+id);
            else await axios.delete('http://localhost:4000/delete-sent-email/'+id);
        }
        catch(err){console.log(err)}
    },[dispatch,props.id])

    return (
        <button onClick={(e) => {
            e.stopPropagation();
            deleteHandler(props.id , props.type)}} className='btn btn-dark'><i className="bi text-white bi-trash"></i>
            </button>
    )
}
export default DeleteButton