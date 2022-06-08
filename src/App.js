import {React, useState} from 'react';
import './App.css';
import {config} from './config';

function randomDateGen(start, end){
  return new Date(
        start.getTime() +
        Math.random() *
        (end.getTime() -
        start.getTime()));
}

export default function App(){
  const [pic, setPic] = useState();
  const [picName, setPicName] = useState('');
  const [picExplanation, setPicExplanation] = useState('');


  const fetchPicOfDay = async () => {
    const apiKey = config.MY_KEY;
    
    // 1995-06-16
    // Create a new date later than the above
    // and no later that today.
    // append to the url like &date=2014-10-01
    const randomDate = randomDateGen(new Date(1995, 6, 16), new Date()).toISOString().slice(0, 10);

    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${randomDate}`;
    console.log(url);
    const res = await fetch(url)
    const json = await res.json();
    console.log(json);
    setPic(json.url);
    setPicName(json.title);
    setPicExplanation(json.explanation);
  }

  return (
    <div className="App">
      <button className="LoadDataButton" onClick={fetchPicOfDay}>Load Pic Data</button>
      <h2 className="PicTitle">{picName}</h2>
      <img 
      src={pic}
      alt="new"/>

      <p className="PicDescription">
        {picExplanation}
      </p>
    </div>
  );
}
