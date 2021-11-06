import styles from './Annotation.module.css';
import React, { useState } from 'react';


function highLightText(){

}

function Annotation(props) {
  return (
    <div className={styles.Annotation}>
      <h3>{props.editItem.comment}
      </h3>
      <h6 style = {{"--color": props.editItem.EditObject.highlight_color}} className = {styles.Quoted}> "{props.editItem.EditObject.previous_text}"</h6>


      <button> Change </button> <button> Remove </button>
    </div>

  );
}

export default Annotation;
