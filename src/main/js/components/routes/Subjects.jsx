import React from "react";
import {
    Paper,
    Typography,
    withStyles
} from "material-ui";
import DataTable from "../DataTable";
import { FolderOpen } from "@material-ui/icons/es/index";
import { isAdminUser } from "../../redux/actions";

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3
    })
});

@withStyles(styles)
class Subjects extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="headline" component="h3"><FolderOpen/> Subjects</Typography>
                    <DataTable profile="subjects"
                               columns={[
                                   { name: "name", title: "Name" },
                                   { name: "description", title: "Description" }
                               ]}
                               showAddCommand={isAdminUser()}
                               showEditCommand={isAdminUser()}
                               showDeleteCommand={isAdminUser()}
                    />
                </Paper>
            </div>
        )
    }
}

Subjects.propTypes = {};

export default Subjects
