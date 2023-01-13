
import React, { useEffect, useState } from 'react';
import './App.css';
import Videos from './components/videos/videos';
import VideoLoadingComponent from './components/videos/videoLoading';

function App() {
	const VideoLoading = VideoLoadingComponent(Videos);
	const [appState, setAppState] = useState({
		loading: false,
		videos: null,
	});

	useEffect(() => {
		setAppState({ loading: true });
		const apiUrl = `http://127.0.0.1:8000/api/`;
		fetch(apiUrl)
			.then((data) => data.json())
			.then((videos) => {
				setAppState({ loading: false, videos: videos });
			});
	}, [setAppState]);
	return (
		<div className="App">
			<h1>Hint: If something doesn't working, reload the page, log out and then log in back.</h1>
			<VideoLoading isLoading={appState.loading} videos={appState.videos} />
		</div>
	);
}
export default App;