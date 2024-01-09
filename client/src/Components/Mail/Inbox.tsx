import './Inbox.css';
const Inbox=(props:any) =>{
    return (
        <div className=" bg-dark inbox-container p-1 d-flex justify-content-around">
            <span className="sender-name">{props.senderName}</span>
            <span>
                <strong className="me-4">{props.subject}</strong>
                <span className="truncate-text">{props.body}</span>
            </span>
            <hr/>
        </div>
    )
}
export default Inbox;