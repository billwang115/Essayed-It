import styles from './InputBox.module.css';
import React, { useState } from 'react';


function InputBox(props) {

  function cancelEdit(){
    props.cancelEditCallback();
  }

  return (
    <div className = {styles.BoxContainer}>
      <h3 className = {styles.Title}> Add new comment to highlighted text</h3>
      <textarea className = {styles.textInput} />
      <div className = {styles.buttonsContainer}>
        <button className = {styles.buttons}> Add Comment </button>
        <button onClick = {cancelEdit} className = {styles.buttons}> Cancel </button>
      </div>
    </div>
  );
}

export default InputBox;
