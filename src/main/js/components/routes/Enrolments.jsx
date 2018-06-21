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
import {
    convertFromRaw,
    EditorState
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";

const styles = {
    card: {
        width: "100%"
    },
    grid: {
        display: "flex",
        flexWrap: "wrap"
    },
    hideToolbar: {
        display: "none"
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

        const getEditorState = () => {
            if (this.state.activeCourse.courseContent && this.state.activeCourse.courseContent !== "") {
                return EditorState.createWithContent(convertFromRaw(JSON.parse(this.state.activeCourse.courseContent)));
            } else {
                return EditorState.createEmpty();
            }
        };

        const editorState = getEditorState();
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
                                {!courses || courses.length === 0 ? (
                                    <Typography variant="body1" component="h2">
                                        You don't have any enrolments at the moment. Please enrol to a course from the home screen.
                                    </Typography>
                                ) : courses.map(course => (
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
                                    {activeCourse.courseContent &&
                                    <Editor
                                        editorState={editorState}
                                        toolbarClassName={classes.hideToolbar}
                                        readOnly={true}
                                    />}
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
