(this["webpackJsonpcontactlist-blog-react-app"]=this["webpackJsonpcontactlist-blog-react-app"]||[]).push([[0],{19:function(t,e){},464:function(t,e,n){"use strict";n.r(e);var c=n(4),a=n.n(c),o=n(43),r=n.n(o),s=(n(48),n(20)),b=n(2),i=n(50),l="contacts-table";var j=function(){var t=new i.DynamoDB.DocumentClient,e=Object(c.useState)([{ContactName:"",ContactNumber:""}]),n=Object(s.a)(e,2),a=n[0],o=n[1],r=Object(c.useState)(),j=Object(s.a)(r,2)[1],d={TableName:l};return Object(c.useEffect)((function(){t.scan(d,(function(t,e){if(t)return console.log("Error scanning dynamoddb "+JSON.stringify(t,null,2)),{err:t};console.log("Got value from DynamoDB"),o(e.Items)}))}),[]),Object(b.jsxs)("div",{className:"App",children:[Object(b.jsx)("h1",{children:"Contact List App"}),Object(b.jsx)("br",{}),Object(b.jsx)("h2",{children:"Contact List"}),Object(b.jsxs)("table",{children:[Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:"Contact Name"}),Object(b.jsx)("td",{children:"Contact Number"})]}),a.map((function(t,e){return Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:t.ContactName}),Object(b.jsx)("td",{children:t.ContactNumber})]})}))]}),Object(b.jsx)("br",{}),Object(b.jsx)("h2",{children:"Add New Contact "}),Object(b.jsx)("div",{id:"addContactForm",children:Object(b.jsxs)("form",{onSubmit:function(e){e.preventDefault();var n=e.target.elements.contactName.value,c=e.target.elements.contactNumber.value;console.log("Add Contact "+n+","+c);var a={TableName:l,Item:{ContactName:n,ContactNumber:c}};t.put(a,(function(t,e){t?console.error("Unable to add item. Error JSON:",JSON.stringify(t,null,2)):(console.log("Added item:",JSON.stringify(e,null,2)),j())}))},children:[Object(b.jsx)("label",{for:"fname",children:"Name :"}),Object(b.jsx)("br",{}),Object(b.jsx)("input",{type:"text",id:"contactName",name:"contactName"}),Object(b.jsx)("br",{}),Object(b.jsx)("label",{for:"lname",children:"Contact Number:"}),Object(b.jsx)("br",{}),Object(b.jsx)("input",{type:"text",id:"contactNumber",name:"contactNumber"}),Object(b.jsx)("button",{type:"submit",children:"Add Contact"})]})})]})},d=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,465)).then((function(e){var n=e.getCLS,c=e.getFID,a=e.getFCP,o=e.getLCP,r=e.getTTFB;n(t),c(t),a(t),o(t),r(t)}))};r.a.render(Object(b.jsx)(a.a.StrictMode,{children:Object(b.jsx)(j,{})}),document.getElementById("root")),d()},48:function(t,e,n){}},[[464,1,2]]]);
//# sourceMappingURL=main.ff3cd2c3.chunk.js.map