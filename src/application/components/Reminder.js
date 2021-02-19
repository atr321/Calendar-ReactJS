import { useState } from 'react';
//import ReactDOM from 'react-dom';
import StatesCities from '../../utils/estados-cidades.json';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent'
import InputLabel from '@material-ui/core/InputLabel';
import DialogTitle from '@material-ui/core/DialogTitle';
import '../styles/Reminder.css';

export default function Reminder({ open, closePopup }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [color, setColor] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    /*useEffect( () => {
        updateCard()
    },[]);
*/
    

    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    
    reminders.map(reminder => 
        console.log(reminder.title)
        )

    function handleSubmit(event) {
        event.preventDefault();

        const reminder = { title: title, description: description, color: color, date: date, time: time, state:state, city:city }

        reminders.push(reminder);

        updateLocalStorage()
        
        //updateCard()
        closePopup()


        /*lembretes.forEach(lembrete => {
        console.log(lembrete.titulo)
        });*/
    }
    /*
    function updateCard(){
        console.log("oila")
        ReactDOM.render(
            reminders.title,
            document.getElementById('reminder-card')
          );
    }*/
    

    function updateLocalStorage() {
        localStorage.setItem('reminders', JSON.stringify(reminders))
    }


    const [selectedValue, setSelectedValue] = useState('a');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div id="container">
            <div>

                <Dialog open={open} onClose={closePopup} aria-labelledby="form-dialog-title">

                    <DialogTitle id="form-dialog-title">Create Reminder</DialogTitle>

                    <form onSubmit={handleSubmit}>

                    <DialogContent id="texts-reminder">

                        <TextField className="text-reminder" onChange={(e) => setTitle(e.target.value)} required label="Title" />
                        <TextField inputProps={{maxLength:30}} className="text-reminder" onChange={(e) => setDescription(e.target.value)} type="text" maxLength="30" label="Description" />

                    </DialogContent>

                    <DialogContent id="date">
                        <TextField
                            onChange={(e) => setDate(e.target.value)}
                            className="date-clock"
                            required
                            type="date"
                        />
                        <TextField
                            onChange={(e) => setTime(e.target.value)}
                            className="date-clock"
                            required
                            type="time"
                        />
                    </DialogContent>

                    <DialogContent id="city">

                        <FormControl className="state-city">
                            <InputLabel >State</InputLabel>
                            
                            <Select 
                                native
                                value={state}
                                onChange={event => {setState(event.target.value);setCity("")}}
                                inputProps={{
                                    name: 'age',
                                    id: 'age-native-simple',
                                }}>
                                {StatesCities.estados.map(estate => 
                                    <option key={estate.sigla} value={estate.nome}>{estate.nome}</option>
                                    
                                    )}
                                    <option disabled></option>
                            </Select>
                        </FormControl>

                        <FormControl className="state-city">
                            {state.length > 0 && <>
                            <InputLabel >City</InputLabel>
                            
                            <Select
                                native
                                value={city}
                                onChange={event => setCity(event.target.value)}
                                inputProps={{
                                    name: 'age',
                                    id: 'age-native-simple',
                                }}>
                                {StatesCities.estados.filter(currentState =>
                                    currentState.nome === state

                                )[0].cidades.map(city =>
                                    <option key={city} value={city}>{city}</option>
                                    
                                )}
                                <option disabled></option>
                                

                            </Select></>}
                        </FormControl>

                    </DialogContent>

                    <DialogContent id="colors">
                        <RadioGroup row name="colors" onChange={handleChange}>
                            <FormControlLabel onChange={(e) => setColor(e.target.value)} value="blue" className="blueText" control={<Radio className="blueButton" size="small" />} label="Blue" />
                            <FormControlLabel onChange={(e) => setColor(e.target.value)} value="red" className="redText" control={<Radio className="redButton" size="small" />} label="Red" />
                            <FormControlLabel onChange={(e) => setColor(e.target.value)} value="green" className="greenText" control={<Radio className="greenButton" size="small" />} label="Green" />
                            <FormControlLabel onChange={(e) => setColor(e.target.value)} value="grey" className="greyText" control={<Radio className="greyButton" size="small" />} label="Grey" />
                            <FormControlLabel onChange={(e) => setColor(e.target.value)} value="yellow" className="yellowText" control={<Radio className="yellowButton" size="small" />} label="Yellow" />
                        </RadioGroup>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closePopup} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Save
                        </Button>
                        
                    </DialogActions>
                    </form>
                </Dialog>
            </div>


        </div>
    )

}