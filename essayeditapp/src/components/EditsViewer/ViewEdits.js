import styles from './ViewEdits.module.css';
import React, {useState} from 'react';

import EditsList from "./EditsList";
import {NavLink} from "react-router-dom";
import { useEffect } from 'react';


const lorumIpsum = <div className = {styles.WhiteSpace}><p >     Mauris mattis bibendum dolor, quis consequat libero venenatis vel. Maecenas at posuere enim. Etiam aliquam rutrum pretium. Phasellus vehicula commodo tortor vel ultrices. Donec vel venenatis metus. Cras vel congue eros, vel malesuada libero. Nam auctor, nibh et dapibus vehicula, nisl tortor rhoncus lectus, quis ornare ex lectus sit amet ante. Praesent sit amet augue quam. Morbi imperdiet diam eget pharetra viverra. Aliquam ac lacus est. Integer fermentum quis quam sed malesuada. Donec finibus ligula a vestibulum lobortis.<br /><br />

<span className = {styles.YellowHighlight}>     Sed ac dolor consectetur, condimentum elit a, vestibulum risus. Nunc ut diam id diam semper finibus quis in dui. Donec mi leo, feugiat vitae nibh vel, porta euismod sem. Aenean pellentesque arcu suscipit vehicula bibendum. Fusce feugiat id odio sed consequat. Phasellus sodales sem eget purus pharetra, eu dignissim nulla fringilla. Proin et felis pharetra, mollis dui sed, consectetur ex. Duis porttitor vulputate velit, id consectetur nunc. Suspendisse cursus accumsan condimentum. Curabitur id aliquam ipsum. Vestibulum rhoncus rutrum nisi, ut commodo sem blandit maximus.</span><br /><br />

      Morbi lacinia arcu mi, facilisis gravida dolor faucibus sed. Mauris <span className = {styles.GreenHighlight}>feugiat</span> elit sed elit varius fermentum. In a mauris lectus. Donec tempus mollis diam, efficitur gravida lorem posuere non. Phasellus consectetur nec nulla sit amet sagittis. Nam mi erat, tincidunt a facilisis sit amet, dictum ut ipsum. Suspendisse posuere ligula a lectus gravida, convallis blandit neque dapibus. Nunc semper eget nibh vel lacinia. Aenean volutpat hendrerit lacus non pretium. Nulla eget tellus mauris. Aenean pulvinar nulla non turpis varius lobortis. In imperdiet ex eu massa tincidunt pretium.<br /><br />

Morbi convallis neque sit amet ante tempor, <span className = {styles.BlueHighlight}>quis lacinia arcu sagittis. In hac habitasse platea dictumst. Maecenas condimentum elit sed sem efficitur lacinia. Suspendisse sit amet imperdiet erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin nec ultrices dolor. Praesent eu neque fermentum, blandit massa a, blandit diam. Donec congue, neque in vestibulum tincidunt, nisi urna dapibus eros, vel aliquet enim nisl id risus.  </span></p></div>;

function ViewEdits() {

  const hardCodeEditObject1 = {
    previous_text: "Sed ac dolor consectetur, condimentum elit a, vestibulum risus. Nunc ut diam id diam semper finibus quis in dui. Donec mi leo, feugiat vitae nibh vel, porta euismod sem. Aenean pellentesque arcu suscipit vehicula bibendum. Fusce feugiat id odio sed consequat. Phasellus sodales sem eget purus pharetra, eu dignissim nulla fringilla. Proin et felis pharetra, mollis dui sed, consectetur ex. Duis porttitor vulputate velit, id consectetur nunc. Suspendisse cursus accumsan condimentum. Curabitur id aliquam ipsum. Vestibulum rhoncus rutrum nisi, ut commodo sem blandit maximus.",
    curr_range: null,
    highlight_color: "#FDFD6A"
  };
  const hardCodeEditObject2 = {
    previous_text: "feugiat",
    curr_range: null,
    highlight_color: "#97FD6A"
  };
  const hardCodeEditObject3 = {
    previous_text: "quis lacinia arcu sagittis. In hac habitasse platea dictumst. Maecenas condimentum elit sed sem efficitur lacinia. Suspendisse sit amet imperdiet erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin nec ultrices dolor. Praesent eu neque fermentum, blandit massa a, blandit diam. Donec congue, neque in vestibulum tincidunt, nisi urna dapibus eros, vel aliquet enim nisl id risus.  ",
    curr_range: null,
    highlight_color: "#6AB4FD"
   };

   const comment1 = "This part doesn't make a lot of sense. Try to restructure the paragraph so that enough context comes before the conclusion.";
   const comment2 = "I would use a different word here. The connotation of this word goes against what you're trying to argue.";
   const comment3 = "I really like how you ended this paper! The final point was a good conlusion to the rest of the paper, maybe try to use some of these same points through the essay to strengthen your claims elsewhere?";

   const new_edit1 = {
     EditObject: hardCodeEditObject1,
     comment: comment1
   };
   const new_edit2 = {
     EditObject: hardCodeEditObject2,
     comment: comment2
   };
   const new_edit3 = {
     EditObject: hardCodeEditObject3,
     comment: comment3
   };

    const hardCodeEditsArray = [];
   hardCodeEditsArray.push(new_edit1);
   hardCodeEditsArray.push(new_edit2);
   hardCodeEditsArray.push(new_edit3);





  const [editsArray, setEditsArray] = useState([]);
  const [currentEditObject, setcurrentEditObject] = useState(null);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const [lastSelectedText, setLastSelectedText] = useState(null);

  const [currentHighlightIndex, setCurrentHighlightIndex] = useState(0);

  const [inputBoxHeader, setInputBoxHeader] = useState("Add new comment to highlighted text");
  const [inputBoxDefault, setInputBoxDefault] = useState("");
  const [newInputBool, setNewInputBool] = useState(true);
  const [changingEditObject, setChangingEditObject] = useState(null);

  function onLoadComponent(){
    console.log("got here");
      setEditsArray(hardCodeEditsArray);
  }
  useEffect(()=>{

    onLoadComponent();

  }, [])
  const highlightColors = [
    "#FDFD6A",
    "#97FD6A",
    "#6AB4FD",
    "#FF8BF1",
    "#FFDB7A",
    "#9D83FF",
    "#FF839F"
  ];

  return (

    <div className={styles.Page}>
    <div className={styles.PageContents}>

      <div>
        <div id="textarea" className={styles.EssayBox}>
          <p>
            {lorumIpsum}</p>
        </div>
      </div>

      <div className={styles.Edits}>
        <EditsList editsArray={editsArray}/>
          <h2 className = {styles.RatingHeader}>Leave a rating!</h2>
          <div className= {styles.rate}>
          <input type="radio" id="star5" name="rate" value="5" />
          <label for="star5" title="text">5 stars</label>
          <input type="radio" id="star4" name="rate" value="4" />
          <label for="star4" title="text">4 stars</label>
          <input type="radio" id="star3" name="rate" value="3" />
          <label for="star3" title="text">3 stars</label>
          <input type="radio" id="star2" name="rate" value="2" />
          <label for="star2" title="text">2 stars</label>
          <input type="radio" id="star1" name="rate" value="1" />
          <label for="star1" title="text">1 star</label>
        </div>
          <NavLink to="/reviewEssays">
            <button className={styles.SubmitButton}>Submit Review</button>
          </NavLink>
        </div>
      </div>


  </div>);
}

export default ViewEdits;
