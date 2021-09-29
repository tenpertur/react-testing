import React from 'react';
import {MaturityDate, useMaturityDate} from "Components/maturity-date/MaturityDate";
import {DateSelector} from "Components/date-selector/DateSelector";
import {DurationSelector} from "Components/duration-selector/DurationSelector";

export const Layout = () => {
    const [ maturityDate,isLoading, isError,setStartDate, setDuration ] = useMaturityDate();

    return (
        <>
            <div className="maturity-date">
                <DateSelector onDateChange={setStartDate}/>
                <DurationSelector onDurationChange={setDuration}/>
                <MaturityDate maturityDate={maturityDate} isLoading={isLoading} isError={isError}/>
            </div>
        </>
    )
}