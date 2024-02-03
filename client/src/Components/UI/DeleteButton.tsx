import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { emailActions } from "../Context/store";
import '../Mail/Inbox.css';
import axios from "axios";
const DeleteButton = (props:{id:string , type:string }) =>{
    const dispatch = useDispatch();
    const deleteHandler = useCallback( async (id:string ,type:string) =>{
        dispatch(emailActions.deleteEmail({id,type}));
        try{
            await axios.delete('http://localhost:4000/mail/'+id,{
                headers:{Authorization:localStorage.getItem('token')}
            });
        }
        catch(err){console.log(err)}
    },[dispatch])

    return (
        <button onClick={(e) => {
            e.stopPropagation();
            deleteHandler(props.id,props.type)}} className='btn btn-dark'><i className="bi text-white bi-trash"></i>
        </button>
    )
}
export default DeleteButton