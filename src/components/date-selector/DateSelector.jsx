import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
import "./DateSelector.css"

export const DateSelector = ({onDateChange}) => {
    const [selectedDate, handleDateChange] = useState(dayjs(new Date()).format("YYYY-MM-DD"));

    useEffect(()=>{
        onDateChange(selectedDate)
    },[])

    return (<div>
            <span className="block">Contractual tenor</span>
            <span className="block"><input
                type="date"
                value={selectedDate}
                onChange={evt => {
                    handleDateChange(evt.target.value)
                    onDateChange(evt.target.value)
                }}
                id="contractual-date"/>
            </span>
        </div>
    )
}