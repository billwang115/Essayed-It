import styles from './Annotation.module.css';
import React, { useState } from 'react';




function Annotation(props) {

  function removeText(){

    props.deleteEditCallback(props.index);
  }

  function changeEdit(){
    props.changeEditCallback(props.index);
  }

  return (
    <div className={styles.Annotation}>
      <h3>{props.editItem.comment}
      </h3>
      <h6><span style = {{"--color": props.editItem.EditObject.highlight_color}} className = {styles.Quoted}> "{props.editItem.EditObject.previous_text}"</span></h6>

    
    </div>

  );
}

export default Annotation;
