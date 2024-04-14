//create a react component that inouts a textarea message then performs a fetch request to localhost:3001 and getsback a response as data.message and displays that message in a box below

import React, { useState } from 'react';
import './App.css';

function App() {
    const [message, setMessage] = useState('');
    const [image, setImage] = useState('');
    const [response, setResponse] = useState('');
    const [imageResponse, setImageResponse] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3005/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({message})
    })
        .then((res) => res.json())
        .then((data) => setResponse(data.message));
    };
    const imageSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3005/image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({image})
    })
        .then((res) => res.json())
        .then((res) => {setImageResponse(res.image);console.log(res)});
    }

    return (

        <body>
        <div className='App'>
          <div className='main'>
        <h1> ChatGPT </h1>
        <ul className='chat'>
        <form onSubmit={handleSubmit}>
            <label htmlFor='message'></label>
            <input
            placeholder='Search for query'
            id='message'
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            
            />
            <button type='submit'>Submit</button>
        </form>
        <div id='res'>{response}</div>
        </ul>
        </div>

        <hr/>
        
        <div className='side'>
        <h1>Text to Image Converter</h1>
          <ll className='chat1'>
        <form onSubmit={imageSubmit}>
        <label htmlfor='image'></label>
            <input placeholder="Search for image" 
            id='image'
            type='text' 
            value={image} 
            onChange={(e) => setImage(e.target.value)} />
            <button type='submit'>Submit</button>
        </form>

        <img src={imageResponse} alt="Generated" height={250} width={250}/>
        </ll>
        </div>
        </div>
        <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
        </body>

    );
    }

    export default App