import React from "react";
import { AssignmentInd } from "@material-ui/icons/es/index";
import {
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper,
    Typography,
    withStyles
} from "material-ui";
import Course from "../Course";
import { connect } from "react-redux";
import { initEnrolledCourses } from "../../redux/actions/enrolment";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import renderHTML from "react-render-html";

const styles = {
    card: {
        width: "100%"
    },
    grid: {
        display: "flex",
        flexWrap: "wrap"
    }
};


@withStyles(styles)
@connect((store) => ({ courses: store.courses.activeCourses }))
class Enrolments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeCourse: {}
        };
    }

    componentDidMount() {
        this.props.dispatch(initEnrolledCourses())
    };

    render() {
        const { courses, classes } = this.props;
        const { activeCourse } = this.state;

        const viewCourse = (course) => {
            this.setState({ activeCourse: course })
        };

        const closeCourse = () => {
            this.setState({ activeCourse: {} })
        };

        return (
            <div>
                <Paper elevation={1}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="headline" component="h2">
                                <AssignmentInd/> Enrolments
                            </Typography>
                            <br/>
                            <div className={classes.grid}>
                                {courses.map(course => (
                                    <Course key={course.id} course={course}>
                                        <Button
                                            variant="raised"
                                            color="primary"
                                            onClick={() => viewCourse(course)}>
                                            View course
                                        </Button>
                                    </Course>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </Paper>
                <Dialog
                    open={activeCourse.id}
                    onClose={activeCourse}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Viewing {activeCourse.name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <div className={classes.center}>
                                <div className={classes.inputs}>
                                    {activeCourse.courseContent && renderHTML(stateToHTML(convertFromRaw(JSON.parse(activeCourse.courseContent))))}
                                </div>
                            </div>
                        </DialogContentText>
                        <br/>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={closeCourse}
                            color="secondary">Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
};

export default Enrolments
