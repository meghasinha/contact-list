import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import styles from './update-view.scss';


export function UpdateView(props)
{
  const [email, setEmail] = useState('');
  const [firstname, setFirstName ] = useState('');
  const [lastname, setLastName ] = useState('');
   const [ phone, setPhone] = useState('');
//updating the contact
   const handleUpdate = (e) =>
   {
     e.preventDefault();
     let firstName = localStorage.getItem('firstname');
     console.log(email,firstname, lastname, phone);

     axios.put(`https://myfriendlist.herokuapp.com/friends/`+ firstName,
      {
       FirstName:firstname,
       LastName: lastname,
       Phone: phone,
       Email: email
     })
     .then(response =>
      {
       const data = response.data;
        window.open('/');
     })
     .catch(e =>
      {
        console.log('error updating the user')
     });
   };

 const handlecancel = (e) => {
   window.open('/');
 };

return (
  <div className="wrapper">
    <div className="contact-form">
    <form>
      <div className="input-fields">
        <div className="first">
          <input  className ="input" type="text" placeholder="first name" value= {firstname } onChange={e => setFirstName(e.target.value)}/>
          <input className ="input" type="text" placeholder= "last name" value={lastname} onChange= {e => setLastName(e.target.value)}/>
        </div>
        <input className ="input" type="email" placeholder= "ghts@ex.com" value={email} onChange= {e => setEmail(e.target.value)}/>
        <input className ="input" type="text" placeholder= "+017623849" value={phone} onChange= {e => setPhone(e.target.value)}/>
      </div>
      <div>
       <Button className="button4" variant="link" onClick={handleUpdate}>Update</Button>
       <Button className="button4" variant="link" onClick={handlecancel}>cancel</Button>
       </div>
     </form>
    </div>
 </div>
);
}
