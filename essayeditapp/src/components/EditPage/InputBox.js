import styles from './InputBox.module.css';
import React, { useState } from 'react';


function InputBox(props) {

  function cancelEdit(){
    props.cancelEditCallback();
  }

  function saveEdit(commentText){
    props.saveEditCallback(commentText);
  }

  function saveChangedEdit(commentText){
    props.saveChangedEditCallback(commentText);
  }

  function cancelChangedEdit(){
    props.cancelChangedEditCallback();
  }
  return (
    <div className = {styles.BoxContainer}>
      <h3 className = {styles.Title}> {props.Header}</h3>
      <textarea defaultValue = {props.defaultValue} id = "textarea" className = {styles.textInput} />
      <div className = {styles.buttonsContainer}>
        {props.newInputBool ? <button onClick = {() => saveEdit(document.getElementById("textarea").value)} className = {styles.buttons}> Add Comment </button>
        :<button onClick = {() => saveChangedEdit(document.getElementById("textarea").value)} className = {styles.buttons}> Change Comment </button>}

        {props.newInputBool ? <button onClick = {cancelEdit} className = {styles.buttons}> Cancel </button> : <button onClick = {cancelChangedEdit} className = {styles.buttons}> Cancel </button>}
      </div>
    </div>
  );
}

export default InputBox;
