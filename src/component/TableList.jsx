import React from 'react';
import {  Box, TableCell, TableRow } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import {useHistory} from 'react-router-dom';
export const TableList = ({ items,handleDelete,handleEdit}) => {
  const history= useHistory();
  const handleEdited =(id)=>{
    handleEdit(id);
    history.push('/edit');
  }
  return (
    <>
      {items.map((item) => (
      <TableRow key={item.id}>
      <TableCell >{item.userName}</TableCell>
      <TableCell >{item.email}</TableCell>
      <TableCell >{item.gender}</TableCell>
      <TableCell >{item.interest}</TableCell>
      <TableCell >
        <Box sx={{display:'inline-block',ml:0.5,mr:0.5}}>
        <EditIcon onClick={()=>{
          handleEdited(item.id)
        }} cursor="pointer" color="primary"/>
        </Box>
        <Box sx={{display:'inline-block',ml:0.5,mr:0.5}}>
        <DeleteOutlineIcon  onClick={()=>{if(window.confirm("Do you want to delete"))handleDelete(item.id)}} cursor="pointer" color="secondary"/>
        </Box>
        </TableCell>
    </TableRow>
      ))}
    </>
  )
}
