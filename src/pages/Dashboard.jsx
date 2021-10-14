import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
// import { styled } from '@material-ui/styles';
import axios from '../api/myServer';
import Auth from '../auth';
import { TableList } from '../component/TableList';
import { Pagination } from '@material-ui/lab';
import { Toaster } from '../component/Toaster';
// const Input = styled('input')({
//   display: 'none',
// });
const serialize = function (obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}
const Dashboard = ({ isLogged ,handleEdit}) => {
  const [userList, setUserList] = useState([]);
  const [deBounce, setDeBounce] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState({});
  const [toast, setToast] = useState(false);
  const [auth,setAuth]=useState(isLogged?'YES':'NO');
  const [query, setQuery] = useState({
    sortBy: 'date',
    orderBy: 'desc',
    search: "",
    count: 10,
    page: 1
  });
  const tableHead = ['User Name', 'Email', 'Gender', 'Interest', 'Action'];

  const loadData = async () => {
    const { data } = await axios.get(`/users?${serialize(query)}&auth=${auth}`);
    setUserList(data.data);
    setTotalPage(Math.ceil(data.total / query.count));
  }

  useEffect(() => {
    loadData();
  }, [query]);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (deBounce !== null)
        setQuery({ ...query, search: deBounce });
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };

  }, [deBounce]);



  // const handleFilter = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   setQuery({ ...query, [name]: value, page: 1 });
  // }
  const handlePagination = (e, pageNo) => {
    setQuery({ ...query, page: pageNo });
  }

  const handleDelete =async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete('/user?id='+id+'&auth='+auth);
      setToastMsg(data);
      setToast(true);
      loadData();
    } catch (error) {
      if (error.response) {
        setToastMsg(error.response.data);
        setToast(true);
      }
    }
    setLoading(false);
  }



  const renderTableHead = () => {
    return tableHead.map(item => {
      return <TableCell key={item} >

        <Typography variant="h6" component="h6">
          {item}
        </Typography>
      </TableCell>;
    })
  }



  if (userList.length === 0) return "loading..";
  return (
    <>
      {toast ? <Toaster data={toastMsg} /> : ""}
      <Box component="main" sx={{ boxShadow: 0, pl: 4, pr: 4, m: 2 }}>
        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {renderTableHead()}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableList items={userList} handleDelete={handleDelete} handleEdit={handleEdit}/>
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination count={totalPage} page={query.page} onChange={handlePagination} />
      </Box>
    </>
  );
}

export default Dashboard
