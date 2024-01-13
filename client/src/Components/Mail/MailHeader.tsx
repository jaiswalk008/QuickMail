import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom/";
import { useDispatch, useSelector } from "react-redux";
import { authActions, emailActions } from "../Context/store";
import { Email } from "../Context/email";
import useSearch from "../Hooks/useSearch";

const MailHeader = () =>{
    const [searchInput , setSearchInput] = useState<string>('');
    const searchInputHandler= (e:any) => setSearchInput(e.target.value);
    const dispatch = useDispatch();
    const history = useHistory();
    const {recievedEmails} = useSelector((state:any) => state.email);
    //creating emailList using useMemo so that recievedEmails doesnot changes
    const emailList = useMemo(() => recievedEmails,[]);
    
    useSearch(emailList , searchInput);
    const logoutHandler = useCallback(()=>{
        dispatch(authActions.logout());
        history.push('/login');
    },[dispatch,history])
    
    return (
        <nav className="navbar bg-dark justify-content-around">
        <Link className="home-link navbar-brand" to='/inbox'><h2>QuickMail</h2></Link>
   
        < div className="d-flex justify-content-end">
            <div className="search-container">
                <input
                    id="search"
                    type="text"
                    autoComplete="off"
                    placeholder="Search"
                    className="form-control-lg login text-white"
                    value={searchInput}
                    onChange={searchInputHandler}
                    
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
            </div>
            
            <button onClick={logoutHandler} className="btn btn-primary ms-3">Logout</button>
        
        </div>

        
    </nav>
    )
}
export default MailHeader;