import styles from './EditsList.module.css';
import React, { useState } from 'react';
import Annotation from "./Annotation";


function EditsList(props) {



  return (
    <div className = {styles.BoxContainer}>
      {props.editsArray.map((edit, index) => <Annotation key={index} editItem = {edit} />)}
      {console.log("here")}
    </div>
  );
}

export default EditsList;
