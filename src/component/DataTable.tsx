import React, {useState, useEffect, useCallback} from 'react';
import Alert from '@mui/material/Alert';
import { Popover } from '@mui/material';
import Box from '@mui/material/Box';
import {DataGrid, GridEventListener,GridColDef} from '@mui/x-data-grid'

const columns = [
    {field: 'id', headerName: 'ID'},
    //{field: 'loc', headerName: 'Location'},
    {field: 'size', headerName: 'Size'},
    {field: 'name', headerName:'FileName'},
    {field: 'count', headerName:'Count'}
]

const cntcols = [
    {field: 'size', headerName: 'Size'},
    {field: 'name', headerName:'FileName'},
    {field: 'loc', headerName: 'Location'}
   
]



const DataTable = () => {
    const [tableData, setTableData] = useState([])
    const [tableDetailData, setDetailTableData] = useState([])

    const [fileName, setFileName] = React.useState('')
    const [fileSize, setFileSize] = React.useState('')

    const handleRowClick: GridEventListener<'rowClick'> = (params) => {
        setFileName(params.row.name)
        setFileSize(params.row.size)
      };
    const reqOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'search':''})
    }

    const reqDetailOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "name": fileName,
            "size": fileSize
          })
    }

    useEffect(()=>{
        fetch("http://localhost:8082/v1/duplicates", reqDetailOptions)
        .then((data) => data.json())
        .then((data) => setDetailTableData(data))
    },[fileName, fileSize])

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
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10, 25]}
                autosizeOptions={{
                    columns: ['name'],
                    includeOutliers: true,
                    includeHeaders: false,
                }}
            />
            <h2>Details</h2>
            <DataGrid
                rows={tableDetailData}
                columns={cntcols}
                autosizeOptions={{
                    columns: ['name', 'size', 'loc'],
                    includeOutliers: true,
                    includeHeaders: false,
                }}
            />
        </div>
    )
}

export default DataTable