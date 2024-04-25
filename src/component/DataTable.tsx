import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box'
import {DataGrid, GridColDef} from '@mui/x-data-grid'

const columns = [
    {field: 'id', headerName: 'ID'},
    {field: 'loc', headerName: 'Location'},
    {field: 'size', headerName: 'Size'},
    {field: 'name', headerName:'FileName'}
]

const DataTable = () => {
    const [tableData, setTableData] = useState([])

    const reqOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'search':'string'})
    }
    useEffect(()=>{
        fetch("http://localhost:8082/v1/search", reqOptions)
        .then((data) => data.json())
        .then((data) => setTableData(data))
    })

    return (
        <div>
            <h2>Data Table</h2>
            <DataGrid
                rows={tableData}
                columns={columns}
            />
        </div>
    )
}

export default DataTable