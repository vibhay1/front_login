// import { CircularProgress, TextField } from '@material-ui/core';
// import { Autocomplete } from '@material-ui/lab';
// import React, { useEffect, useState } from 'react';

// export const Search = ({handleSearch}) => {
//   const [search, setSearch] = useState([]);
//   const [value, setValue] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false)

//   // useEffect(() => {
//   //   loadData();
//   // }, [query]);
//   useEffect(() => {
//     setLoading(true);
//     const timeoutId = setTimeout(() => {
//       if (value !== null){
//         handleSearch(value);
//       }     
//     }, 500);
//     return () => {
//       setLoading(false);
//       clearTimeout(timeoutId);
//     };
//   }, [value]);

// const handleChange=(e)=>{
// setValue(e.target.value)
// }
//   return (
//     <Autocomplete
//       id="asynchronous-demo"
//       sx={{ width: 300 }}
//       open={open}
//       onOpen={() => {
//         setOpen(true);
//       }}
//       onClose={() => {
//         setOpen(false);
//       }}
//       // isOptionEqualToValue={(option, value) => option.title === value.title}
//       // getOptionLabel={(option) => option.title}
//       // options={options}
//       loading={loading}
//       renderInput={(search) => (
//         <TextField
//           {...search}
//           label="search"
//           onChange={handleChange}
//           value={value}
//           InputProps={{
//             ...search.InputProps,
//             endAdornment: (
//               <React.Fragment>
//                 {loading ? <CircularProgress color="inherit" size={20} /> : null}
//                 {search.InputProps.endAdornment}
//               </React.Fragment>
//             ),
//           }}
//         />
//       )}
//     />
//   )
// }
