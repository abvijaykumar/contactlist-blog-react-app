
import React, { useEffect, useState } from 'react';

function App() {

  const [contacts, setContacts] = useState([{ ContactName: "", ContactNumber: "" }]);
  const [, forceUpdate] = useState();
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
    const addContactURL = addURL + "?contactName=" +contactName+"&contactNumber="+contactNumber;
    console.log(addContactURL)
    fetch(addContactURL)
      .then((response) => {
        console.log(response.json)
      });
    return;
  };
  
  return (
    <div className="App">
      <h1>Contact List App</h1>
      <br/>
      <h2>Contact List</h2>
      <table>
        <tr><td>Contact Name</td><td>Contact Number</td></tr>
          {contacts.map((value, key) => {
            return <tr><td>{value.ContactName}</td><td>{value.ContactNumber}</td></tr>
          })}
      </table>
      <br/>
      <h2>Add New Contact </h2>
      <div id="addContactForm">
        <form onSubmit={addContact}>
            <label for="fname">Name :</label><br/>
            <input type="text" id="contactName" name="contactName"/><br/>
            <label for="lname">Contact Number:</label><br/>
            <input type="text" id="contactNumber" name="contactNumber"/>
            <button type="submit">Add Contact</button>
        </form>
      </div>

    </div>
  );
}

export default App;
