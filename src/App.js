
import React, { useEffect, useState } from 'react';



function App() {
  
  const AWS = require('aws-sdk');
  AWS.config.region = 'us-east-1';
  var table_name = "contacts-table" 
 
  const docClient = new AWS.DynamoDB.DocumentClient();

  const [contacts, setContacts] = useState([{ ContactName: "", ContactNumber: "" }]);
  const [, forceUpdate] = useState();
  
  var params = {
    TableName:table_name,
  }
  useEffect(() => {
      docClient.scan(params,(err, data) => {
        if (err) {
          console.log("Error scanning dynamoddb " +  JSON.stringify(err, null, 2));
          return {err}
        } else {
          console.log("Got value from DynamoDB");
          setContacts(data.Items)
        }
      });
    }, []);


  const addContact = (evnt) => {
    evnt.preventDefault();
    var contactName = evnt.target.elements.contactName.value
    var contactNumber = evnt.target.elements.contactNumber.value
    console.log("Add Contact "+ contactName +","+ contactNumber);
    var params = {
        TableName:table_name,
        Item:{
            "ContactName": contactName,
            "ContactNumber": contactNumber,
        }
    };
    
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            forceUpdate();
        }
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
