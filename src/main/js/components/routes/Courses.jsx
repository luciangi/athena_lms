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
import { initCourses } from "../../redux/actions/courses";
import { connect } from "react-redux";
import Course from "../Course";

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
    }
});

function getSteps() {
    return [ "Course general information", "Course content", "Course enrolment" ];
}

function getStepContent(step, classes) {
    switch (step) {
        case 0:
            return (
                <div>
                    <TextField
                        id="name"
                        label="Name"
                        className={classes.textField}
                        value={""}
                        onChange={() => {
                        }}
                        margin="normal"
                    />
                    <TextField
                        id="multiline-flexible"
                        label="Description"
                        multiline
                        rowsMax="4"
                        value={""}
                        onChange={() => {
                        }}
                        className={classes.textField}
                        margin="normal"
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel>Subject</InputLabel>
                        <Select
                            value={""}
                            onChange={() => {
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        // onClick={handleSave}
                        className={classes.button}
                        color="primary"
                        variant="raised"
                    >
                        <input type="file" style={{ display: "none" }}/>
                        Select Image
                    </Button>
                </div>);
        case 1:
            return (
                <div>WYSWYG</div>
            );
        case 2:
            return (
                <div>Enrolment Type</div>
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
@connect((store) => ({ courses: store.courses.filter(c => c.author.id === store.auth.user.id) }))
class Courses extends React.Component {
    componentDidMount() {
        this.props.dispatch(initCourses())
    };

    constructor(props) {
        super(props);
        this.state = {
            openedEditor: false,
            activeStep: 0,
            skipped: new Set(),
            editedCourse: null
        };
    }

    render() {
        const { classes } = this.props;
        const { openedEditor, activeStep, editedCourse } = this.state;
        const steps = getSteps();

        const closeEditor = () => {
            this.setState({ openedEditor: false, activeStep: 0, editedCourse: null })
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
                                {this.props.courses.map(course => (
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
                                    {editedCourse && editedCourse.id ? `Editing ${editedCourse.name}` : (editedCourse && editedCourse.name) || "New course"}
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
                                                    {getStepContent(activeStep, classes)}
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
