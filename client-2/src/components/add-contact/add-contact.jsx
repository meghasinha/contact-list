import React, { Fragment , useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import styles from './add-contact.scss';

export function AddcontactView(props)
{
  const [email, setEmail] = useState('');
  const [firstname, setFirstName ] = useState('');
  const [ lastname, setLastName ] = useState('');
  const [ phone, setPhone] = useState('');
  const [photo, setPhoto] =useState('');
  const [file, setFile] =useState('');
  const [filename, setFilename] =useState('Choose file');

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    const formData = new FormData();

    console.log(firstname,lastname,email);
    formData.set('FirstName', firstname);
    formData.set('LastName', lastname);
    formData.set("Email", email);
    formData.set("Phone",phone);
    formData.append('Image',file);

    axios.post('https://myfriendlist.herokuapp.com/friends',formData, {
       headers: {
         'Content-Type': 'multipart/form-data'
       }
    })
    .then(response =>
    {
      const data = response.data;
      console.log(data);
      window.open('/friends');
    })
    .catch(e => {
    console.log('error registering the user')
    });
  };

  const onChange = e=> {
       console.log(e.target.files[0]);
       setFile(e.target.files[0]);
       setFilename(e.target.files[0].name);
     };

     const handlecancel = (e) => {
       window.open('/friends');
     };

    return (

      <div className="wrapper">
        <div className="contact-form1">
          <form>
            <div className="input-fields">
              <input type="file" className="image" placeholder="Add Photo" onChange = {onChange}/>
              <div className="first">
                <input  className ="input" type="text" placeholder="first name" value= {firstname } onChange={e => setFirstName(e.target.value)}/>
                <input className ="input" type="text" placeholder= "last name" value={lastname} onChange= {e => setLastName(e.target.value)}/>
              </div>
              <input className ="input" type="email" placeholder= "ghts@ex.com" value={email} onChange= {e => setEmail(e.target.value)}/>
              <input className ="input" type="text" placeholder= "+017623849" value={phone} onChange= {e => setPhone(e.target.value)}/>
            </div>
            <div>
            <Button  className="button4" variant="link" onClick={handleSubmit}>Save</Button>
              <Button className="button4" variant="link" onClick={handlecancel}>Cancel</Button>
            </div>
          </form>
        </div>
      </div>


    );
  }
