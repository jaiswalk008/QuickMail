import { useState } from "react";
import { Link } from "react-router-dom/";

const MailHeader = () =>{
    const [searchInput , setSearchInput] = useState<string>('');
    const searchInputHandler= (e:any) => setSearchInput(e.target.value);
    return (
        <nav className="navbar bg-dark justify-content-start">
        <Link className="home-link" to='/mail'><h2>QuickMail</h2></Link>
   
        <div className="search-container">
            <input
                id="search"
                type="text"
                autoComplete="off"
                placeholder="Search"
                className="form-control-lg"
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
        
    </nav>
    )
}
export default MailHeader;