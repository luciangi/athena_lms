import React from "react";
import {
    Button,
    CardContent,
    CardMedia,
    Typography,
    withStyles
} from "material-ui";
import Card from "material-ui/es/Card/Card";
import CardActions from "material-ui/es/Card/CardActions";
import Paper from "material-ui/es/Paper/Paper";

const styles = {
    card: {
        width: "100%"
    },
    media: {
        height: 700
    },
    containingPaper: {
        width: "100%"
    },
    card2: {
        width: "100%",
        flex: 1
    },
    grid: {
        display: "flex",
        flexWrap: "wrap"
    },
    box: {
        width: 400,
        height: 400,
        marginLeft: 10,
        marginTop: 10
    }
};

const Home = ({ classes }) => (
    <div>
        <Paper elevation={1}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image="/images/back-to-school.jpg"
                    title="Back to school"
                />
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        Welcome to Athena
                    </Typography>
                    <Typography component="p">
                        Athena is a Learning Management System.
                    </Typography>
                    <Typography component="p">
                        A software for the administration, documentation, tracking, reporting and delivery of educational courses or training
                        programs.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        </Paper>
        <br/>
        <Paper elevation={1}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="headline" component="h2">
                        Please take a look at some of our courses
                    </Typography>
                    <br/>
                    <div className={classes.grid}>
                        <Card className={classes.box}>
                            <CardContent>
                                <Typography variant="headline" component="h2">
                                    Course 1
                                </Typography>
                                <Typography component="p">
                                    well meaning and kindly.<br/>
                                    {"\"a benevolent smile\""}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                        <Card className={classes.box}>
                            <CardContent>
                                <Typography variant="headline" component="h2">
                                    Course 1
                                </Typography>
                                <Typography component="p">
                                    well meaning and kindly.<br/>
                                    {"\"a benevolent smile\""}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                        <Card className={classes.box}>
                            <CardContent>
                                <Typography variant="headline" component="h2">
                                    Course 1
                                </Typography>
                                <Typography component="p">
                                    well meaning and kindly.<br/>
                                    {"\"a benevolent smile\""}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                        <Card className={classes.box}>
                            <CardContent>
                                <Typography variant="headline" component="h2">
                                    Course 1
                                </Typography>
                                <Typography component="p">
                                    well meaning and kindly.<br/>
                                    {"\"a benevolent smile\""}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                        <Card className={classes.box}>
                            <CardContent>
                                <Typography variant="headline" component="h2">
                                    Course 1
                                </Typography>
                                <Typography component="p">
                                    well meaning and kindly.<br/>
                                    {"\"a benevolent smile\""}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                        <Card className={classes.box}>
                            <CardContent>
                                <Typography variant="headline" component="h2">
                                    Course 1
                                </Typography>
                                <Typography component="p">
                                    well meaning and kindly.<br/>
                                    {"\"a benevolent smile\""}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                        <Card className={classes.box}>
                            <CardContent>
                                <Typography variant="headline" component="h2">
                                    Course 1
                                </Typography>
                                <Typography component="p">
                                    well meaning and kindly.<br/>
                                    {"\"a benevolent smile\""}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                        <Card className={classes.box}>
                            <CardContent>
                                <Typography variant="headline" component="h2">
                                    Course 1
                                </Typography>
                                <Typography component="p">
                                    well meaning and kindly.<br/>
                                    {"\"a benevolent smile\""}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </Paper>
    </div>
);

export default withStyles(styles)(Home)
