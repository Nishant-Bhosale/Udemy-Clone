import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
	useEffect(() => {
		axios.get('/courses').then((res) => {
			console.log(res);
		});
	});
	return <div className="App">Udemy</div>;
}

export default App;
