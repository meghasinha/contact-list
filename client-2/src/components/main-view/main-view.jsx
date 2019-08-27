import React from 'react';
import axios from 'axios';
// import react router
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import { FriendCard } from '../friend-card/friend-card';
import styles from './main-view.scss';
import Button from 'react-bootstrap/Button';
import{UpdateView} from '../update-view/update-view'
import{AddcontactView} from '../add-contact/add-contact'


export class MainView extends React.Component {
  constructor() {
    // Call the superclass constructor
    // so React can initialize it
    super();

    // Initialize the state to an empty object so we can destructure it later
    this.state = { friends:null, newcontact:null};
  }
  componentDidMount() {
    axios.get('https://myfriendlist.herokuapp.com/friends')
      .then(response => {
        // Assign the result to the state
        this.setState({
          friends: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  addContact(value){
     this.setState({
       newcontact: value
     });
   }


  // This overrides the render() method of the superclass
  // No need to call super() though, as it does nothing by default
  render() {
    const {friends, newcontact} = this.state
    const{ addContact } = this.props;
    let update = localStorage.getItem('updateContact');
    if(friends == null) return (
      <div className ="main-view"/>
     );
     if (newcontact == null ) return (
    <Router>
      <div className="main-view">
      <div className= "contact">
            <p className="contact1">My contact</p>
            <Button className="add2" onClick={()=>{
              this.addContact(1);
            } } variant="link"><p> <Link to={'/newContact'}>+</Link></p></Button>
      </div>
      <Route path="/update/:firstname" render={({ match }) => {
          return <UpdateView/>} }/>
      {
        friends.map(friend => (
        <FriendCard key={friend._id} friend={friend}/>
      ))}
      </div>

    </Router>
    );
return (
      <Router>
        <Route path="/newContact" render={({ match }) => {
          return <AddcontactView/>}}/>
     </Router>
     );
   }
 }
