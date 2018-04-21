import React from "react";
import {
    Paper,
    Typography,
    withStyles
} from "material-ui";
import DataTable from "../DataTable";
import { Person } from "@material-ui/icons/es/index";

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3
    })
});

@withStyles(styles)
class Tutors extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="headline" component="h3"><Person/> Tutors</Typography>
                    <DataTable profile="tutors"
                               columns={[
                                   { name: "username", title: "Username" },
                                   { name: "email", title: "Email" },
                                   { name: "firstName", title: "First Name" },
                                   { name: "lastName", title: "Last Name" },
                                   { name: "otherDetails", title: "Other Details" },
                                   { name: "active", title: "Active" }
                               ]}/>
                </Paper>
            </div>
        )
    }
};

Tutors.propTypes = {};

export default Tutors
