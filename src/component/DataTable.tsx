import React, {useState, useEffect, useCallback} from 'react';
import Alert from '@mui/material/Alert';
import { Button, Popover } from '@mui/material';
import Box from '@mui/material/Box';
import {DataGrid, GridEventListener,GridColDef} from '@mui/x-data-grid';

import ConfigData from "../config.json"

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
    {field: 'loc', headerName: 'Location'},
    {field: 'id', headerName: 'ID'}
]



const DataTable = () => {
    const [tableData, setTableData] = useState([])
    const [tableDetailData, setDetailTableData] = useState([])

    const [fileName, setFileName] = React.useState('')
    const [fileSize, setFileSize] = React.useState('')

    const [fileId, setFileId] = React.useState('')

    const handleRowClick: GridEventListener<'rowClick'> = (params) => {
        setFileName(params.row.name)
        setFileSize(params.row.size)
      };

      const handleDetailRowClick: GridEventListener<'rowClick'> = (params) => {
        setFileId(params.row.id)
      };

    //   const handleButtonClickDeleteFile: (event: React.MouseEvent<HTMLAnchorElement>) = ()=>{
    //     alert(fileId)
    //   };

    const reqOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'search':'',
            'page':1,
            'pagesize':100
        })
    }

    const reqDetailOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify([{
            "name": fileName,
            "size": fileSize
          }])
    }

    // const reqDeleteOptions = {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify([{
    //         "id": fileId
    //       }])
    // }

    useEffect(()=>{
        fetch(ConfigData.urlDTDuplicate, reqDetailOptions)
        .then((data) => data.json())
        .then((data) => setDetailTableData(data))
    },[fileName, fileSize])

    useEffect(()=>{
        fetch(ConfigData.urlDtSearch, reqOptions)
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
                columnVisibilityModel={{
                    // Hide columns status and traderName, the other columns will remain visible
                    id: false,
                  }}
                onRowClick={handleDetailRowClick} 
                autosizeOptions={{
                    columns: ['name', 'size', 'loc'],
                    includeOutliers: true,
                    includeHeaders: false,
                }}
            /> 
            <Button
            onClick={()=>{alert(fileId)}}>Delete Selected file</Button>
        </div>
       
    )
}

export default DataTable