
import './ReviewRequest.css';


const lorumIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum elementum risus non ligula pharetra interdum. Mauris in accumsan ex. Aenean neque nisl, dignissim et felis sed, feugiat tristique augue. Maecenas nunc purus, pulvinar porta mi in, sodales tincidunt ligula. Duis auctor risus eget dictum cursus. Nullam vitae mattis lectus. Praesent porta, lorem vitae rutrum laoreet, lorem nunc fermentum orci, eget volutpat eros enim sed tellus. Aenean sit amet lacinia sem.

Donec vulputate nulla id justo ultrices varius. Mauris mattis bibendum dolor, quis consequat libero venenatis vel. Maecenas at posuere enim. Etiam aliquam rutrum pretium. Phasellus vehicula commodo tortor vel ultrices. Donec vel venenatis metus. Cras vel congue eros, vel malesuada libero. Nam auctor, nibh et dapibus vehicula, nisl tortor rhoncus lectus, quis ornare ex lectus sit amet ante. Praesent sit amet augue quam. Morbi imperdiet diam eget pharetra viverra. Aliquam ac lacus est. Integer fermentum quis quam sed malesuada. Donec finibus ligula a vestibulum lobortis.

Sed ac dolor consectetur, condimentum elit a, vestibulum risus. Nunc ut diam id diam semper finibus quis in dui. Donec mi leo, feugiat vitae nibh vel, porta euismod sem. Aenean pellentesque arcu suscipit vehicula bibendum. Fusce feugiat id odio sed consequat. Phasellus sodales sem eget purus pharetra, eu dignissim nulla fringilla. Proin et felis pharetra, mollis dui sed, consectetur ex. Duis porttitor vulputate velit, id consectetur nunc. Suspendisse cursus accumsan condimentum. Curabitur id aliquam ipsum. Vestibulum rhoncus rutrum nisi, ut commodo sem blandit maximus.

Morbi lacinia arcu mi, facilisis gravida dolor faucibus sed. Mauris feugiat elit sed elit varius fermentum. In a mauris lectus. Donec tempus mollis diam, efficitur gravida lorem posuere non. Phasellus consectetur nec nulla sit amet sagittis. Nam mi erat, tincidunt a facilisis sit amet, dictum ut ipsum. Suspendisse posuere ligula a lectus gravida, convallis blandit neque dapibus. Nunc semper eget nibh vel lacinia. Aenean volutpat hendrerit lacus non pretium. Nulla eget tellus mauris. Aenean pulvinar nulla non turpis varius lobortis. In imperdiet ex eu massa tincidunt pretium.

Morbi convallis neque sit amet ante tempor, quis lacinia arcu sagittis. In hac habitasse platea dictumst. Maecenas condimentum elit sed sem efficitur lacinia. Suspendisse sit amet imperdiet erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin nec ultrices dolor. Praesent eu neque fermentum, blandit massa a, blandit diam. Donec congue, neque in vestibulum tincidunt, nisi urna dapibus eros, vel aliquet enim nisl id risus.`;

function ReviewRequest() {
  return (
    <div>
    <div className = "Page">
      <div className = "EssayPaste">
      <form>
       <div className = "EssayPasteTitle">
         <label className = 'BoxLabel' for="Title">PASTE ESSAY</label><br/>
       </div>

       <div className = "Essay">
         <textarea placeholder= {lorumIpsum} className = "EssayBox" />
       </div>
     </form>
     </div>

      <div className = "EssayInfo">
        <form>
          <div className = "Title">
            <label className = 'BoxLabel' for="Title">TITLE</label><br/>
            <input type = "text" className = "TitleBox" /><br/>
          </div>

          <div className = "Description">
            <label className = 'BoxLabel' for="Description">DESCRIPTION</label><br/>
            <textarea type = "text" className = "DescriptionBox" />
          </div>
        </form>

        <div className = 'PriceSelection'>
          <label className = 'ReviewOptionLabel' for="PriceSelection">REVIEW OPTIONS</label><br/>
          <h4>Available Tokens: ⯁4 </h4>

          <div className = "ButtonLayout">
            <input id = "regular" type="radio" name="radiogroup1"/>
            <label for = "regular">Regular <br/> ⯁1 </label>
            <input id = "plus" type="radio" name="radiogroup1"/ >
            <label for = "plus">Plus <br/> ⯁2 </label>
            <input id = "premium" type="radio" name="radiogroup1"/>
            <label for = "premium"> Premium <br/> ⯁5 </label>
          </div>

          <button className = "SubmitButton">Submit for Review</button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ReviewRequest;
