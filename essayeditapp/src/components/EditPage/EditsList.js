import styles from './EditsList.module.css';
import React, { useState } from 'react';
import Annotation from "./Annotation";


function EditsList(props) {

  function removeEdit(index){

    const editObject = props.editsArray[index].EditObject;
    props.removeEditCallback(editObject, index);
  }

  function changeEdit(index){
      const editObject = props.editsArray[index];
      props.changeEditCallback(editObject);
  }

  return (
    <div className = {styles.BoxContainer}>
      {props.editsArray.map((edit, index) => <Annotation key={index} deleteEditCallback = {removeEdit} changeEditCallback = {changeEdit} editItem = {edit} index = {index}/>)}
    </div>
  );
}

export default EditsList;
