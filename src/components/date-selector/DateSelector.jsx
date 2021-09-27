import React, {useState} from "react";
import dayjs from "dayjs";
import "./DateSelector.css"

export const DateSelector = ({onDateChange}) => {
    const [selectedDate, handleDateChange] = useState(dayjs(new Date()).format("YYYY-MM-DD"));
    return (<div>
            <span className="block">Contractual tenor</span>
            <span className="block"><input
                type="date"
                value={selectedDate}
                onChange={date => handleDateChange(date)}
                id="contractual-date"/>
            </span>
        </div>
    )
}