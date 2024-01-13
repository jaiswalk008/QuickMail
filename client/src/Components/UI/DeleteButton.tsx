import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { emailActions } from "../Context/store";
import '../Mail/Inbox.css';
import axios from "axios";
const DeleteButton = (props:{id:string }) =>{
    const dispatch = useDispatch();
    const deleteHandler = useCallback( async (id:string) =>{
        dispatch(emailActions.deleteEmail(id));
        try{
            await axios.delete('http://localhost:4000/delete-email/'+id);
        }
        catch(err){console.log(err)}
    },[dispatch])

    return (
        <button onClick={(e) => {
            e.stopPropagation();
            deleteHandler(props.id)}} className='btn btn-dark'><i className="bi text-white bi-trash"></i>
        </button>
    )
}
export default DeleteButton