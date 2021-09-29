import React, {useEffect, useState} from "react";
import './MaturityDate.sass';
import {Skeleton} from "Components/skeleton/Skeleton";
import {defer, EMPTY, from, Subject, timer} from "rxjs";
import {catchError, debounceTime, map, mergeMap, tap} from "rxjs/operators";
import axios from "axios";

export const useMaturityDate = () => {
    const [startDate, setStartDate] = useState();
    const [duration, setDuration] = useState();
    const [maturityDate, setMaturityDate] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    // const [subject$] = useState(
    //     new Subject()
    // );
    // const [stream$] = useState(
    //     subject$.asObservable().pipe(
    //         debounceTime(300),
    //         mergeMap(data => {
    //             return defer(() => {
    //                 const progress = timer(300).subscribe(_ => {
    //                     setIsLoading(true);
    //                 });
    //                 return from(
    //                     axios.get(`http://localhost:8080/date?duration=${data.duration}&from=${data.startDate}`)
    //                 ).pipe(
    //                     tap(
    //                         _ => {
    //                             progress.unsubscribe();
    //                         },
    //                         _ => {
    //                             progress.unsubscribe();
    //                         },
    //                         _ => {
    //                             progress.unsubscribe();
    //                         }
    //                     ),
    //                     map(response => {
    //                         setIsLoading(false);
    //                         const error = response.status !== 200;
    //                         setIsError(error);
    //                         return response.text();
    //                     }),
    //                     catchError(_ => {
    //                         setIsLoading(false);
    //                         setIsError(true);
    //                         return EMPTY;
    //                     })
    //                 );
    //             });
    //         })
    //     )
    // );
    // useEffect(() => {
    //     const subscription = stream$.subscribe(
    //         next => {
    //             setMaturityDate(next);
    //             setIsLoading(false);
    //         },
    //         _ => {
    //             setIsError(true);
    //             setIsLoading(false);
    //         }
    //     );
    //     return () => {
    //         setIsLoading(false);
    //         subscription.unsubscribe();
    //     };
    // }, []);
    //
    useEffect(() => {
        if (startDate && duration) {
            subject$.next({duration: duration, startDate: startDate});
        }
    }, []);

    useEffect(() => {
        if (!startDate || !duration) {
            return;
        }
        setIsLoading(true)
        fetch(`http://localhost:8080/date?duration=${duration}&from=${startDate}`)
            .then(resp => {
                const error = resp.status !== 200
                setIsError(error)
                setIsLoading(false)
                return resp.text()
            }).then(text => {
            setMaturityDate(text)
        })
            .catch(_ => {
                setIsError(true)
                setIsLoading(false)
            })
    }, [startDate, duration])
    return [maturityDate, isLoading, isError, setStartDate, setDuration]
}

export const MaturityDate = ({maturityDate, isLoading, isError}) => {
    let element;
    if (isError) {
        element = <p className="maturity-date-value error">Error during calculation</p>;
    } else if (isLoading) {
        element = <Skeleton height={"1em"} width={"14em"}/>
    } else {
        element = <p className="maturity-date-value">Maturity date: {maturityDate}</p>
    }
    return <div className="maturity-date">
        {element}
    </div>
}