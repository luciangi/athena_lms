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
import { connect } from "react-redux";
import { initCourses } from "../../redux/actions/home";

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

@withStyles(styles)
@connect((store) => ({ courses: store.home }))
class Home extends React.Component {
    componentDidMount() {
        this.props.dispatch(initCourses())
    };

    render() {
        const { classes } = this.props;
        return (
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
                                {this.props.courses.map(course => (
                                    <Card className={classes.box}>
                                        <CardContent>
                                            <Typography variant="title" component="span">
                                                {course.name}
                                            </Typography>
                                            <br/>
                                            <Typography variant="subheading" component="span">
                                                {`Author: ${course.author.firstName} ${course.author.lastName}`}
                                            </Typography>
                                            <br/>
                                            <Typography variant="subheading" component="span">
                                                {course.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" color="secondary">Learn More</Button>
                                        </CardActions>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </Paper>
            </div>
        );
    }
}

export default Home
