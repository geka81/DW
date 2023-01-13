import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useParams } from 'react-router-dom';
import "../../styles/single.css"
import api from "../../requests";

export default function Video() {
	const { id } = useParams();
	const [data, setData] = useState({ videos: [] });
	const [likes, setLikes] = useState(0)
	const [dislikes, setDisLikes] = useState(0)


    const like = () => {
        setLikes(likes + 1)
    }

    const dislike = () => {
        setDisLikes(dislikes + 1)
    }

	useEffect(() => {
		axiosInstance.get(id).then((res) => {
			setData({ videos: res.data });
			console.log(res.data);
			setLikes(res.likes.length)
			setDisLikes(res.dislikes.length)
		});
	}, [setData, setLikes, setDisLikes]);


	return (
    <>
		<div class="video-detail-page">
			<br/>
			<video controls src={data.videos.video} preload="true" loop width="900"></video>
			<h2 class="title">{data.videos.title}</h2>
			<div class="activity-part">
			<p class="date_added">{data.videos.date_added}</p>

		
        <div class="user">{data.videos.user_name}</div>
			
        <a href="#" class="subscribe">subscribe</a>
		    <button onClick={like} class="like">{likes} 👍</button>
			  <button onClick={dislike} class="dislike">{dislikes} 👎</button>
      </div>
			<div class="description">{data.videos.description}</div>
		</div>
    </>
	);
}