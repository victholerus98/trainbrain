import React, { useState, useEffect } from "react";

const Data = () => {
  const [hasError, setErrors] = useState(false);
  const [trains, setTrains] = useState({});
  async function fetchData() {
    const res = await fetch(
      "https://cors-anywhere.herokuapp.com/https://labs.thetrainbrain.com/knockon/?minutes=30"
    );
    res
      .json()
      .then(res => setTrains(res))
      .catch(err => setErrors(err));
  }
  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      console.log("This will run every second!");
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  fetchData();

  return (
    <div>
      <span>{JSON.stringify(trains)}</span>
      <hr />
      <span>Has error: {JSON.stringify(hasError)}</span>
    </div>
  );
};
export default Data;
