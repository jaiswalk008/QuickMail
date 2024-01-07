import React, {useEffect, useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

const TextEditor = (props) => {
    const [editorState, setEditorState] = useState(() =>
      EditorState.createEmpty()
    );
    const contentState = editorState.getCurrentContent();
    const htmlContent = draftToHtml(convertToRaw(contentState));
    
    useEffect(()=>{
      const timer = setTimeout(() =>{
        props.onChangeHandler(htmlContent);
      },1000);
      return () =>{
        clearTimeout(timer);
      }
    },[editorState,htmlContent,props]);
    const onEditorStateChange = (newEditorState) => {
      setEditorState(newEditorState);
    };
    
    return (
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperStyle={{ maxHeight: '250px', overflowY: 'auto' }}
        toolbarStyle= {{height:'100px'}}
        editorStyle={{ minHeight: '150px', backgroundColor: '#ebebeb', border: '1px solid grey' }}
      />
    );
  };
  

  export default  TextEditor;