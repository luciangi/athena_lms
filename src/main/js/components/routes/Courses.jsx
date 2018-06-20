import React from "react";
import {
    Add,
    Book,
    Close
} from "@material-ui/icons/es/index";
import {
    AppBar,
    Button,
    Card,
    CardContent,
    Dialog,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Slide,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Toolbar,
    Typography,
    withStyles
} from "material-ui";
import {
    initCourses,
    initStudents,
    initSubjects
} from "../../redux/actions/courses";
import { connect } from "react-redux";
import Course from "../Course";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const styles = theme => ({
    root: {
        padding: "20px"
    },
    button: {
        marginRight: theme.spacing.unit
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    },
    card: {
        width: "100%"
    },
    add: {
        margin: "10px"
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
        width: 300,
        height: 300,
        marginLeft: 10,
        marginTop: 10
    },
    appBar: {
        position: "relative"
    },
    toolbar: {
        display: "flex"
    },
    register: {
        marginLeft: "auto"
    },
    paper: {
        margin: "3% 5% 3% 5%"
    },
    rootForm: {
        display: "flex",
        flexWrap: "wrap"
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200
    },
    chips: {
        display: "flex",
        flexWrap: "wrap"
    },
    chip: {
        margin: theme.spacing.unit / 4
    },
    center: {
        height: "100%",
        padding: 0,
        margin: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexFlow: "row wrap"
    },
    inputs: {
        display: "flex",
        flexDirection: "column"
    }
});

function getSteps() {
    return [ "Course general information", "Course content", "Content Preview" ];
}

function getStepContent(editedCourse, subjects, step, classes) {
    switch (step) {
        case 0:
            return (
                <div className={classes.center}>
                    <div className={classes.inputs}>
                        <TextField
                            id="name"
                            label="Name"
                            className={classes.textField}
                            value={editedCourse.name}
                            onChange={() => {
                            }}
                            margin="normal"
                        />
                        <TextField
                            id="multiline-flexible"
                            label="Description"
                            multiline
                            rowsMax="4"
                            value={editedCourse.description}
                            onChange={() => {
                            }}
                            className={classes.textField}
                            margin="normal"
                        />
                        <FormControl className={classes.formControl}>
                            <InputLabel>Subject</InputLabel>
                            <Select
                                value={editedCourse && editedCourse.subject ? editedCourse.subject.id : ""}
                                onChange={() => {
                                }}
                            >
                                {subjects.map(subject => (
                                    <MenuItem value={subject.id}>{subject.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            className={classes.button}
                            color="primary"
                            variant="raised"
                        >
                            <input type="file" style={{ display: "none" }}/>
                            Select Image
                        </Button>
                    </div>
                </div>);
        case 1:
            return (
                <div>
                    <Editor
                        editorState={editedCourse.content}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        // onEditorStateChange={this.onEditorStateChange}
                    />
                </div>
            );
        case 2:
            return (
                <div className={classes.center}>
                    <div className={classes.inputs}>
                        {editedCourse.content}
                    </div>
                </div>
            );
        default:
            return (
                <div>Unknown step</div>
            );
    }
}

const Transition = (props) => {
    return <Slide direction="up" {...props} />;
};

@withStyles(styles, { withTheme: true })
@connect((store) => ({
    courses: store.courses.activeCourses.filter(c => c.author.id === store.auth.user.id),
    subjects: store.courses.activeSubjects
}))
class Courses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openedEditor: false,
            activeStep: 0,
            skipped: new Set(),
            editedCourse: {}
        };
    }

    componentDidMount() {
        this.props.dispatch(initCourses());
        this.props.dispatch(initSubjects());
    };

    render() {
        const { classes, subjects, courses } = this.props;
        const { openedEditor, activeStep, editedCourse } = this.state;
        const steps = getSteps();

        const closeEditor = () => {
            this.setState({ openedEditor: false, activeStep: 0, editedCourse: {} })
        };

        const editCourse = (course) => {
            this.setState({ openedEditor: true, editedCourse: course })
        };

        const isStepOptional = step => {
            return step === 1;
        };

        const isStepSkipped = step => {
            return this.state.skipped.has(step);
        };

        const handleNext = () => {
            const { activeStep } = this.state;
            let { skipped } = this.state;
            if (isStepSkipped(activeStep)) {
                skipped = new Set(skipped.values());
                skipped.delete(activeStep);
            }
            this.setState({
                activeStep: activeStep + 1,
                skipped
            });
        };

        const handleBack = () => {
            const { activeStep } = this.state;
            this.setState({
                activeStep: activeStep - 1
            });
        };

        const handleSkip = () => {
            const { activeStep } = this.state;
            if (!isStepOptional(activeStep)) {
                // You probably want to guard against something like this,
                // it should never occur unless someone's actively trying to break something.
                throw new Error("You can't skip a step that isn't optional.");
            }
            const skipped = new Set(this.state.skipped.values());
            skipped.add(activeStep);
            this.setState({
                activeStep: this.state.activeStep + 1,
                skipped
            });
        };

        const handleSave = () => {
            this.props.dispatch(initCourses());
            closeEditor()
        };

        return (
            <div>
                <Paper elevation={1}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="headline" component="h2">
                                <Book/> Courses Management
                            </Typography>
                            <br/>
                            <div>
                                <Button
                                    variant="fab"
                                    color="primary"
                                    aria-label="add"
                                    className={classes.add}
                                    onClick={editCourse}>
                                    <Add/>
                                </Button>
                            </div>
                            <div className={classes.grid}>
                                {courses.map(course => (
                                    <Course key={course.id} course={course}>
                                        <Button size="small" color="secondary" onClick={() => editCourse(course)}>Learn More</Button>
                                    </Course>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </Paper>
                <Dialog
                    fullScreen
                    open={openedEditor}
                    onClose={closeEditor}
                    transition={Transition}>
                    <div>
                        <AppBar className={classes.appBar}>
                            <Toolbar className={classes.toolbar}>
                                <IconButton color="inherit" onClick={closeEditor} aria-label="Close">
                                    <Close/>
                                </IconButton>
                                <Typography variant="title" color="inherit" component="h1">
                                    {editedCourse.id ? `Editing ${editedCourse.name}` : editedCourse.name || "New course"}
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </div>
                    <div>
                        <Paper elevation={1} className={classes.paper}>
                            <Card>
                                <div className={classes.root}>
                                    <Stepper activeStep={activeStep}>
                                        {steps.map((label, index) => {
                                            const props = {};
                                            const labelProps = {};
                                            if (isStepOptional(index)) {
                                                labelProps.optional = <Typography variant="caption" component="h1">Optional</Typography>;
                                            }
                                            if (isStepSkipped(index)) {
                                                props.completed = false;
                                            }
                                            return (
                                                <Step key={label} {...props}>
                                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                                </Step>
                                            );
                                        })}
                                    </Stepper>
                                    <div>
                                        <div style={{ height: "400px" }}>
                                            {activeStep === steps.length ? (
                                                <div>
                                                    <Typography component="h1" variant="headline" className={classes.instructions}>
                                                        You're new course is finished!
                                                    </Typography>
                                                </div>
                                            ) : (
                                                <div>
                                                    {getStepContent(editedCourse, subjects, activeStep, classes)}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            {activeStep === steps.length ?
                                                (<Button
                                                    onClick={handleSave}
                                                    className={classes.button}
                                                    color="primary"
                                                    variant="raised"
                                                >
                                                    SAVE
                                                </Button>) :
                                                (<div>
                                                    <Button
                                                        disabled={activeStep === 0}
                                                        onClick={handleBack}
                                                        className={classes.button}
                                                    >
                                                        Back
                                                    </Button>
                                                    {isStepOptional(activeStep) && (
                                                        <Button
                                                            variant="raised"
                                                            onClick={handleSkip}
                                                            className={classes.button}
                                                        >
                                                            Skip
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="raised"
                                                        onClick={handleNext}
                                                        className={classes.button}
                                                        color={activeStep === steps.length - 1 ? "primary" : null}
                                                    >
                                                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                                                    </Button>
                                                </div>)}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Paper>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default Courses
