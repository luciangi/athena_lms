import React from "react";
import PropTypes from "prop-types";
import {
    CustomPaging,
    EditingState,
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
    TableHeaderRow,
    Toolbar
} from "@devexpress/dx-react-grid-material-ui";
import { IconButton } from "material-ui";
import {
    Add,
    Cancel,
    Delete,
    Edit,
    Save
} from "material-ui-icons";
import { connect } from "react-redux";
import {
    addData,
    changePage,
    changePageSize,
    changePageSorting,
    loadData
} from "../redux/actions";
import { dataTableInitialState } from "../redux/reducers/dataTable";

const AddButton = ({ onExecute }) => (
    <IconButton
        title="Add row"
        onClick={onExecute}>
        <Add/>
    </IconButton>
);

const EditButton = ({ onExecute }) => (
    <IconButton
        title="Edit row"
        onClick={onExecute}
    >
        <Edit/>
    </IconButton>
);

const DeleteButton = ({ onExecute }) => (
    <IconButton title="Delete row"
                color="secondary"
                onClick={onExecute}>
        <Delete/>
    </IconButton>
);

const CommitButton = ({ onExecute }) => (
    <IconButton title="Save changes"
                onClick={onExecute}>
        <Save/>
    </IconButton>
);

const CancelButton = ({ onExecute }) => (
    <IconButton title="Cancel changes"
                color="secondary"
                onClick={onExecute}>
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
    return (<CommandButton onExecute={onExecute}/>);
};

@connect((store) => ({ data: store.dataTable }))
class DataTable extends React.Component {
    componentWillMount() {
        this.props.dispatch(loadData(this.props.profile));
    }

    render() {
        const { profile, columns, data: data, dispatch } = this.props;
        const defaultOrder = columns.map((column) => column.name);
        const { rows, currentPage, totalCount, sorting } = (!!data[ profile ] && data[ profile ]) || dataTableInitialState;

        const commitChanges = ({ added, changed, deleted }) => {
            if (added) {
                dispatch(addData(profile, added[ 0 ]));
            } else if (changed) {
                // dispatch(updateData());
                console.log("CHANGED", changed)
            } else if (deleted) {
                // dispatch(deleteData());
                console.log("DELETED", deleted)
            }
        };

        return (

            <Grid rows={rows} columns={columns}>
                <SortingState sorting={sorting}
                              onSortingChange={(sorting) => dispatch(changePageSorting(profile, sorting))}
                />

                <PagingState
                    currentPage={currentPage}
                    onCurrentPageChange={(currentPage) => dispatch(changePage(profile, currentPage))}
                    onPageSizeChange={(pageSize) => dispatch(changePageSize(profile, pageSize))}
                />
                <CustomPaging totalCount={totalCount}/>

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

                <TableColumnVisibility defaultHiddenColumnNames={[]}/>

                <TableHeaderRow showSortingControls/>
                <Toolbar/>
                <ColumnChooser/>

                <PagingPanel pageSizes={[ 10, 50, 100 ]}/>
            </Grid>
        )
    }
}

DataTable.propTypes = {
    profile: PropTypes.string.isRequired,
    columns: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default DataTable
