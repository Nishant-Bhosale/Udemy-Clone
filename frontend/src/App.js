import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';

function App() {
	useEffect(() => {
		axios.get('/courses').then((res) => {
			console.log(res);
		});
	});
	return <div className="App"> <Navbar /> </div>;
}

export default App;
