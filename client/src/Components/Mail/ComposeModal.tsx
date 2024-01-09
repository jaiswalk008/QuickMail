import { useCallback, useRef, useState } from "react";
// import TextEditor from "./Editor";
import axios from "axios";
import {useSelector} from 'react-redux';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

const ComposeModal = () => {
  const recipentRef = useRef<any>('');
  // const [body, setBody] = useState<string>('');
  const subjectRef = useRef<any>('');
  const {token} = useSelector((state:any)=>state.auth);

  const [editorState, setEditorState] = useState(() =>
      EditorState.createEmpty()
    );
    const contentState = editorState.getCurrentContent();
    const htmlContent = draftToHtml(convertToRaw(contentState));
    const onEditorStateChange = (newEditorState:any) => {
      setEditorState(newEditorState);
      // bodyRef.current.value = htmlContent;
    };
    const reset = () => {
      recipentRef.current.value='';
      subjectRef.current.value='';
      setEditorState(EditorState.createEmpty());
    }
  const sendEmailHandler = useCallback(async() => {
    console.log(recipentRef.current);
    const recipientEmail = recipentRef.current.value;

    if (recipientEmail && !(recipientEmail.split('').includes('@'))) {
        // Display an alert for invalid email format
        alert('Invalid email format. Please enter a valid email address.');
        return;
    }
    const emailDetails = {
        reciever:recipentRef.current.value,
        subject:subjectRef.current.value,
        body:htmlContent
    }
    console.log(emailDetails);
    try {
        const res = await axios.post('http://localhost:4000/send',emailDetails,{
          headers:{'Authorization':token}
        });
        console.log(res);
        const closeBtn= document.querySelector('.btn-close') as HTMLButtonElement;
        closeBtn.click();
        reset();
    } catch (error) {
        console.log(error)
    }
  },[token])

  return (
    <div className="modal fade" id="composeModal" tabIndex={-1} aria-labelledby="composeModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-xl">
        <div className="modal-content" style={{ height: "550px" }}>
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="composeModalLabel">
              New Message
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <input ref={recipentRef} required type="text" id="recipent" placeholder="Recipent" /><br />
            <input ref={subjectRef} required type="text" className="w-90 mt-2" id="subject" placeholder="Subject" />

            <Editor
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              wrapperStyle={{ maxHeight: '350px', overflowY: 'auto' }}
              toolbarStyle= {{height:'100px'}}
              editorStyle={{ height: '200px', backgroundColor: '#ebebeb', border: '1px solid grey' }}
            />

          </div>

          <div className="modal-footer">
            <button type="button" onClick={reset} className="btn btn-dark" data-bs-dismiss="modal">
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
