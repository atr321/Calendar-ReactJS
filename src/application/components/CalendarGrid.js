import {useState, useEffect} from 'react';
import moment from 'moment';

import { MONTHS, WEEKDAYS } from '../../utils/consts.js';
import '../styles/CalendarGrid.css';

export default function CalendarGrid(){
    const date = new Date();

    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getUTCFullYear());
    const [calendar, setCalendar] = useState([{ id:'teste',reminder:[], data:[] }]);
    const [reminderDate, setReminderDate] = useState([]);
    
    useEffect( () => {
        setData(year, month)
    }, []);
    
    function isLeapYear(year){ 
        if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)){
            return ['31', '29' , '31' , '30' , '31' , '30' , '31' , '31' , '30' , '31' , '30' , '31']
        }
        else
            return ['31', '28' , '31' , '30' , '31' , '30' , '31' , '31' , '30' , '31' , '30' , '31']
    }

    const setFirstWeek = (weekDay, monthDays, lastMonth, month) =>
        
            WEEKDAYS.map((_,index) => {
            if (index < weekDay){
                const value = (monthDays[lastMonth] - (weekDay - index) +1);
                const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
                let a = {};
                reminders.map((reminder) => {
                    let dateTime = moment(reminder.date + " " + reminder.time);
                    if (dateTime.date() == value){
                        setReminderDate(reminder.title)
                        a ={value:value, 
                            reminder: reminder.title, 
                            class:'otherMonthDay'}
                            console.log(a)
                    }console.log(a)
                    a = {value:value, 
                        class:'otherMonthDay'}
                }); return a
            }
            const value = (index - weekDay) + 1;
            return {value:value, 
                    class:'day'}
        });
    
    const setMiddleWeek = (pastWeekDay) =>

        WEEKDAYS.map((_,index) => {
            const day = pastWeekDay + index + 1;
            return{ value:day, class:'day' } 
        });

    const setFinal2Weeks = ( pastWeekDay,monthDays, month ) =>

        WEEKDAYS.map((_,index) => {
            const day = pastWeekDay + index + 1;
            if ( day > monthDays[month] || (pastWeekDay < 10) ){
                return{ value: day > monthDays[month] ? (day - monthDays[month]) : day,
                    class:'otherMonthDay'};
            }
            return{value:day,class:'day'};
        });


    function setData(year, month){
        const date = new Date(year, month, 1);

        const monthDays = isLeapYear(year);

        const weekDay = date.getDay();

        const lastMonth = month === 0 ? 11 : month -1;
        const nextMonth = month === 11 ? 0 : month + 1;

        setWeeks(weekDay, monthDays, lastMonth, month);
        
    }

    function setWeeks(weekDay, monthDays, lastMonth, month) {
        const firstWeek = setFirstWeek(weekDay, monthDays, lastMonth, month );
        console.log(firstWeek)

        const secondWeek = setMiddleWeek( firstWeek[6].value );

        const thirdWeek = setMiddleWeek( secondWeek[6].value );

        const forthWeek = setMiddleWeek( thirdWeek[6].value );

        const fifthWeek = setFinal2Weeks( forthWeek[6].value, monthDays, month );

        const sixWeek = setFinal2Weeks( fifthWeek[6].value, monthDays, month );
        
       setCalendar([{id:'firstWeek', reminder:reminderDate, data:firstWeek}, 
                    {id:'secondWeek', data:secondWeek}, 
                    {id:'thirdWeek',  data:thirdWeek}, 
                    {id:'forthWeek',  data:forthWeek},
                    {id:'fifthWeek',  data:fifthWeek},
                    {id:'sixWeek',  data:sixWeek} 
                    ]);
    }
    
    function previousCalendar() {
        const currentMonth = (month !== 0 ? month - 1 : 11);
        const currentYear = (month !== 0 ? year : year - 1);
        setMonth(currentMonth);
        setYear(currentYear);
        
        setData(currentYear,currentMonth);
      }
    
    function nextCalendar() {
        const currentMonth = (month !== 11 ? month + 1 : 0);
        const currentYear = (month !== 11 ? year : year + 1);
        setMonth(currentMonth);
        setYear(currentYear);

        setData(currentYear,currentMonth);

      }

      
      

    
    return(
        
        <div>
            <header>
            <span>
                <button onClick={ () => previousCalendar()}  className="left"></button>
            </span>
            <span id="mes-ano">{MONTHS[month]} {year}</span>
            <span>
                <button onClick={ () => nextCalendar()} className="right"></button>
            </span>
            </header>
            <div className="calendarContent">
            <div className="weekdays">
            {WEEKDAYS.map((weekDay,i) => <div key={i} className="weekday">{weekDay}</div>)}
            </div>
            {calendar.map(week =>
                <div key={week.id} className="week">
                {week.data.map(day =>
                    <div
                    key={`${day.mount}${day.value}`}
                    className={day.class}
                    >
                        <p className="calendar-text">{day.value < 10 && day.value !== ' ' ? `0${day.value}` : day.value}</p>
                        <div id="reminder-card">{day.reminder}</div>
                    
                    </div>,
                )}
                </div>,
            )}
            </div>
            
        </div>
    )

}