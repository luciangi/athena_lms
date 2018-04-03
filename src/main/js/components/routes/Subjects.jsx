import React from "react";
import {
    Paper,
    Typography,
    withStyles
} from "material-ui";
import { connect } from "react-redux";
import {
    EditingState,
    IntegratedPaging,
    PagingState
} from "@devexpress/dx-react-grid";
import {
    ColumnChooser,
    DragDropProvider,
    Grid,
    PagingPanel,
    Table,
    TableColumnReordering,
    TableColumnVisibility,
    TableEditColumn,
    TableEditRow,
    TableHeaderRow,
    Toolbar
} from "@devexpress/dx-react-grid-material-ui";
import { Book } from "material-ui-icons";

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3
    })
});

@withStyles(styles)
@connect((store) => ({
    subjects: store.subjects.rows
}))
class Subjects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [
                { name: "name1", description: "Name1" },
                { name: "name2", description: "Name2" },
                { name: "name3", description: "Name3" },
                { name: "name4", description: "Name4" },
                { name: "name5", description: "Name5" }
            ],
            columns: [
                { name: "name", title: "Name" },
                { name: "description", title: "Description" }
            ],
            defaultOrder: [ "name", "description" ],
            defaultHiddenColumnNames: [],
            defaultCurrentPage: 0,
            pageSize: 10,
            pageSizes: [ 10, 50, 100 ]
        };
    }

    render() {
        const { classes } = this.props;
        const {
            rows,
            columns,
            defaultOrder,
            defaultHiddenColumnNames,
            defaultCurrentPage,
            pageSize,
            pageSizes
        } = this.state;
        const commitChanges = () => {
        };

        return (
            <div>
                <Paper className={classes.root} elevation={4}>
                    <Typography variant="headline" component="h3"><Book/> Subjects</Typography>
                    <Grid rows={rows} columns={columns}>
                        <EditingState onCommitChanges={commitChanges}/>
                        <PagingState
                            defaultCurrentPage={defaultCurrentPage}
                            pageSize={pageSize}/>
                        <IntegratedPaging/>
                        <DragDropProvider/>
                        <Table/>
                        <TableHeaderRow/>
                        <TableEditRow/>
                        <TableEditColumn
                            showAddCommand
                            showEditCommand
                            showDeleteCommand
                        />
                        <TableColumnReordering defaultOrder={defaultOrder}/>
                        <TableColumnVisibility defaultHiddenColumnNames={defaultHiddenColumnNames}/>
                        <Toolbar/>
                        <ColumnChooser/>
                        <PagingPanel pageSizes={pageSizes}/>
                    </Grid>
                </Paper>
            </div>
        )
    }
}

Subjects.propTypes = {};

export default Subjects
