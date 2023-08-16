import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <button onClick={e => {
        fn(e)
      }}>Test button</button>
    </div>
  );
}

async function fn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  e.preventDefault();
  console.log("click");

}

export default App;
