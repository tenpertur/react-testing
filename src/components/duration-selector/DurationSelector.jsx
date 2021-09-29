import React, {useEffect, useState} from "react";
import "./DurationSelector.css"

export const DurationSelector = ({onDurationChange}) => {
    const [duration, setDuration] = useState({value: 1, type:'d'})


    useEffect(()=>{
        const durationStr = `${duration.value}${duration.type}`;
        console.log(durationStr)
        onDurationChange(durationStr)
    },[duration])

    return (
        <div>
            <span className="block">Duration</span>
            <span>
                <input className="duration" id="duration-input"
                       value={duration.value}
                       onChange={(evt) => setDuration({...duration, value: evt.target.value})}
                />
            </span>
            <span>
                <select name="duration" id="duration-type"
                        value={duration.type}
                        onChange={(evt) => setDuration({...duration, type: evt.target.value})}
                >
                    <option value="d">days</option>
                    <option value="w">weeks</option>
                    <option value="m">months</option>
                    <option value="y">years</option>
                </select>
            </span>
        </div>
    );
}