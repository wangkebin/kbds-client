import React, {useState, useEffect} from 'react'
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box'
import {DataGrid, GridEventListener,GridColDef} from '@mui/x-data-grid'

const columns = [
    {field: 'id', headerName: 'ID'},
    {field: 'loc', headerName: 'Location'},
    {field: 'size', headerName: 'Size'},
    {field: 'name', headerName:'FileName'}
]

const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    alert(`row "${params.row.name}" clicked`);
  };


const cntcols = [
    {field: 'size', headerName: 'Size'},
    {field: 'name', headerName:'FileName'},
    {field: 'count', headerName:'Count'}
]

const DataTable = () => {
    const [tableData, setTableData] = useState([])

    const reqOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'search':''})
    }
    useEffect(()=>{
        fetch("http://localhost:8082/v1/search", reqOptions)
        .then((data) => data.json())
        .then((data) => setTableData(data))
    },[])

    return (
        <div>
            <h2>Data Table</h2>
            <DataGrid
                rows={tableData}
                columns={columns}
                onRowClick={handleRowClick} 
            />
        </div>
    )
}

export default DataTable