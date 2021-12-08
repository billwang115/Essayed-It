import styles from './ViewEdits.module.css';
import React, {useState} from 'react';
import EditsList from "./EditsList";
import {NavLink} from "react-router-dom";
import { useEffect } from 'react';
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import {useLocation} from "react-router-dom";
import { useNavigate } from "react-router";
import ENV from '../../config.js'
const API_HOST = ENV.api_host


const lorumIpsum = <div className = {styles.WhiteSpace}><p >     Mauris mattis bibendum dolor, quis consequat libero venenatis vel. Maecenas at posuere enim. Etiam aliquam rutrum pretium. Phasellus vehicula commodo tortor vel ultrices. Donec vel venenatis metus. Cras vel congue eros, vel malesuada libero. Nam auctor, nibh et dapibus vehicula, nisl tortor rhoncus lectus, quis ornare ex lectus sit amet ante. Praesent sit amet augue quam. Morbi imperdiet diam eget pharetra viverra. Aliquam ac lacus est. Integer fermentum quis quam sed malesuada. Donec finibus ligula a vestibulum lobortis.<br /><br />

<span className = {styles.YellowHighlight}>     Sed ac dolor consectetur, condimentum elit a, vestibulum risus. Nunc ut diam id diam semper finibus quis in dui. Donec mi leo, feugiat vitae nibh vel, porta euismod sem. Aenean pellentesque arcu suscipit vehicula bibendum. Fusce feugiat id odio sed consequat. Phasellus sodales sem eget purus pharetra, eu dignissim nulla fringilla. Proin et felis pharetra, mollis dui sed, consectetur ex. Duis porttitor vulputate velit, id consectetur nunc. Suspendisse cursus accumsan condimentum. Curabitur id aliquam ipsum. Vestibulum rhoncus rutrum nisi, ut commodo sem blandit maximus.</span><br /><br />

      Morbi lacinia arcu mi, facilisis gravida dolor faucibus sed. Mauris <span className = {styles.GreenHighlight}>feugiat</span> elit sed elit varius fermentum. In a mauris lectus. Donec tempus mollis diam, efficitur gravida lorem posuere non. Phasellus consectetur nec nulla sit amet sagittis. Nam mi erat, tincidunt a facilisis sit amet, dictum ut ipsum. Suspendisse posuere ligula a lectus gravida, convallis blandit neque dapibus. Nunc semper eget nibh vel lacinia. Aenean volutpat hendrerit lacus non pretium. Nulla eget tellus mauris. Aenean pulvinar nulla non turpis varius lobortis. In imperdiet ex eu massa tincidunt pretium.<br /><br />

Morbi convallis neque sit amet ante tempor, <span className = {styles.BlueHighlight}>quis lacinia arcu sagittis. In hac habitasse platea dictumst. Maecenas condimentum elit sed sem efficitur lacinia. Suspendisse sit amet imperdiet erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin nec ultrices dolor. Praesent eu neque fermentum, blandit massa a, blandit diam. Donec congue, neque in vestibulum tincidunt, nisi urna dapibus eros, vel aliquet enim nisl id risus.  </span></p></div>;

function ViewEdits() {
  //This function will handle the server call to load in the correct essay into the essay editor, as well as the assosiated edits to be read
  function getEdits(){}
  const {currentUser} = useContext(AuthContext);
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



   const highlightColors = [
     "#FDFD6A",
     "#97FD6A",
     "#6AB4FD",
     "#FF8BF1",
     "#FFDB7A",
     "#9D83FF",
     "#FF839F"
   ];

  const [editsArray, setEditsArray] = useState([]);
  const [currentEditObject, setcurrentEditObject] = useState(null);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const [lastSelectedText, setLastSelectedText] = useState(null);
  const [essayObject, setEssayObject] = useState(null)
  const [essayText, setEssayText] = useState("")
  const [currentHighlightIndex, setCurrentHighlightIndex] = useState(0);

  const [inputBoxHeader, setInputBoxHeader] = useState("Add new comment to highlighted text");
  const [inputBoxDefault, setInputBoxDefault] = useState("");
  const [newInputBool, setNewInputBool] = useState(true);
  const [changingEditObject, setChangingEditObject] = useState(null);
  const [rating, setRating] = useState(1);
  const Navigate = useNavigate();
  const location = useLocation();

  function loadEssayAndEdits(){
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
            console.log(json)
            addEssayAndEdits(json)

        })
        .catch(error => {
            console.log(error);
        });


  }

  function addEssayAndEdits(essayObject){
    console.log(essayObject)
    setEssayText(essayObject.body)

    //Need to redefine edits array to match form of this js file
    const newEditsArray = []
    for (let i = 0; i < essayObject.edits.length; i++){
      const edit = {
        EditObject: {
          previous_text: essayObject.edits[i].assosiated_text,
          curr_range: null,
          highlight_color: highlightColors[i%essayObject.edits.length]
         },
        comment: essayObject.edits[i].edit_comment
      };
      newEditsArray.push(edit)
    }
    setEditsArray(newEditsArray)
  }


  function submitReview(){
    console.log("Updating essay to be reviewed")
    const url = `${API_HOST}/api/essays/${location.state.essayID}`;
    const json_set = {edit_rating:rating ,status: "REVIEWED"}
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
                console.log("Successfully added review")
                //Here is where the redirect happens
                Navigate("/yourRequests")
             }
            else {
                console.log("Failed to add review")

               }
        })
        .catch(error => {
            console.log(error);
        });

  }
  function selectRating(selectedrating){
    setRating(selectedrating)
  }

  function onLoadComponent(){
      loadEssayAndEdits();
  }
  useEffect(()=>{
    onLoadComponent();

  }, [])


  return (

    <div className={styles.Page}>
    <div className={styles.PageContents}>

      <div>
        <div id="textarea" className={styles.EssayBox}>
          <p>
            {essayText}</p>
        </div>
      </div>

      <div className={styles.Edits}>
        <EditsList editsArray={editsArray}/>
          <h2 className = {styles.RatingHeader}>Leave a rating!</h2>
          {/*The code here and in the CSS file to create stars has some code made by the author allenhe: https://codepen.io/hesguru/pen/BaybqXv*/}
          <div className= {styles.rate}>
          <input onClick= {e => selectRating(e.target.value)} type="radio" id="star5" name="rate" value="5" />
          <label for="star5" title="text">5 stars</label>
          <input onClick= {e => selectRating(e.target.value)} type="radio" id="star4" name="rate" value="4" />
          <label for="star4" title="text">4 stars</label>
          <input onClick= {e => selectRating(e.target.value)} type="radio" id="star3" name="rate" value="3" />
          <label for="star3" title="text">3 stars</label>
          <input onClick= {e => selectRating(e.target.value)} type="radio" id="star2" name="rate" value="2" />
          <label for="star2" title="text">2 stars</label>
          <input onClick= {e => selectRating(e.target.value)} type="radio" id="star1" name="rate" value="1" />
          <label for="star1" title="text">1 star</label>
        </div>
            <button onClick= {submitReview()}className={styles.SubmitButton}>Submit Review</button>
        </div>
      </div>


  </div>);
}

export default ViewEdits;
