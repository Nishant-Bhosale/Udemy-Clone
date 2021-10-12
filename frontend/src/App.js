import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
	useEffect(() => {
		axios.get('http://localhost:5000/courses').then((res) => {
			console.log(res);
		});
	});
	return <div className="App">Udemy</div>;
}

export default App;
