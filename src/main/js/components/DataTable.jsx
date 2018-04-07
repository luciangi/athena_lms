import React from "react";
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
import { IconButton } from "material-ui";
import {
    Add,
    Cancel,
    Delete,
    Edit,
    Save
} from "material-ui-icons";
import { loadData } from "../redux/actions/dataTable";
import { connect } from "react-redux";

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
    return (<CommandButton onExecute={onExecute}/>);
};

@connect((store) => ({ data: store.dataTable }))
class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultOrder: [ "name", "description" ],
            defaultHiddenColumnNames: [],
            defaultCurrentPage: 0,
            pageSize: 10,
            pageSizes: [ 10, 50, 100 ]
        };
    }

    componentWillMount() {
        this.props.dispatch(loadData(this.props.apiType));
    }

    render() {
        const { apiType, columns, defaultSorting, data: data } = this.props;
        const {
            defaultOrder,
            defaultHiddenColumnNames,
            defaultCurrentPage,
            pageSize,
            pageSizes
        } = this.state;

        const { rows } = (!!data[ apiType ] && data[ apiType ]) || { rows: [] };

        const commitChanges = () => {
        };

        return (
            <Grid rows={rows} columns={columns}>
                <FilteringState defaultFilters={[]}/>
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
        )
    }
}

DataTable.propTypes = {};

export default DataTable
