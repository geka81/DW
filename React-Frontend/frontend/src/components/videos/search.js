import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	videoTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	videoText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
}));

const Search = () => {
	const classes = useStyles();
	const search = 'search';
	const [appState, setAppState] = useState({
		search: '',
		videos: [],
	});

	useEffect(() => {
		axiosInstance.get(search + '/' + window.location.search).then((res) => {
			const allVideos = res.data;
			setAppState({ videos: allVideos });
			console.log(res.data);
		});
	}, [setAppState]);

	return (
		<React.Fragment>
			<br/>
			<Container maxWidth="md" component="main">
				<Grid container spacing={5} alignItems="flex-end">
					{appState.videos.map((video) => {
						return (
							// Enterprise card is full width at sm breakpoint
							<Grid item key={video.id} xs={12} md={4}>
								<Card className={classes.card}>
									<Link
										color="textPrimary"
										href={'/video/' + video.id}
										className={classes.link}
									>
										<CardMedia
											className={classes.cardMedia}
											image={video.image}
											title="Image title"
										/>
									</Link>
									<CardContent className={classes.cardContent}>
										<Typography
											gutterBottom
											variant="h6"
											component="h2"
											className={classes.videoTitle}
										>
											{video.title.substr(0, 50)}
										</Typography>
										<div className={classes.videoText}>
											<Typography color="textSecondary">
												{video.user_name.substr(0, 40)}
											</Typography>
										</div>
										<div className={classes.videoDescription}>
											<Typography color="textSecondary">
												{video.date_added.substr(0, 40)}
											</Typography>
										</div>
									</CardContent>
								</Card>
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</React.Fragment>
	);
};
export default Search;