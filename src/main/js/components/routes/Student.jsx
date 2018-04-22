import React from "react";
import {
    Assignment,
    Book,
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

const Student = ({ classes }) => {
    return (
        <div>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                    <Typography className={classes.heading}><Book/> Resume Course</Typography>
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
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                    <Typography className={classes.heading}><Assignment/> Due Assignments</Typography>
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

export default withStyles(styles)(Student)
