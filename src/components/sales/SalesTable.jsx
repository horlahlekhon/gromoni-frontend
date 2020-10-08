import React, { Fragment, useState, useCallback, useMemo } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import differenceBy from 'lodash/differenceBy';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component'
import { tableData } from '../../data/dummyTableData'
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';

const SalesTable = () => {

    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [data, setData] = useState(tableData);

    const tableColumns = [
        {
            name: 'Product name',
            selector: 'name', 
            sortable: true,
            center:true,
        },
        {
            name: 'Purchased By',
            selector: 'customer',
            sortable: true,
            center:true,
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: true,
            center:true,
        },
        {
            name: 'Price',
            selector: 'price',
            sortable: true,
            center:true,
        },
        {
          name: 'Discount',
          selector: 'discounnt',
          sortable: true,
          center:true,
      },
      ]


    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);
    const contextActions = useMemo(() => {
        const handleDelete = () => {

            if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.name)}?`)) {
                setToggleCleared(!toggleCleared);
                setData(differenceBy(data, selectedRows, 'name'));
                toast.success("Successfully Deleted !")
            }
        };

        return <button key="delete" className="btn btn-danger" onClick={handleDelete}>Delete</button>;
    }, [data, selectedRows, toggleCleared]);

    return (
        <DataTable
            data={data}
            columns={tableColumns}
            striped={true}
            center={true}
            selectableRows
            persistTableHead
            contextActions={contextActions}
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleCleared}
        />

    );

};

export default SalesTable;