import React from "react";
import {
    Button,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
    withStyles
} from "material-ui";
import Card from "material-ui/es/Card/Card";
import CardActions from "material-ui/es/Card/CardActions";
import Paper from "material-ui/es/Paper/Paper";
import { connect } from "react-redux";
import { initCourses } from "../../redux/actions/courses";
import Course from "../Course";
import { isStudentUser } from "../../redux/actions";
import { enrol } from "../../redux/actions/enrolment";

const styles = {
    card: {
        width: "100%"
    },
    media: {
        height: 400
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
        marginLeft: 10,
        marginTop: 10
    },
    image: {
        height: 0,
        paddingTop: "56.25%" // 16:9
    },
    cardContent: {
        height: 384
    }
};

@withStyles(styles)
@connect((store) => ({ courses: store.courses.activeCourses }))
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openedCourse: {}
        };
    }

    componentDidMount() {
        this.props.dispatch(initCourses());
    };

    render() {
        const { openedCourse } = this.state;
        const { classes } = this.props;

        const openEnrolment = (course) => {
            this.setState({ openedCourse: course })
        };

        const closeEnrolment = () => {
            this.setState({ openedCourse: {} })
        };

        const onEnrol = () => {
            this.props.dispatch(enrol(openedCourse.id));
            closeEnrolment();
        };

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
                                    <Course key={course.id} course={course}>
                                        {isStudentUser() &&
                                        <Button size="small" color="primary" variant="raised" onClick={() => openEnrolment(course)}>Enrol</Button>}
                                    </Course>
                                ))}}
                            </div>
                        </CardContent>
                    </Card>
                </Paper>
                <Dialog
                    open={openedCourse.id}
                    onClose={closeEnrolment}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Enrol to {openedCourse.name}?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {openedCourse.description}
                        </DialogContentText>
                        <br/>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={closeEnrolment}
                            color="secondary">Cancel</Button>
                        <Button
                            onClick={onEnrol}
                            variant="raised"
                            color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default Home
