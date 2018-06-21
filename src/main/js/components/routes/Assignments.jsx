import React from "react";
import { Book } from "@material-ui/icons/es/index";
import {
    Card,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Slide,
    Typography,
    withStyles
} from "material-ui";

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
    }
});

function getSteps() {
    return [ "Select subject", "Edit course content", "Enrolment type" ];
}

const Step1 = () => {
    return (
        <div style={{ height: "400px" }}>
            <div style={{ padding: "30px" }}>
                <FormControl>
                    <InputLabel htmlFor="subject">Subject</InputLabel>
                    <Select
                        value={2}
                        // onChange={this.handleChange}
                        native
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>Math</MenuItem>
                        <MenuItem value={2}>Physics</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>)
};

function getStepContent(step) {
    switch (step) {
        case 0:
            return <Step1/>;
        case 1:
            return (
                <div style={{ height: "400px" }}>WYSWYG</div>
            );
        case 2:
            return (
                <div style={{ height: "400px" }}>Enrolment Type</div>
            );
        default:
            return (
                <div style={{ height: "400px" }}>Unknown step</div>
            );
    }
}

const Transition = (props) => {
    return <Slide direction="up" {...props} />;
};

@withStyles(styles, { withTheme: true })
class Assignments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openedEditor: false,
            activeStep: 0,
            skipped: new Set()
        };
    }

    render() {
        const { classes } = this.props;
        const { openedEditor, activeStep } = this.state;
        const steps = getSteps();

        const closeEditor = () => {
            this.setState({ openedEditor: false, activeStep: 0 })
        };

        const openEditor = () => {
            this.setState({ openedEditor: true })
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

        const handleReset = () => {
            this.setState({
                activeStep: 0
            });
        };

        return (
            <div>
                <Paper elevation={1}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="headline" component="h2">
                                <Book/> Assignments Management
                            </Typography>
                            <br/>
                            <div className={classes.grid}>
                                <Typography variant="body1" component="h2">
                                    You don't have any assignments at the moment.
                                </Typography>
                            </div>
                        </CardContent>
                    </Card>
                </Paper>
            </div>
        );
    }
}

export default Assignments
