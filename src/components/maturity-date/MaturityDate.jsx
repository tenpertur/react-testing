import React from "react";
import {DurationSelector} from "Components/duration-selector/DurationSelector";
import {DateSelector} from "Components/date-selector/DateSelector";
import './MaturityDate.css'
export const MaturityDate = () => {
    const [startDate, setStartDate] = React.useState()
    const [duration, setDuration] = React.useState()
    const [maturityDate, setMaturityDate] = React.useState()
    return (
        <>
            <div className="maturity-date">
                <DateSelector onDateChange={tenor=>{setStartDate(tenor)}}/>
                <DurationSelector onDurationChange={d=>setDuration(d)} />
                <p className="maturity-date" id="maturity-date-value">{JSON.stringify(duration)}</p>
            </div>

        </>
    )
}