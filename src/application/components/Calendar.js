import { useState } from 'react';
import AdicionarReminder from './Reminder.js';
import Button from '@material-ui/core/Button';
import '../styles/Calendar.css';
import CalendarGrid from './CalendarGrid.js';

export default function Calendar() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <div id="calendar">
        
        <CalendarGrid/>
        
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Create Reminder
        </Button>

        <div id="reminder">

        <AdicionarReminder open={open} closePopup={handleClose}/>

        </div>

    </div>

  );
}

