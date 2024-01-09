import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom/";
import Input from "../UI/Input";
import './User.css';
import axios from "axios";
import { useDispatch } from "react-redux";
import {authActions} from '../Context/store';
const Login = () => {
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [errorMessage , setErrorMessage] = useState<string>('');
    const history = useHistory();
    const dispatch = useDispatch();
    const emailChangeHandler = (event:any) => setEmail(event.target.value);
    const passwordChangeHandler = (event:any) => setPassword(event.target.value);

    const formSubmitHandler = useCallback(async (e:any) =>{
        e.preventDefault();
        const userDetails :{email:string,password:string} = {
            email:email,
            password:password,
        }
        
        try{
            const res = await axios.post('http://localhost:4000/login',userDetails);
            console.log(res.data);
            console.log(authActions);
            dispatch(authActions.addToken(res.data.token));
            history.push('/inbox');
        }
        catch(err:any){
            console.log(err);
            setErrorMessage(err.response.data.message);
        }

    },[email,password,history,dispatch])
    return (
        <div className='main-container'>
            <div className='form-container'>
                <h3>Login</h3>
                {errorMessage.length>0 && <p className="message-alert">{errorMessage}</p>}
                <form onSubmit={formSubmitHandler}>
                   
                   <Input id="name" value={email} label="Email" type="email" onChange={emailChangeHandler} />
                   <Input id="password" value={password} label="Password" type="password" onChange={passwordChangeHandler} />
                    <button className="btn mt-2 w-100 btn-primary">Login</button>
                </form>
            </div>
        </div>
    )
}
export default Login;