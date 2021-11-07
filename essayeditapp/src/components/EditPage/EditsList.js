import styles from './EditsList.module.css';
import React, { useState } from 'react';
import Annotation from "./Annotation";


function EditsList(props) {

  function removeEdit(index){

    const editObject = props.editsArray[index].EditObject;
    props.removeEditCallback(editObject, index);
  }


  return (
    <div className = {styles.BoxContainer}>
      {props.editsArray.map((edit, index) => <Annotation key={index} deleteEditCallback = {removeEdit} editItem = {edit} index = {index}/>)}
    </div>
  );
}

export default EditsList;
