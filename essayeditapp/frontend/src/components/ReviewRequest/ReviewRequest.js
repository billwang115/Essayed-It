
import styles from './ReviewRequest.module.css';
import {NavLink} from "react-router-dom";
import React, { useState } from 'react';

import ENV from '../../config.js'
const API_HOST = ENV.api_host


const lorumIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum elementum risus non ligula pharetra interdum. Mauris in accumsan ex. Aenean neque nisl, dignissim et felis sed, feugiat tristique augue. Maecenas nunc purus, pulvinar porta mi in, sodales tincidunt ligula. Duis auctor risus eget dictum cursus. Nullam vitae mattis lectus. Praesent porta, lorem vitae rutrum laoreet, lorem nunc fermentum orci, eget volutpat eros enim sed tellus. Aenean sit amet lacinia sem.

Donec vulputate nulla id justo ultrices varius. Mauris mattis bibendum dolor, quis consequat libero venenatis vel. Maecenas at posuere enim. Etiam aliquam rutrum pretium. Phasellus vehicula commodo tortor vel ultrices. Donec vel venenatis metus. Cras vel congue eros, vel malesuada libero. Nam auctor, nibh et dapibus vehicula, nisl tortor rhoncus lectus, quis ornare ex lectus sit amet ante. Praesent sit amet augue quam. Morbi imperdiet diam eget pharetra viverra. Aliquam ac lacus est. Integer fermentum quis quam sed malesuada. Donec finibus ligula a vestibulum lobortis.

Sed ac dolor consectetur, condimentum elit a, vestibulum risus. Nunc ut diam id diam semper finibus quis in dui. Donec mi leo, feugiat vitae nibh vel, porta euismod sem. Aenean pellentesque arcu suscipit vehicula bibendum. Fusce feugiat id odio sed consequat. Phasellus sodales sem eget purus pharetra, eu dignissim nulla fringilla. Proin et felis pharetra, mollis dui sed, consectetur ex. Duis porttitor vulputate velit, id consectetur nunc. Suspendisse cursus accumsan condimentum. Curabitur id aliquam ipsum. Vestibulum rhoncus rutrum nisi, ut commodo sem blandit maximus.

Morbi lacinia arcu mi, facilisis gravida dolor faucibus sed. Mauris feugiat elit sed elit varius fermentum. In a mauris lectus. Donec tempus mollis diam, efficitur gravida lorem posuere non. Phasellus consectetur nec nulla sit amet sagittis. Nam mi erat, tincidunt a facilisis sit amet, dictum ut ipsum. Suspendisse posuere ligula a lectus gravida, convallis blandit neque dapibus. Nunc semper eget nibh vel lacinia. Aenean volutpat hendrerit lacus non pretium. Nulla eget tellus mauris. Aenean pulvinar nulla non turpis varius lobortis. In imperdiet ex eu massa tincidunt pretium.

Morbi convallis neque sit amet ante tempor, quis lacinia arcu sagittis. In hac habitasse platea dictumst. Maecenas condimentum elit sed sem efficitur lacinia. Suspendisse sit amet imperdiet erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin nec ultrices dolor. Praesent eu neque fermentum, blandit massa a, blandit diam. Donec congue, neque in vestibulum tincidunt, nisi urna dapibus eros, vel aliquet enim nisl id risus.`;

function ReviewRequest() {

  const [essayPasteInput, setEssayPasteInput] = useState(null);
  const [titleInput, setTitleInput] = useState(null);
  const [descriptionInput, setDescriptionInput] = useState(null);
  const [priceInput, setpriceInput] = useState(null);
  const [topicInput, setTopicInput] = useState(null);
  const [typeInput, setTypeInput] = useState(null);

  const [readyToSubmit, setReadyToSubmit] = useState(false);

  //This function will handle the server call to make sure the right profile is loaded in to be prepared to send in the input information to the server
  function publishResponse(){

   console.log("POSTing to database..")
   console.log(`${API_HOST}/api/essays`)

   const url = `${API_HOST}/api/essays`;
   let price_int = 0;
   priceInput == "regular" ? price_int = 1: priceInput == "plus" ? price_int = 3: price_int = 5
   const numWordsCalc = essayPasteInput.trim().split(/\s+/).length;
   const json_set = { title: titleInput, body: essayPasteInput,
                         description: descriptionInput, numCredits: price_int,
                          topic: topicInput, type: typeInput, numWords: numWordsCalc}
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
               console.log("Successfully added essay")
               }
           else {
               console.log("Failed to add essay")
              }
       })
       .catch(error => {
           console.log(error);
       });
  }

  function checkIfReady(){
    if (essayPasteInput !== null && titleInput !== null && descriptionInput !== null && priceInput !== null && typeInput !== null && topicInput !== null){
      setReadyToSubmit(true);
    }
    else {
      setReadyToSubmit(false);
    }
  }

  function onChangeEvent(eventValue, Inputfunction){
    Inputfunction(eventValue);
    checkIfReady();
  }


  return (

    <div className = {styles.PageContainer}>
    <div className = {styles.Page}>
      <div className = {styles.EssayPaste}>
      <form>
       <div className = {styles.EssayPasteTitle}>
           <div className = {styles.LabelContainer}><label className = {styles.BoxLabel} for="Essay">PASTE ESSAY</label><br/></div>
       </div>

       <div className = {styles.Essay}>
         <textarea value = {essayPasteInput} onClick= {e => onChangeEvent(e.target.value, setEssayPasteInput)} onInput = {e => onChangeEvent(e.target.value, setEssayPasteInput)} placeholder= {lorumIpsum} className = {styles.EssayBox} />
       </div>
     </form>
     </div>

      <div className = {styles.EssayInfo}>
        <form>
          <div className = {styles.Title}>
              <div className = {styles.LabelContainer}><label className = {styles.BoxLabel} for="Title">TITLE</label><br/></div>
            <input value = {titleInput} onClick= {e => onChangeEvent(e.target.value, setTitleInput)} onInput = {e => onChangeEvent(e.target.value, setTitleInput)} type = "text" className = {styles.TitleBox} /><br/>
          </div>

          <div className = {styles.Description}>
            <div className = {styles.LabelContainer}><label className = {styles.BoxLabel} for="Description">DESCRIPTION</label><br/></div>
            <textarea  value = {descriptionInput} onClick= {e => onChangeEvent(e.target.value, setDescriptionInput)} onInput = {e => onChangeEvent(e.target.value, setDescriptionInput)} type = "text" className = {styles.DescriptionBox} />
          </div>
          <div className = {styles.Topic}>
            <div className = {styles.LabelContainer}><label className = {styles.BoxLabel} for="Topic">TOPIC</label><br/></div>
            <input placeholder="Technology, Greek Mythology, etc" value = {topicInput} onClick= {e => onChangeEvent(e.target.value, setTopicInput)} onInput = {e => onChangeEvent(e.target.value, setTopicInput)} type = "text" className = {styles.TypeBox} />
          </div>
          <div className = {styles.Type}>
            <div className = {styles.LabelContainer}><label className = {styles.BoxLabel} for="Topic">TYPE</label><br/></div>
            <input placeholder="Argumentative, Expository, etc" value = {typeInput} onClick= {e => onChangeEvent(e.target.value, setTypeInput)} onInput = {e => onChangeEvent(e.target.value, setTypeInput)} type = "text" className = {styles.TypeBox} />
          </div>
        </form>

        <div className = {styles.PriceSelection} >
          <div className = {styles.LabelContainer}><label className = {styles.BoxLabel}  for="PriceSelection">REVIEW OPTIONS</label><br/></div>
          <div className = {styles.AvalTokensContainer}><h4 >Available Tokens: ⯁4 </h4></div>

          <div className = {styles.ButtonLayout} >
            <input value = {priceInput} onClick= {e => onChangeEvent(e.target.id, setpriceInput)} onInput = {e => onChangeEvent(e.target.id, setpriceInput)}  id = "regular" type="radio" name="radiogroup1"/>
            <label for = "regular">Regular <br/> ⯁1 </label>
            <input value = {priceInput} onClick= {e => onChangeEvent(e.target.id, setpriceInput)} onInput = {e => onChangeEvent(e.target.id, setpriceInput)} id = "plus" type="radio" name="radiogroup1"/ >
            <label for = "plus">Plus <br/> ⯁3 </label>
            <input value = {priceInput} onClick= {e => onChangeEvent(e.target.id, setpriceInput)} onInput = {e => onChangeEvent(e.target.id, setpriceInput)}  id = "premium" type="radio" name="radiogroup1"/>
            <label for = "premium"> Premium <br/> ⯁5 </label>
          </div>
            {readyToSubmit ? <NavLink onClick={publishResponse} className = {styles.NavLinkStyle} to="/reviewEssays"><button className = {styles.SubmitButton}>Submit for Review</button></NavLink>
           :<button className = {styles.SubmitButton}> Fill out all required fields to submit</button>}
        </div>
      </div>
    </div>
    </div>
  );
}

export default ReviewRequest;
