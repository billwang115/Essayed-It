import styles from './EditPage.module.css';
import React, { useState } from 'react';
import InputBox from "./InputBox";
import EditsList from "./EditsList";


const lorumIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum elementum risus non ligula pharetra interdum. Mauris in accumsan ex. Aenean neque nisl, dignissim et felis sed, feugiat tristique augue. Maecenas nunc purus, pulvinar porta mi in, sodales tincidunt ligula. Duis auctor risus eget dictum cursus. Nullam vitae mattis lectus. Praesent porta, lorem vitae rutrum laoreet, lorem nunc fermentum orci, eget volutpat eros enim sed tellus. Aenean sit amet lacinia sem.

Donec vulputate nulla id justo ultrices varius. Mauris mattis bibendum dolor, quis consequat libero venenatis vel. Maecenas at posuere enim. Etiam aliquam rutrum pretium. Phasellus vehicula commodo tortor vel ultrices. Donec vel venenatis metus. Cras vel congue eros, vel malesuada libero. Nam auctor, nibh et dapibus vehicula, nisl tortor rhoncus lectus, quis ornare ex lectus sit amet ante. Praesent sit amet augue quam. Morbi imperdiet diam eget pharetra viverra. Aliquam ac lacus est. Integer fermentum quis quam sed malesuada. Donec finibus ligula a vestibulum lobortis.

Sed ac dolor consectetur, condimentum elit a, vestibulum risus. Nunc ut diam id diam semper finibus quis in dui. Donec mi leo, feugiat vitae nibh vel, porta euismod sem. Aenean pellentesque arcu suscipit vehicula bibendum. Fusce feugiat id odio sed consequat. Phasellus sodales sem eget purus pharetra, eu dignissim nulla fringilla. Proin et felis pharetra, mollis dui sed, consectetur ex. Duis porttitor vulputate velit, id consectetur nunc. Suspendisse cursus accumsan condimentum. Curabitur id aliquam ipsum. Vestibulum rhoncus rutrum nisi, ut commodo sem blandit maximus.

Morbi lacinia arcu mi, facilisis gravida dolor faucibus sed. Mauris feugiat elit sed elit varius fermentum. In a mauris lectus. Donec tempus mollis diam, efficitur gravida lorem posuere non. Phasellus consectetur nec nulla sit amet sagittis. Nam mi erat, tincidunt a facilisis sit amet, dictum ut ipsum. Suspendisse posuere ligula a lectus gravida, convallis blandit neque dapibus. Nunc semper eget nibh vel lacinia. Aenean volutpat hendrerit lacus non pretium. Nulla eget tellus mauris. Aenean pulvinar nulla non turpis varius lobortis. In imperdiet ex eu massa tincidunt pretium.

Morbi convallis neque sit amet ante tempor, quis lacinia arcu sagittis. In hac habitasse platea dictumst. Maecenas condimentum elit sed sem efficitur lacinia. Suspendisse sit amet imperdiet erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin nec ultrices dolor. Praesent eu neque fermentum, blandit massa a, blandit diam. Donec congue, neque in vestibulum tincidunt, nisi urna dapibus eros, vel aliquet enim nisl id risus.  \n\n\n   The ability to add annotations will be within the textarea itself rather than have a button on the side.`;



function EditPage() {
  const [toggleAddEdit, setToggleAddEdit] = useState(false);
  const [addButton, setaddButton] = useState(false);
  const [currentlyEditing, setCurrentlyEditing] = useState(false);

  const [currentlySelected, setCurrentlySelected] = useState("");
  const [editsArray, setEditsArray] = useState([]);
  const [currentEditObject, setcurrentEditObject] = useState(null);

  const [currentHighlightIndex, setCurrentHighlightIndex] = useState(0);

  const highlightColors = ["#FDFD6A", "#97FD6A", "#6AB4FD", "#FF8BF1", "#FFDB7A", "#9D83FF", "#FF839F"];


  function checkRange(initalRange, newRange) {
    return;
  }

  function onClickInTextArea() {
    if (currentlyEditing) {
      return;
    }
    const sel = window.getSelection();
    if (sel.toString() !== "") {
      setaddButton(true);
      return;
    }
    if (addButton) {
      setaddButton(false);
    }
  }

  function addNewEdit() {
    setCurrentlyEditing(true);
    setToggleAddEdit(true);

    const sel = window.getSelection();
    if (sel.toString() !== "") {
      let previous_text = sel.toString();
      let range = sel.getRangeAt(0).cloneRange();
      const color = highlightColors[currentHighlightIndex];

      const span = document.createElement("span");
      span.classList.add(styles.highlightedText);
      span.style = "--color: " + color;
      range.surroundContents(span);
      sel.removeAllRanges();
      sel.addRange(range);

      const EditObject = {
        previous_text: previous_text,
        curr_range: range,
        highlight_color: color
      };
      setcurrentEditObject(EditObject);

    }
  }

  function cancelEditCallback() {
    setCurrentlyEditing(false);
    setaddButton(false);
    setToggleAddEdit(false);

    //TODO: Get canceling and deletion of edits working correctly
    currentEditObject.curr_range.detach();
    const old_text = new Range();
    old_text.selectNodeContents(document.createTextNode(currentEditObject.previous_text));
    old_text.setStart(currentEditObject.curr_range.startContainer, currentEditObject.curr_range.startOffset);
    old_text.setEnd(currentEditObject.curr_range.endContainer, currentEditObject.curr_range.endOffset);
    console.log(old_text);

    // currentEditObject.previous_range.setStart(currentEditObject.curr_range.startContainer, currentEditObject.curr_range.startOffset);
    // currentEditObject.previous_range.setEnd(currentEditObject.curr_range.endContainer, currentEditObject.curr_range.endOffset);
  }

  function saveEditCallback(commentText){

      const new_edit = {
        EditObject: currentEditObject,
        comment: commentText
      };
      editsArray.push(new_edit);
      if (currentHighlightIndex == highlightColors.length - 1) {
        setCurrentHighlightIndex(0);
      } else {setCurrentHighlightIndex(currentHighlightIndex + 1)}

      setCurrentlyEditing(false);
      setaddButton(false);
      setToggleAddEdit(false);
  }

  return (
    <div className={styles.Page}>
      <div className={styles.PageContents}>
        {addButton ?
          (toggleAddEdit ? <InputBox cancelEditCallback = {cancelEditCallback} saveEditCallback = {saveEditCallback}/> : <div className = {styles.Instructions}><h2>Highlight text to add a comment</h2> <button onClick = {addNewEdit}> Add Comment </button></div>)
          : <div className = {styles.Instructions}><h2>
            Highlight text to add a comment</h2> </div>
           }
        <div>
          <div className={styles.EssayBox} onMouseUp={onClickInTextArea} ><p> {lorumIpsum}</p> </div>
        </div>

        <div className={styles.Edits}>
          <EditsList editsArray = {editsArray}/>
          <div><button className={styles.SubmitButton}>Submit Edits</button></div>
        </div>



      </div>
    </div>

  );
}

export default EditPage;
