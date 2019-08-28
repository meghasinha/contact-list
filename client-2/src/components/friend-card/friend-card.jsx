import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import styles from './friend-card.scss';
export class FriendCard extends React.Component {
//deleting the contact
handleDelete = e => {
   e.preventDefault();
   let firstName = localStorage.getItem('firstname');
   console.log(firstName);
   axios.delete(`https://myfriendlist.herokuapp.com/friends/`+ firstName)
   .then(response =>
   {
     const data = response.data;
     window.open('/');
   })
   .catch(e =>
    {
      console.log('error deleting the user');
      window.open('/');
   });
}

  render() {
    const { friend, handleDelete  } = this.props;
   localStorage.setItem('updateContact', 0);
    return (
      <ul>
        <li id="display">
          <span><img className="image" src={"/"+friend.Photo}/></span>
           <span> {friend.FirstName + " " +friend.LastName}</span>
            <span> {friend.Email} </span>
              <Button  onClick={()=>{
                localStorage.setItem('firstname', friend.FirstName);
                localStorage.setItem('lastname', friend.LastName);
                localStorage.setItem('email', friend.Email);
                localStorage.setItem('phone', friend.Phone);
                localStorage.setItem('updateContact', 1);
              } } variant="link"><p> <Link to={'/update/'+friend.FirstName}id="button2" ><i className="fa">&#9998;</i></Link></p></Button>
                <Button  onClick={e=>{
                  localStorage.setItem('firstname', friend.FirstName);
                  this.handleDelete(e);
                } } variant="link"><i className="fa">&#10005;</i></Button>
        </li>
        </ul>

    );
  }
}
