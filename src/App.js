
import React, { useEffect, useState } from 'react';

import {createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const theme = createTheme({
  spacing: (factor) => `${0.25 * factor}rem`, // (Bootstrap strategy)
});

theme.spacing(2); // = 0.25 * 2rem = 0.5rem = 8px

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function App() {

  const [contacts, setContacts] = useState([{ ContactName: "", ContactNumber: "" }]);
  
  let serverIP = window.location.hostname
  const fetchURL = "http://"+serverIP+":8081/fetchAllContacts";
  const addURL = "http://"+serverIP+":8081/addContact";
  
  useEffect(() => {
    //CAll the nodejs api app
    fetch(fetchURL)
        .then((response) => {
          console.log(response);
          console.log(response.json);
          return response.json();
        }).then((data) => {
          setContacts(data.Items);
    })}, []);


  const addContact = (evnt) => {
    evnt.preventDefault();
    var contactName = evnt.target.elements.contactName.value
    var contactNumber = evnt.target.elements.contactNumber.value
    console.log("Add Contact "+ contactName +","+ contactNumber);
    const addContactURL = addURL + "?contactName=" +contactName
            +"&contactNumber="+contactNumber;
    console.log(addContactURL)
    fetch(addContactURL)
      .then((response) => {
        console.log(response.json)
        window.location.reload(false);
      });
    return;
  };
  
  return (
    <div className="App" >
      <br/>
      <h1>Contact List</h1>
      <br/>
      <TableContainer component={Paper}>
        <Table  sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead><StyledTableCell>Contact Name</StyledTableCell><StyledTableCell>Contact Number</StyledTableCell></TableHead>
          <TableBody>
            {contacts.map((value, key) => {
              return <TableRow><StyledTableCell>{value.ContactName}</StyledTableCell><StyledTableCell>{value.ContactNumber}</StyledTableCell></TableRow>
            })}
          </TableBody>
        </Table>
     </TableContainer>
      <h2>Add New Contact </h2>
      <div id="addContactForm">
       <form onSubmit={addContact}>
       <TableContainer component={Paper}>
        <Table  sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
              <TableRow><StyledTableCell> <label for="fname">Name :</label></StyledTableCell>
                <StyledTableCell><input type="text" id="contactName" name="contactName"/></StyledTableCell>
              </TableRow>
              <TableRow><StyledTableCell> <label for="lname">Contact Number:</label></StyledTableCell>
                <StyledTableCell><input type="text" id="contactNumber" name="contactNumber"/></StyledTableCell>
              </TableRow>
              <TableRow><StyledTableCell> <button type="submit">Add Contact</button></StyledTableCell></TableRow>
          </TableBody>
        </Table>
     </TableContainer>

            
        </form>
      </div>
      <br/>
    </div>
  );
}

export default App;
