import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { emailActions } from "../Context/store";

const useFetch = (url:string, token:string , type:string) => {
    const dispatch = useDispatch();
    useEffect(()=>{

        const fetchdata = async () =>{
            try{
                const res = await axios.get(url,{headers:{'Authorization':token}});
                console.log(res);
                // const result = useMemo(() => res.data , [res.data])
                // setData(res.data);
    
                if(type==='recieved') {
                    const reversedData = res.data.reverse();
                    dispatch(emailActions.setRecievedEmails(reversedData));
                    dispatch(emailActions.setRecievedEmailsClone(reversedData));

                }
                else dispatch(emailActions.setSentEmails(res.data.reverse()));
            }catch(err:any){
              
                console.log(err);
            }
        
        }
        fetchdata();
        // const interval = setInterval(() =>{
        //     fetchdata();
        // },2000);
        // return () => clearInterval(interval)
    },[url,token,type])
    return ;
}
export default useFetch;