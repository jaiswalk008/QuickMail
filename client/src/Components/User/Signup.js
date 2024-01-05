import { useState } from "react";
import Input from "../UI/Input";
import './User.css';

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Signup = () =>{

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [errorMessage , setErrorMessage] = useState('');
    const nameChangeHandler = (event) => setName(event.target.value);
    const emailChangeHandler = (event) => setEmail(event.target.value);
    const passwordChangeHandler = (event) => setPassword(event.target.value);
    const confirmPasswordChangeHandler = (event) => setConfirmPassword(event.target.value);

    const formSubmitHandler = async (e) =>{
        e.preventDefault();
        const userDetails = {
            name:name,
            email:email,
            password:password,
        }
        if(password !== confirmPassword){
            setErrorMessage("Passwords do not match");
            return;
        }
        try{
            const res = await axios.post('http://localhost:4000/signup',userDetails);
            console.log(res.data);
        }
        catch(err){
            setErrorMessage(err.response.data.message);
        }

    }
    return (
        <div className='main-container'>
            <div className='form-container'>
                <h3>Signup</h3>
                {errorMessage.length>0 && <p className="message-alert">{errorMessage}</p>}
                <form onSubmit={formSubmitHandler}>
                   <Input id="name" value={name} label="Name" type="text" onChange={nameChangeHandler} />
                   <Input id="name" value={email} label="Email" type="email" onChange={emailChangeHandler} />
                   <Input id="name" value={password} label="Password" type="password" onChange={passwordChangeHandler} />
                   <Input id="name" value={confirmPassword} label="Confirm Password" type="password" onChange={confirmPasswordChangeHandler} />
                    <button className="btn mt-2 w-100 btn-primary">Signup</button>
                </form>
            </div>
        </div>
    )
}
export default Signup;