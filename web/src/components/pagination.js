import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function pagination(props) {

    const paginationStyle = {
        margin:"20px",
        color:"black !important"
    }

  return (
    <div style={paginationStyle}>
        <Stack spacing={2}>
            <Pagination 
              style={{margin:"auto"}}
              count={props.numberOfPages} 
              page={props.pageNumber} 
              color="primary"
              onChange={props.changePage} 
            />
        </Stack>
    </div>
  )
}
