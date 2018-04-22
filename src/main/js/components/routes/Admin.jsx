import React from "react";
import {
    ExpandMore,
    SettingsApplications
} from "@material-ui/icons/es/index";
import {
    Button,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Typography,
    withStyles
} from "material-ui";

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

const Admin = ({ classes }) => {
    return (
        <div>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                    <Typography className={classes.heading}><SettingsApplications/> Swagger UI</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.root}>
                    <div className={classes.row}>
                        <Typography>
                            Swagger is the world’s largest framework of API developer tools for the OpenAPI Specification(OAS),
                            enabling development across the entire API lifecycle, from design and documentation, to test and deployment.
                        </Typography>
                    </div>
                    <div className={classes.row}>
                        <Button variant="raised" color="primary" onClick={() => window.location = "/swagger-ui.html"}>Swagger UI</Button>
                    </div>
                    <div className={classes.row}>
                        <Button variant="raised" onClick={() => window.location = "https://swagger.io/specification/"}>Swagger Docs</Button>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                    <Typography className={classes.heading}><SettingsApplications/> Actuator</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.root}>
                    <div className={classes.row}>
                        <Typography>
                            Actuators are used to monitoring our app, gathering metrics, understanding traffic
                        </Typography>
                    </div>
                    <div className={classes.row}>
                        <Button variant="raised" color="primary" onClick={() => window.location = "/actuator"}>Actuator</Button>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel disabled>
                <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                    <Typography className={classes.heading}><SettingsApplications/> Spring boot admin</Typography>
                </ExpansionPanelSummary>
            </ExpansionPanel>
        </div>
    )
};

export default withStyles(styles)(Admin)
