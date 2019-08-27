import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';


export function UpdateView(props)
{
  const [firstname, setFirstName ] = useState('');
  const handleDelete= (e) =>
  {
    e.preventDefault();
    let accessToken = localStorage.getItem('token');
    let username = localStorage.getItem('user');

    axios.delete('https://mymovieflix.herokuapp.com/users/' + username,
    { headers: { Authorization: `Bearer ${accessToken}`}},
    {  params: { Username:username } }
    )
    .then(response =>
    {
      const data = response.data;
      window.location.href = 'https://mymovieflix.herokuapp.com/';
    })
    .catch(e =>
     {
       console.log('error deleting the user')
    });
  };
  return(

  );
}
