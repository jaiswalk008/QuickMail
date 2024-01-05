
const Input = (props) =>{
    return (
        <>
        <label className="form-label" htmlFor={props.id}>{props.label}</label>
        <input required className="form-control" placeholder={props.placeholder? props.placeholder : ""} type={props.type} value={props.value} onChange={props.onChange}
         id={props.id} name={props.id}/>
        </>
    )
}
export default Input;