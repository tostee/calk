import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useState } from 'react';
import reportWebVitals from './reportWebVitals';

const Counter = ({number}) =>
{
return(
  <h1 className='font-medium text-gray-600'>{number}</h1>
 )
}


const App = (props)=>
{
  const [contadorValue, updateContador] = useState(0)
  const [countClick, updatecountClick] = useState(0)
  //const contadorValue = contador[0]
  //const updateContador = contador[1]
 
const incrementar = (param) =>{
  updatecountClick(countClick + 1)
switch(param){
  case "add": updateContador(contadorValue + 1)
  break;
  case "rest": updateContador(contadorValue - 1)
  break;
  case "reset": updateContador(0)
  break;
 default: alert('pero que haces')
}

}

    
  const isEven = contadorValue % 2 === 0
  return (
		<div className="App">
      <h2>Vamos a empezar a contar queridos amiguitos</h2>
      <Counter number = {contadorValue}></Counter>
		  <button onClick={() => incrementar('add')} className='bg-slate-500 text-pink-900 border-2'>Incrementar</button>
      <button onClick={() => incrementar('rest')} className='bg-slate-500 text-pink-900 border-2'>Restar</button>
      <button onClick={() => incrementar('reset')} className='bg-slate-500 text-pink-900 border-2'>Restar</button>
      <p className='font-bold'>{isEven ? "Es par" : "Es impar"}</p>
      <p>Has dado click {countClick} veces</p>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
