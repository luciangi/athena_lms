import React from "react";
import {
    IconButton,
    Paper,
    Typography,
    withStyles
} from "material-ui";
import { connect } from "react-redux";
import {
    EditingState,
    FilteringState,
    IntegratedFiltering,
    IntegratedPaging,
    IntegratedSorting,
    PagingState,
    SortingState
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
    TableFilterRow,
    TableHeaderRow,
    Toolbar
} from "@devexpress/dx-react-grid-material-ui";
import {
    Add,
    Cancel,
    Delete,
    Edit,
    FolderOpen,
    Save
} from "material-ui-icons";

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3
    })
});

const AddButton = ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Add row">
        <Add/>
    </IconButton>
);

const EditButton = ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Edit row">
        <Edit/>
    </IconButton>
);

const DeleteButton = ({ onExecute }) => (
    <IconButton color="secondary" onClick={onExecute} title="Delete row">
        <Delete/>
    </IconButton>
);

const CommitButton = ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Save changes">
        <Save/>
    </IconButton>
);

const CancelButton = ({ onExecute }) => (
    <IconButton color="secondary" onClick={onExecute} title="Cancel changes">
        <Cancel/>
    </IconButton>
);

const commandComponents = {
    add: AddButton,
    edit: EditButton,
    delete: DeleteButton,
    commit: CommitButton,
    cancel: CancelButton
};

const Command = ({ id, onExecute }) => {
    const CommandButton = commandComponents[ id ];
    return (
        <CommandButton
            onExecute={onExecute}
        />
    );
};

@withStyles(styles)
@connect((store) => ({}))
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
            defaultFilters: [],
            defaultSorting: [ { columnName: "name", direction: "desc" } ],
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
            defaultFilters,
            defaultSorting,
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
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="headline" component="h3"><FolderOpen/> Subjects</Typography>
                    <Grid rows={rows} columns={columns}>
                        <FilteringState defaultFilters={defaultFilters}/>
                        <IntegratedFiltering/>

                        <SortingState defaultSorting={defaultSorting}/>
                        <IntegratedSorting/>

                        <PagingState
                            defaultCurrentPage={defaultCurrentPage}
                            pageSize={pageSize}/>
                        <IntegratedPaging/>

                        <DragDropProvider/>

                        <EditingState onCommitChanges={commitChanges}/>

                        <Table/>
                        <TableEditRow/>
                        <TableEditColumn
                            showAddCommand
                            showEditCommand
                            showDeleteCommand
                            commandComponent={Command}
                        />

                        <TableColumnReordering defaultOrder={defaultOrder}/>

                        <TableColumnVisibility defaultHiddenColumnNames={defaultHiddenColumnNames}/>

                        <TableHeaderRow showSortingControls/>
                        <TableFilterRow/>

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
