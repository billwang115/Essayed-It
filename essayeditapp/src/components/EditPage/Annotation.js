import styles from './Annotation.module.css';
import React, { useState } from 'react';




function Annotation(props) {
  return (
    <div className={styles.Annotation}>
      <h3>{props.editItem.comment}
      </h3>
      <button> Change </button> <button> Remove </button>
    </div>

  );
}

export default Annotation;
