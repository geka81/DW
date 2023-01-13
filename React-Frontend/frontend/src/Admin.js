import React, { useEffect, useState } from 'react';
import './App.css';
import Videos from './components/admin/videos';
import VideoLoadingComponent from './components/videos/videoLoading';
import axiosInstance from './axios';

function Admin() {
	const VideoLoading = VideoLoadingComponent(Videos);
	const [appState, setAppState] = useState({
		loading: true,
		videos: null,
	});

	useEffect(() => {
		axiosInstance.get().then((res) => {
			const allVideos = res.data;
			setAppState({ loading: false, videos: allVideos });
			console.log(res.data);
		});
	}, [setAppState]);

	return (
		<div className="App">
			<h1>Latest Videos</h1>
			<VideoLoading isLoading={appState.loading} videos={appState.videos} />
		</div>
	);
}
export default Admin;