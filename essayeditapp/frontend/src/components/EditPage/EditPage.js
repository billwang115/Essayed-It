import styles from './EditPage.module.css';
import React, {useState} from 'react';
import InputBox from "./InputBox";
import EditsList from "./EditsList";
import {NavLink} from "react-router-dom";
import {useLocation} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

import ENV from '../../config.js'
const API_HOST = ENV.api_host
//This Essay
// const lorumIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum elementum risus non ligula pharetra interdum. Mauris in accumsan ex. Aenean neque nisl, dignissim et felis sed, feugiat tristique augue. Maecenas nunc purus, pulvinar porta mi in, sodales tincidunt ligula. Duis auctor risus eget dictum cursus. Nullam vitae mattis lectus. Praesent porta, lorem vitae rutrum laoreet, lorem nunc fermentum orci, eget volutpat eros enim sed tellus. Aenean sit amet lacinia sem.
//
// Donec vulputate nulla id justo ultrices varius. Mauris mattis bibendum dolor, quis consequat libero venenatis vel. Maecenas at posuere enim. Etiam aliquam rutrum pretium. Phasellus vehicula commodo tortor vel ultrices. Donec vel venenatis metus. Cras vel congue eros, vel malesuada libero. Nam auctor, nibh et dapibus vehicula, nisl tortor rhoncus lectus, quis ornare ex lectus sit amet ante. Praesent sit amet augue quam. Morbi imperdiet diam eget pharetra viverra. Aliquam ac lacus est. Integer fermentum quis quam sed malesuada. Donec finibus ligula a vestibulum lobortis.
//
// Sed ac dolor consectetur, condimentum elit a, vestibulum risus. Nunc ut diam id diam semper finibus quis in dui. Donec mi leo, feugiat vitae nibh vel, porta euismod sem. Aenean pellentesque arcu suscipit vehicula bibendum. Fusce feugiat id odio sed consequat. Phasellus sodales sem eget purus pharetra, eu dignissim nulla fringilla. Proin et felis pharetra, mollis dui sed, consectetur ex. Duis porttitor vulputate velit, id consectetur nunc. Suspendisse cursus accumsan condimentum. Curabitur id aliquam ipsum. Vestibulum rhoncus rutrum nisi, ut commodo sem blandit maximus.
//
// Morbi lacinia arcu mi, facilisis gravida dolor faucibus sed. Mauris feugiat elit sed elit varius fermentum. In a mauris lectus. Donec tempus mollis diam, efficitur gravida lorem posuere non. Phasellus consectetur nec nulla sit amet sagittis. Nam mi erat, tincidunt a facilisis sit amet, dictum ut ipsum. Suspendisse posuere ligula a lectus gravida, convallis blandit neque dapibus. Nunc semper eget nibh vel lacinia. Aenean volutpat hendrerit lacus non pretium. Nulla eget tellus mauris. Aenean pulvinar nulla non turpis varius lobortis. In imperdiet ex eu massa tincidunt pretium.
//
// Morbi convallis neque sit amet ante tempor, quis lacinia arcu sagittis. In hac habitasse platea dictumst. Maecenas condimentum elit sed sem efficitur lacinia. Suspendisse sit amet imperdiet erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin nec ultrices dolor. Praesent eu neque fermentum, blandit massa a, blandit diam. Donec congue, neque in vestibulum tincidunt, nisi urna dapibus eros, vel aliquet enim nisl id risus. `;

function EditPage() {
  const {currentUser} = useContext(AuthContext);
  const [toggleAddEdit, setToggleAddEdit] = useState(false);
  const [addButton, setaddButton] = useState(false);
  const [currentlyEditing, setCurrentlyEditing] = useState(false);

  const [currentlySelected, setCurrentlySelected] = useState("");
  const [editsArray, setEditsArray] = useState([]);
  const [currentEditObject, setcurrentEditObject] = useState(null);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const [lastSelectedText, setLastSelectedText] = useState(null);

  const [currentHighlightIndex, setCurrentHighlightIndex] = useState(0);

  const [inputBoxHeader, setInputBoxHeader] = useState("Add new comment to highlighted text");
  const [inputBoxDefault, setInputBoxDefault] = useState("");
  const [newInputBool, setNewInputBool] = useState(true);
  const [changingEditObject, setChangingEditObject] = useState(null);
  const [essayData, setEssayData] = useState(null);

  const highlightColors = [
    "#FDFD6A",
    "#97FD6A",
    "#6AB4FD",
    "#FF8BF1",
    "#FFDB7A",
    "#9D83FF",
    "#FF839F"
  ];


  const location = useLocation();
  React.useEffect(() => getEssay(), []) //Will only run once, on the first render
  //This function will handle the server call to load in the correct essay into the essay editor
  function getEssay(){
    const url = `${API_HOST}/api/essays/${location.state.essayID}`;
    console.log(url)
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not get Essay");
            }
        })
        .then(json => {
            setEssayData(json)

        })
        .catch(error => {
            console.log(error);
        });

  }

  function checkRange(initialRange, newRange) {
    if (initialRange.compareBoundaryPoints(Range.START_TO_START) == initialRange.compareBoundaryPoints(Range.START_TO_END)) {
      return true;
    }
    if (initialRange.compareBoundaryPoints(Range.END_TO_START) !== initialRange.compareBoundaryPoints(Range.END_TO_END)) {
      return true;
    }
    return false;
  }

  function onClickInTextArea() {
    if (currentlyEditing) {
      return;
    }
    setDisplayErrorMessage(false);

    const sel = window.getSelection();
    if (sel.toString() !== "" && sel.baseNode.parentNode.parentNode.id == "textarea") {
      setLastSelectedText(sel.toString());
      setaddButton(true);
      return;
    }
    if (addButton) {
      setaddButton(false);
    }
  }


  function saveDBChanges(){
    console.log("Saving edits to database..")

   const url = `${API_HOST}/api/essays/${location.state.essayID}`;

   for (const edit of editsArray){
     const json_set = {edit_comment: edit.comment, assosiated_text: edit.EditObject.previous_text}
     const request = new Request(url, {
         method: "post",
         body: JSON.stringify(json_set),
         headers: {
             Accept: "application/json, text/plain, */*",
             "Content-Type": "application/json"
         }
     });

     fetch(request)
         .then(function (res) {
             if (res.status === 200) {
                 console.log("Successfully added edits")
                 updateEssayEditor()
                 }
             else {
                 console.log("Failed to add essay")
                }
         })
         .catch(error => {
             console.log(error);
         });
       }


  }

  function updateEssayEditor(){
       console.log("Updating essay to have new editor")
       const url = `${API_HOST}/api/essays/${location.state.essayID}`;
       const json_set = { editor: currentUser, status: "COMPLETED"}
       const request = new Request(url, {
           method: "put",
           body: JSON.stringify(json_set),
           headers: {
               Accept: "application/json, text/plain, */*",
               "Content-Type": "application/json"
           }
       });

       fetch(request)
           .then(function (res) {
               if (res.status === 200) {
                   console.log("Successfully added editor")
                   addEssayToEditor()
                }
               else {
                   console.log("Failed to add editor")

                  }
           })
           .catch(error => {
               console.log(error);
           });

  }

  function addEssayToEditor(){
    const url = `${API_HOST}/api/users/${currentUser}`;
    const json_set = essayData;
    const request = new Request(url, {
        method: "put",
        body: JSON.stringify(json_set),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                console.log("Successfully added essay to editor List")
             }
            else {
                console.log("Failed to add essay to editor List")

               }
        })
        .catch(error => {
            console.log(error);
        });



  }



  function addNewEdit() {
    setCurrentlyEditing(true);
    setToggleAddEdit(true);
    setNewInputBool(true);
    setInputBoxDefault("");
    setInputBoxHeader("Add new comment to highlighted text");
    const sel = window.getSelection();
    if (sel.toString() == "") {
      setCurrentlyEditing(false);
      setToggleAddEdit(false);
      setaddButton(false);
      return;
    }
    if (sel.toString() !== "") {
      let previous_text = sel.toString();
      let range = sel.getRangeAt(0).cloneRange();
      const color = highlightColors[currentHighlightIndex];

      const span = document.createElement("span");
      span.classList.add(styles.highlightedText);
      span.style = "--color: " + color;
      try {
        range.surroundContents(span);
        sel.removeAllRanges();
        sel.addRange(range);
      } catch  {
        console.log("Error, overlap");
        setCurrentlyEditing(false);
        setaddButton(false);
        setToggleAddEdit(false);
        setDisplayErrorMessage(true);
        return;
      }
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

    currentEditObject.curr_range.deleteContents();
    const newRange = currentEditObject.curr_range.cloneRange();
    newRange.insertNode(document.createTextNode(currentEditObject.previous_text));
  }

  function saveEditCallback(commentText) { //This is for newly created edits, below is for changed edits.
    const new_edit = {
      EditObject: currentEditObject,
      comment: commentText
    };
    editsArray.push(new_edit);

    if (currentHighlightIndex == highlightColors.length - 1) {
      setCurrentHighlightIndex(0);
    } else {
      setCurrentHighlightIndex(currentHighlightIndex + 1)
    }

    setCurrentlyEditing(false);
    setaddButton(false);
    setToggleAddEdit(false);
  }
  function saveChangedEditCallback(commentText) {
    changingEditObject.comment = commentText;
    setCurrentlyEditing(false);
    setaddButton(false);
    setToggleAddEdit(false);
  }
  function changeEdit(editObject) {
    setNewInputBool(false);
    setInputBoxDefault(editObject.comment);
    setInputBoxHeader("Make changes to comment");
    setCurrentlyEditing(true);
    setaddButton(true);
    setToggleAddEdit(true);
    setChangingEditObject(editObject);
  }

  function cancelChangedEditCallback() {
    setCurrentlyEditing(false);
    setaddButton(false);
    setToggleAddEdit(false);
  }

  function removeEdit(editObject, indexToRemove) {
    const newArray = editsArray.filter((edit, index) => {
      return index !== indexToRemove;
    });

    setEditsArray(newArray);

    editObject.curr_range.deleteContents();
    const newRange = editObject.curr_range.cloneRange();
    newRange.insertNode(document.createTextNode(editObject.previous_text));

  }

  return (<div className={styles.Page}>
    <div className={styles.PageContents}>
      {
        addButton
          ? (
            toggleAddEdit
            ? <InputBox Header={inputBoxHeader} cancelEditCallback={cancelEditCallback} saveEditCallback={saveEditCallback} defaultValue={inputBoxDefault} newInputBool={newInputBool} saveChangedEditCallback={saveChangedEditCallback} cancelChangedEditCallback={cancelChangedEditCallback}/>

            : <div className={styles.Instructions}>
              <button className ={styles.AddCommentButton} onClick={addNewEdit}>
                Add Comment
              </button>
            </div>)

          : (
            displayErrorMessage
            ? <div className={styles.Instructions}>
              <h2 className={styles.InstructionsHeader}>
                Highlight text to add a comment</h2>
              <h2 className={styles.ErrorMessage}>Selections cannot overlap</h2>
            </div>
            : <div className={styles.Instructions}>
              <h2 className={styles.InstructionsHeader}>
                Highlight text to add a comment</h2>
            </div>)
      }
      <div>
        <div id="textarea" className={styles.EssayBox} onMouseUp={onClickInTextArea}>
          <p>
            {essayData ? essayData.body : ""}</p>
        </div>
      </div>

      <div className={styles.Edits}>
        <EditsList editsArray={editsArray} removeEditCallback={removeEdit} changeEditCallback={changeEdit}/> {
          editsArray.length > 0
            ? <div>
                <NavLink onClick ={saveDBChanges} className = {styles.NavLinkStyle} to="/reviewEssays">
                  <button className={styles.SubmitButton}>Submit Edits</button>
                </NavLink>
              </div>
            : null
        }
      </div>

    </div>
  </div>);
}

export default EditPage;
