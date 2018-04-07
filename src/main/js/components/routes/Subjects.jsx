import React from "react";
import {
    Paper,
    Typography,
    withStyles
} from "material-ui";
import { connect } from "react-redux";
import { FolderOpen } from "material-ui-icons";
import DataTable from "../DataTable";

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3
    })
});

@withStyles(styles)
@connect((store) => ({}))
class Subjects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { classes } = this.props;
        const {} = this.state;

        return (
            <div>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="headline" component="h3"><FolderOpen/> Subjects</Typography>
                    <DataTable apiType="subjects"
                               columns={[
                                   { name: "name", title: "Name" },
                                   { name: "description", title: "Description" }
                               ]}
                               defaultSorting={[
                                   { columnName: "name", direction: "desc" }
                               ]}
                    />
                </Paper>
            </div>
        )
    }
}

Subjects.propTypes = {};

export default Subjects
