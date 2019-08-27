import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

export function AddcontactView(props)
{
  const [email, setEmail] = useState('');
  const [firstname, setFirstName ] = useState('');
  const [ lastname, setLastName ] = useState('');
  const [ phone, setPhone] = useState('');
  const [photo, setPhoto] =useState('');

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    console.log(firstname,lastname, email, phone, photo);
    axios.post('https://myfriendlist.herokuapp.com/friends',
     {
      FirstName: firstname,
      LastName: lastname,
      Email: email,
      Phone: phone
    })
    .then(response =>
    {
      const data = response.data;
      console.log(data);
      window.open('/');
    })
    .catch(e => {
    console.log('error registering the user')
    });
  };
    return (
      <Form>
        <div className="form-group">
        <Form.Group controlId="formBasicUsername">
          <Form.Label>FirstName</Form.Label>
          <Form.Control size="sm" type="text" placeholder=" Firstname" value={firstname} onChange={e => setFirstName(e.target.value)} />
        </Form.Group>
        <Form.Label>LastName</Form.Label>
        <Form.Control size="sm" type="text" placeholder=" Lastname" value={lastname} onChange={e => setLastName(e.target.value)} />
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control  size="sm" type="email" placeholder="mail@example.com"  value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group >
        <div>
        <Button variant="link" onClick={handleSubmit}>Save</Button>
        <Button variant="link" onClick={handlecancel}>cancel</Button>
        </div>
        </div>
      </Form>
    );
  }
