import React from "react";
import {
    Assignment,
    AssignmentInd,
    ExpandMore
} from "@material-ui/icons/es/index";
import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Typography,
    withStyles
} from "material-ui";
import DataTable from "../DataTable";

const styles = theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    },
    root: {
        display: "flex",
        flexWrap: "wrap"
    },
    row: {
        flex: "1 0 100%",
        margin: "5px"
    }
});

const Tutor = ({ classes }) => {
    return (
        <div>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                    <Typography className={classes.heading}><AssignmentInd/> Active Enrolments</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.root}>
                    <div className={classes.row}>
                        <DataTable profile="enrolment"
                                   columns={[
                                       { name: "course", title: "Course" },
                                       { name: "studentFirstName", title: "Student First Name" },
                                       { name: "studentLastName", title: "Student Last Name" },
                                       { name: "enrolmentDate", title: "Enrolment Date" },
                                       { name: "completionDate", title: "Completion Date" }
                                   ]}/>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel disabled>
                <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                    <Typography className={classes.heading}><Assignment/> Submitted Assignments</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.root}>
                    <div className={classes.row}>
                        <DataTable profile="subjects"
                                   columns={[
                                       { name: "name", title: "Name" },
                                       { name: "description", title: "Description" }
                                   ]}/>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    )
};

export default withStyles(styles)(Tutor)
