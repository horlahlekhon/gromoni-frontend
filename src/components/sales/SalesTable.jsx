import React, { Fragment, useState, useCallback, useMemo } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import differenceBy from 'lodash/differenceBy';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component'
import { tableData } from '../../data/dummyTableData'
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import Badge from "react-bootstrap/Badge";

const SalesTable = (props) => {

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
          selector: 'discount',
          sortable: true,
          center:true,
      },
      ]
    const decideStatus = (status) => {
        switch (status) {
            case "PENDING":
                return <span className={`badge badge-pill pill-badge-info`}>Pending</span>
            case "CREDITED":
                return <span className={`badge badge-pill pill-badge-danger`}>Credited</span>
            case "CLEARED":
                return <span className={`badge badge-pill pill-badge-success`}>Cleared</span>
            default:
                return ""
        }
    }
    const parseData = props.data === undefined ? {} : props.data.map(payload => {
        return {
            id: payload.id,
            name: payload.product.name,
            customer: payload.customer.name,
            price: new Intl.NumberFormat('en-NG', {
                style: 'currency',
                currency: 'NGN'
            }).format(payload.sales_order.total_cost),
            discount: `${payload.product.discount.percentage_discounted}%`,
            status: decideStatus(payload.sales_order.status)
        }
    })

    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);
    const contextActions = useMemo(() => {
        const handleDelete = () => {

            if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.name)}?`)) {
                setToggleCleared(!toggleCleared);
                setData(differenceBy(props.data, selectedRows, 'name'));
                toast.success("Successfully Deleted !")
            }
        };

        return <button key="delete" className="btn btn-danger" onClick={handleDelete}>Delete</button>;
    }, [data, selectedRows, toggleCleared]);

    return (
        <DataTable
            title={props.title}
            data={parseData}
            columns={tableColumns}
            striped={true}
            center={true}
            fixedHeader={true}
            highlightOnHover={true}
            selectableRows
            persistTableHead
            contextActions={contextActions}
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleCleared}
        />

    );

};

export default SalesTable;