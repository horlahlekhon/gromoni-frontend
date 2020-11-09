import React, {useState} from 'react';
import DataTable from 'react-data-table-component'
import {CardBody} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import PropTypes from 'prop-types';


const Table = (props) => {
    // const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared,] = useState(false);
    const totalRows = props.data.totalRows
    const paging = {persistSelectedOnPageChange: false, persistSelectedOnSort: false}

    return (
        <CardBody>
            {
                props.tableHeader ?
                    <props.tableHeader
                        {...props.headerProps}
                    />
                    :
                    ""
            }
            <DataTable
                data={props.data.results}
                columns={props.tableColumns}
                striped={true}
                center={true}
                fixedHeader={true}
                highlightOnHover={true}
                // selectableRows
                persistTableHead
                pagination
                paginationServer
                noHeader
                selectsRange
                // contextActions={contextActions}
                // onSelectedRowsChange={handleRowSelected}
                clearSelectedRows={toggleCleared}
                paginationServerOptions={paging}
                paginationTotalRows={totalRows}
                onChangePage={e => props.handlePageChange(e)}
                onChangeRowsPerPage={e => props.handlePerRowsChange(e)}
            />
        </CardBody>


    )
        ;

};


Table.prototype = {
    title: PropTypes.string,
    data: PropTypes.exact({
        results: PropTypes.array,
        totalRow: PropTypes.number,
    }),
    tableHeader: PropTypes.element,
    tableColumns: PropTypes.array.isRequired,
    headerProps: PropTypes.exact({
        handleSearch: PropTypes.func,
        filter: PropTypes.func,
        business: PropTypes.string
    }),
    handlePageChange: PropTypes.func,
    handlePerRowsChange: PropTypes.func,
    perPage: PropTypes.number
}

export default React.memo(Table);