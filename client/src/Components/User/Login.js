import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Input from "../UI/Input";
import './User.css';
import axios from "axios";
import { useDispatch } from "react-redux";
import {authActions} from '../Context/store';
const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errorMessage , setErrorMessage] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    const emailChangeHandler = (event) => setEmail(event.target.value);
    const passwordChangeHandler = (event) => setPassword(event.target.value);

    const formSubmitHandler = useCallback(async (e) =>{
        e.preventDefault();
        const userDetails = {
            email:email,
            password:password,
        }
        
        try{
            const res = await axios.post('http://localhost:4000/login',userDetails);
            console.log(res.data);
            console.log(authActions);
            dispatch(authActions.addToken(res.data.token));
            history.push('/mail');
        }
        catch(err){
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
                   <Input id="name" value={password} label="Password" type="password" onChange={passwordChangeHandler} />
                    <button className="btn mt-2 w-100 btn-primary">Login</button>
                </form>
            </div>
        </div>
    )
}
export default Login;