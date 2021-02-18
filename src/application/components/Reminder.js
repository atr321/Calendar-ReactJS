

import { useState } from 'react';
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

export default function Reminder({open, closePopup}) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [color, setColor] = useState("");

    const localStorageLembretes = JSON.parse(localStorage.getItem('lembretes'));

    let lembretes = localStorage.getItem('lembretes') !== null ? localStorageLembretes : [];

    function handleSubmit(event) {
        event.preventDefault();

        const lembrete = { title: title, description: description, color: color, date: date, time: time }

        lembretes.push(lembrete);

        updateLocalStorage()


        /*lembretes.forEach(lembrete => {
        console.log(lembrete.titulo)
        });*/
    }

    function updateLocalStorage() {
        localStorage.setItem('lembretes', JSON.stringify(lembretes))
    }


    const [selectedValue, setSelectedValue] = useState('a');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };


    return (
        <div id="container">
            <div>
                
                <Dialog onSubmit={handleSubmit} open={open} onClose={closePopup} aria-labelledby="form-dialog-title">

                    <DialogTitle id="form-dialog-title">Create Reminder</DialogTitle>
                    
                        <DialogContent>

                            <TextField id="standard-basic" onChange={(e) => setTitle(e.target.value)} required label="Title" />
                            <TextField id="standard-basic" onChange={(e) => setDescription(e.target.value)} maxLength="30" label="Description" />


                        </DialogContent>

                        <DialogContent>
                            <TextField
                                onChange={(e) => setDate(e.target.value)}
                                id="date"
                                required
                                type="date"
                            />
                            <TextField
                                onChange={(e) => setTime(e.target.value)}
                                id="time"
                                required
                                type="time"
                            />
                        </DialogContent>

                        <DialogContent>

                        <FormControl >
        <InputLabel >Cidade</InputLabel>
        <Select
          native
          //value={state.age}
          onChange={handleChange}
          inputProps={{
            name: 'age',
            id: 'age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>

                        </DialogContent>

                        <DialogContent>
                            <RadioGroup row aria-label="gender" name="gender1" onChange={handleChange}>
                                <FormControlLabel onChange={(e) => setColor(e.target.value)} value="blue" className="blueText" control={<Radio className="blueButton" size="small" />} label="Blue" />
                                <FormControlLabel onChange={(e) => setColor(e.target.value)} value="red" className="redText" control={<Radio className="redButton" size="small" />} label="Red" />
                                <FormControlLabel onChange={(e) => setColor(e.target.value)} value="green" className="greenText" control={<Radio className="greenButton" size="small" />} label="Green" />
                                <FormControlLabel onChange={(e) => setColor(e.target.value)} value="grey" className="greyText" control={<Radio className="greyButton" size="small" />} label="Grey" />
                            </RadioGroup>
                        </DialogContent>
                    <DialogActions>
                        <Button onClick={closePopup} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={closePopup} color="primary">
                            Save
                        </Button>
                     
                    </DialogActions>
                </Dialog>
            </div>


        </div>
    )

}