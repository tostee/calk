import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useState } from 'react';


const WarningNotUsed = () =>{
  return <h1 className='bg-cyan-600 font-medium'>Todavia no se ha usado el componente</h1>
}

const ListofClicks = ({clicks}) =>{
  return <p className='font-light'>{clicks.join(": ")}</p>
}
const App = () =>{
    const[left, setLeft] = useState(0)
    const[right, setRight] = useState(0)
    

    const [clicks , setClicks] = useState([])
    
    const handleClickLeft = () => {
        setLeft(left + 1)
        
        setClicks(previousClick => {
          return [...previousClick, 'L']
        })    
    }

    const handleClickRight = () => {
        setRight(right + 1)
        
        setClicks(previousClick=> {
          return [...previousClick, 'R']
        })
    }
    return(
        <div className='fixed left-20 top-10'>
            {left}
            <button className='bg-slate-500 border-4' onClick={handleClickLeft}>Left</button>
            <button className='bg-orange-300 ' onClick={handleClickRight}>Right</button>
            {right}
            <p>Has dado {left + right} clicks</p>
            {clicks.length === 0
            ? <WarningNotUsed></WarningNotUsed>
            : <ListofClicks clicks={clicks}></ListofClicks>}
        </div>
    );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);