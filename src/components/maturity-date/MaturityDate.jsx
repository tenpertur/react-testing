import React, { useEffect, useState } from "react";
import "./MaturityDate.sass";
import { Skeleton } from "Components/skeleton/Skeleton";

export const useMaturityDate = () => {
  const [startDate, setStartDate] = useState();
  const [duration, setDuration] = useState();
  const [maturityDate, setMaturityDate] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!startDate || !duration) {
      return;
    }
    setIsLoading(true);
    fetch(`http://localhost:8080/date?duration=${duration}&from=${startDate}`)
      .then((resp) => {
        const error = resp.status !== 200;
        setIsError(error);
        setIsLoading(false);
        return resp.text();
      })
      .then((text) => {
        setMaturityDate(text);
      })
      .catch((_) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [startDate, duration]);
  return [maturityDate, isLoading, isError, setStartDate, setDuration];
};

export const MaturityDate = ({ maturityDate, isLoading, isError }) => {
  let element;
  if (isError) {
    element = (
      <p className="maturity-date-value error">Error during calculation</p>
    );
  } else if (isLoading) {
    element = <Skeleton height={"1em"} width={"14em"} />;
  } else {
    element = (
      <p className="maturity-date-value">Maturity date: {maturityDate}</p>
    );
  }
  return <div className="maturity-date">{element}</div>;
};
