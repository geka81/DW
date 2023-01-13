import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
import addNotification from "react-push-notification";
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import axios from "axios";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import jwt_decode from "jwt-decode";
import "../../styles/create.css";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));


export default function Create() {
	const history = useHistory();
	const initialFormData = Object.freeze({
		title: '',
		description: '',
	});

	const [videoData, updateFormData] = useState(initialFormData);
	const [videoimage, setVideoImage] = useState(null);
	const [videovideo, setVideoVideo] = useState(null);

	axiosInstance.defaults.headers['Authorization'] =
	'JWT ' + localStorage.getItem('access_token');
	
	const token = localStorage.getItem('access_token');
	const decoded = jwt_decode(token);

	
	const handleChange = (e) => {
		if ([e.target.name] == 'image') {
			setVideoImage({
				image: e.target.files,
			});
			console.log(e.target.files);
		}
		if ([e.target.name] == 'video') {
			setVideoVideo({
				video: e.target.files,
			});
			console.log(e.target.files);
		}
		if ([e.target.name] == 'title') {
			updateFormData({
				...videoData,
				[e.target.name]: e.target.value.trim(),
			});
		} else {
			updateFormData({
				...videoData,
				[e.target.name]: e.target.value.trim(),
			});
		}
	};
	

	const handleSubmit = (e) => {
		const config = { headers: { 'Content-Type': 'multipart/form-data' } };
		const URL = 'http://127.0.0.1:8000/api/admin/create/';
		let formData = new FormData();
		formData.append('title', videoData.title);

		// default user_id seted to 1
		formData.append('user', decoded.user_id);

		formData.append('description', videoData.description);
		formData.append('image', videoimage.image[0]);
		formData.append('video', videovideo.video[0]);
		axios
			.post(URL, formData, config)
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => console.log(err));
		addNotification({
			"title": "Your Video Have Been Uploaded",
			"message": "Check your Video",
			icon: "https://t4.ftcdn.net/jpg/04/17/28/67/360_F_417286789_1RG7Id7cxBo3wC46v5yhcVXzeo5b5nYx.jpg",
			duration: 4000,
			native: true,
		});
	};

	
	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Create New Video
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="title"
								label="Video Title"
								name="title"
								autoComplete="title"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="description"
								label="Video Description"
								name="description"
								autoComplete="description"
								onChange={handleChange}
								multiline
								rows={4}
							/>
						</Grid>
						<div class="creation-file">
						<label for="image">Preview</label><br/>
						<input
							accept="image/*"
							className={classes.input}
							id="video-image"
							onChange={handleChange}
							name="image"
							type="file"
						/>
						<label for="video"><h1></h1>Video</label><br/>
						<input
							accept="video/*"
							className={classes.input}
							id="video-video"
							onChange={handleChange}
							name="video"
							type="file"
						/>
						</div>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Create Video
					</Button>
				</form>
			</div>
		</Container>
	);
}