
import React, { useEffect, useState } from 'react';

import {fromInstanceMetadata} from "@aws-sdk/credential-provider-imds";

const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

//const {fromIni} = require("@aws-sdk/credential-provider-ini");

//AWS.config.credentials = new AWS.EC2MetadtaCredentials();
//AWS.config.update({region: "us-east-1"});
var table_name = "contacts-table" ;

function App() {
  //const configDynamoDB = {
    //version: 'latest',
    //region: "us-east-1",
    //role_arn: "arn:aws:iam::141129659891:role/pulumi-blog-ec2-role-a797dd0",
    //credential_source: "Ec2InstanceMetadata"
    /*credentials: 
    {
        accessKeyId: "AKIASBW73WXZ4RRQGDW5", 
        secretAccessKey: "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"
    } */
  //};

  const cred = fromInstanceMetadata({timeout: 1000, maxRetries: 0});
  console.log(cred);

  const docClient = new DynamoDBClient({region: "us-east-1", credentials: cred});

  const [contacts, setContacts] = useState([{ ContactName: "", ContactNumber: "" }]);
  const [, forceUpdate] = useState();
  
  var params = {
    TableName:table_name,
  }
  useEffect(() => {
    docClient.send(new ScanCommand(params)).then(
        (data) => {
          // process data.
          //setContacts(JSON.stringify(data.Items))
          console.log(data.Items)
          console.log(JSON.stringify( data.Items, null, 2))
          var newcontacts = [];
          data.Items.map((item) => {
            const name = item.ContactName.S;
            const number = item.ContactNumber.S;
            newcontacts.push({"ContactName": name, "ContactNumber":number});
            console.log(newcontacts);
            setContacts(newcontacts);
          })

        },
        (error) => {
          // error handling.
          console.log("Error scanning dynamoddb " +  JSON.stringify(error, null, 2));
          console.log(error);
          return {error}
        }
      );
      
        /*
      docClient.scan(params,(err, data) => {
        if (err) {
          console.log("Error scanning dynamoddb " +  JSON.stringify(err, null, 2));
          return {err}
        } else {
          console.log("Got value from DynamoDB");
          setContacts(data.Items)
        }
      });*/
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
    /*
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            forceUpdate();
        }
    });*/
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
