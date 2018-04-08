import React from "react";
import {
    Paper,
    Typography,
    withStyles
} from "material-ui";
import { PersonOutline } from "material-ui-icons";
import DataTable from "../DataTable";

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3
    })
});

@withStyles(styles)
class Students extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="headline" component="h3"><PersonOutline/> Students</Typography>
                    <DataTable profile="students"
                               columns={[
                                   { name: "username", title: "Username" },
                                   { name: "email", title: "Email" },
                                   { name: "firstName", title: "First Name" },
                                   { name: "lastName", title: "Last Name" },
                                   { name: "address", title: "Address" },
                                   { name: "otherDetails", title: "Other Details" },
                                   { name: "active", title: "Active" }
                               ]}/>
                </Paper>
            </div>
        )
    }
}

Students.propTypes = {};

export default Students
