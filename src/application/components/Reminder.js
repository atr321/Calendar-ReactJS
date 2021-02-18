

import '../styles/Reminder.css';

export default function Reminder(props){

    return(
        <div id="container">
            <input type="text" placeholder="Título"></input>
            <input type="text"  maxLength="30" placeholder="Descrição"></input>
            <button onClick={props.closePopup} >butao</button>
        </div>
    )

}