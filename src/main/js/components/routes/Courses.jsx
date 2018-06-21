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
    initSubjects,
    saveCourse
} from "../../redux/actions/courses";
import {
    convertFromRaw,
    convertToRaw,
    EditorState
} from "draft-js";
import { connect } from "react-redux";
import Course from "../Course";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from "draft-js-export-html";
import renderHTML from "react-render-html";


function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(",")[ 1 ]);
        reader.onerror = error => reject(error);
    });
}

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
        width: "100%",
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

class StepContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        if (this.props.editedCourse.courseContent && this.props.editedCourse.courseContent !== "") {
            this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.editedCourse.courseContent)));
        } else {
            this.state.editorState = EditorState.createEmpty();
        }
    }

    render() {
        const {
            editedCourse,
            subjects,
            activeStep,
            classes,
            handleCourseNameChange,
            handleCourseDescriptionChange,
            handleCourseSubjectChange,
            handleCourseContentChange,
            handleCourseImageChange
        } = this.props;

        const { editorState } = this.state;

        const handleEditorChange = (editorState) => {
            const contentState = editorState.getCurrentContent();
            this.setState({
                editorState
            });
            handleCourseContentChange(JSON.stringify(convertToRaw(contentState)))
        };

        switch (activeStep) {
            case 0:
                return (
                    <div className={classes.center}>
                        <div className={classes.inputs}>
                            <TextField
                                id="name"
                                label="Name"
                                className={classes.textField}
                                onChange={handleCourseNameChange}
                                value={editedCourse.name}
                                margin="normal"
                            />
                            <br/>
                            <TextField
                                id="multiline-flexible"
                                label="Description"
                                multiline
                                rowsMax="4"
                                value={editedCourse.description}
                                onChange={handleCourseDescriptionChange}
                                className={classes.textField}
                                margin="normal"
                            />
                            <br/>
                            <FormControl className={classes.textField}>
                                <InputLabel>Subject</InputLabel>
                                <Select
                                    value={(editedCourse.subject && editedCourse.subject.id) || subjects.find(() => true).id}
                                    onChange={handleCourseSubjectChange}
                                >
                                    {subjects.map(subject => (
                                        <MenuItem key={subject.id} value={subject.id}>{subject.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <br/>
                            <div>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="raised-button-file"
                                    multiple
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={handleCourseImageChange}
                                />
                                <label htmlFor="raised-button-file">
                                    <Button variant="raised" component="span" className={classes.button}>
                                        Thumbnail
                                    </Button>
                                </label>
                                {editedCourse.image && <img src={`data:image/png;base64,${editedCourse.image}`}/>}
                            </div>
                        </div>
                    </div>);
            case 1:
                return (
                    <div>
                        <Editor
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={handleEditorChange}
                        />
                    </div>
                );
            case 2:
                return (
                    <div className={classes.center}>
                        <div className={classes.inputs}>
                            {renderHTML(stateToHTML(editorState.getCurrentContent()))}
                        </div>
                    </div>
                );
            default:
                return (
                    <div>Unknown step</div>
                );
        }
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
            this.props.dispatch(saveCourse(this.state.editedCourse));
            closeEditor()
        };

        const handleCourseNameChange = (event) => {
            this.setState({ editedCourse: { ...editedCourse, name: event.target.value } })
        };

        const handleCourseDescriptionChange = (event) => {
            this.setState({ editedCourse: { ...editedCourse, description: event.target.value } })
        };

        const handleCourseSubjectChange = (event) => {
            this.setState({ editedCourse: { ...editedCourse, subject: subjects.find(subject => subject.id === event.target.value) } })
        };

        const handleCourseImageChange = (event) => {
            getBase64(event.target.files[ 0 ]).then(
                data => this.setState({ editedCourse: { ...editedCourse, image: data } })
            );
        };

        const handleCourseContentChange = (courseContent) => {
            this.setState({ editedCourse: { ...editedCourse, courseContent: courseContent } })
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
                                        <Button size="small" color="primary" variant="raised" onClick={() => editCourse(course)}>Manage</Button>
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
                                        <div style={{ minHeight: "400px" }}>
                                            {activeStep === steps.length ? (
                                                <div>
                                                    <Typography component="h1" variant="headline" className={classes.instructions}>
                                                        You're new course is finished!
                                                    </Typography>
                                                </div>
                                            ) : (
                                                <div>
                                                    <StepContent
                                                        editedCourse={editedCourse}
                                                        subjects={subjects}
                                                        activeStep={activeStep}
                                                        classes={classes}
                                                        handleCourseNameChange={handleCourseNameChange}
                                                        handleCourseDescriptionChange={handleCourseDescriptionChange}
                                                        handleCourseSubjectChange={handleCourseSubjectChange}
                                                        handleCourseImageChange={handleCourseImageChange}
                                                        handleCourseContentChange={handleCourseContentChange}
                                                    />
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
