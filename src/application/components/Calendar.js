import { useState } from 'react';
import AdicionarReminder from './Reminder.js';
import '../styles/Calendar.css';
import CalendarGrid from './CalendarGrid.js';

export default function Calendar() {
    const [AdicionarReminderPopup, setAdicionarReminderPopup] = useState(false);

    function handleAdicionarReminderPopup() {
        setAdicionarReminderPopup(!AdicionarReminderPopup);
    }
  
  return (
    <div id="calendar">
        
        <CalendarGrid/>

        <button type="button" onClick={() => setAdicionarReminderPopup(true)} className="reminder-btn">Criar lembrete</button>
        
        <div id="reminder">

        {AdicionarReminderPopup ? <AdicionarReminder closePopup={handleAdicionarReminderPopup} /> : null}

        </div>

    </div>

  );
}

