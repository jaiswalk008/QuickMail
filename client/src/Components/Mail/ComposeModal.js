import { useRef, useState } from "react";
import TextEditor from "./Editor";
import axios from "axios";
import {useSelector} from 'react-redux';
const ComposeModal = () => {
  const recipentRef = useRef('');
  const subjectRef = useRef('');
  const [body, setBody] = useState('');
  const {token} = useSelector(state=>state.auth);
  const bodyHandler = (text) => {
    setBody(text);
  };

  const sendEmailHandler = async() => {
    console.log(recipentRef.current.value);
    const recipientEmail = recipentRef.current.value;

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (recipientEmail && !(recipientEmail.split('').includes('@'))) {
        // Display an alert for invalid email format
        alert('Invalid email format. Please enter a valid email address.');
        return;
    }
    const emailDetails = {
        sender:"jaiskaran008@gmail.com",reciever:recipentRef.current.value
        ,subject:subjectRef.current.value,
        body:body
    }
    try {
        const res = await axios.post('http://localhost:4000/send',emailDetails,{
          headers:{'Authorization':token}
        });
        console.log(res);
        document.querySelector('.btn-close').click();
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div className="modal fade" id="composeModal" tabIndex="-1" aria-labelledby="composeModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-xl">
        <div className="modal-content" style={{ height: "500px" }}>
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="composeModalLabel">
              New Message
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <input ref={recipentRef} required type="text" id="recipent" placeholder="Recipent" /><br />
            <input ref={subjectRef} required type="text" className="w-90 mt-2" id="subject" placeholder="Subject" />

            <TextEditor onChangeHandler={bodyHandler} />

          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-dark" data-bs-dismiss="modal">
              🗑️
            </button>
            <button type="button" onClick={sendEmailHandler} className="btn btn-primary">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeModal;
