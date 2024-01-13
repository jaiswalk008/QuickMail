import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { emailActions } from "../Context/store";
const useFetch = (url:string, token:string , type:string) => {
    const dispatch = useDispatch();
    const fetchdata = useCallback(async () =>{
        try{
            const res = await axios.get(url,{headers:{'Authorization':token}});
            console.log(res);
            // const result = useMemo(() => res.data , [res.data])
            // setData(res.data);

            if(type==='recieved') dispatch(emailActions.setRecievedEmails(res.data.reverse()));
            else dispatch(emailActions.setSentEmails(res.data.reverse()));
        }catch(err:any){
            // setError(err.response.data.message);
            console.log(err);
        }
    
    },[dispatch,url, type,token])
    useEffect(()=>{
        
        fetchdata();
    },[url,token,type,fetchdata])
    return ;
}
export default useFetch;