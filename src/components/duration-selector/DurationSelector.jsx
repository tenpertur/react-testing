import React, {useEffect, useState} from "react";
import "./DurationSelector.sass"

export const isDurationValid = (d) => !isNaN(d)
export const DurationSelector = ({onDurationChange}) => {
    const [duration, setDuration] = useState({value: 1, type: 'd'})
    const [isValid, setIsValid] = useState(isDurationValid(duration?.value))

    useEffect(() => {
        if (isValid) {
            const durationStr = `${duration.value}${duration.type}`;
            onDurationChange(durationStr)
        }
    }, [duration])

    const className = "duration " + (isValid ? "" : "error")
    return (
        <div>
            <span className="block">Duration</span>
            <span>
                <input className={className} id="duration-input-value"
                       value={duration.value}
                       onChange={(evt) => {
                           const d = evt.target.value
                           const valid = isDurationValid(d)
                           setIsValid(valid)
                           setDuration({...duration, value: d})
                       }}
                />
            </span>
            <span>
                <select name="duration" id="duration-select-type"
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