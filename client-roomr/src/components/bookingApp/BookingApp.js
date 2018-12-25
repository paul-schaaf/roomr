import React from 'react';
import FormList from './formArea/FormList';
import RoomList from './infoArea/RoomList';
import TimeLine from './infoArea/TimeLine';
import ErrorPage from './errorPages/ErrorPage';
import roomrapi from '../../apis/roomrapi';
import ErrorMessage from './errorPages/ErrorMessage';
import LogoutButton from './LogoutButton';
import SettingsButton from './SettingsButton';

import './BookingApp.css';

/**
* this component is responsible for rendering the app
* state.getStatus saves whether the get requests for the data in roomrapi.js were successful. If not App.js
* renders the ErrorPage.js
*
* state.errorType shows the type of error in a shorter format
*
* state.errorMessage saves whether all other requests(post, delete) were successful and renders dynamic error messages
* depending for example on the server response using ErrorMessage.js
*
* state.data holds all data received through the get requests and App.js passes that data down to the individual components
* in the case where
*
* in the case that the get request was successful but the database is empty App.js will only render the FormList component but not
* the RoomList component
*/
class BookingPage extends React.Component {
  state = {
    getStatus: 'pending',
    data: [],
    errorMessage:'',
    errorType:'',
    isAdmin: (this.props.match.params.isAdmin === 'admin') ? true : false,
    showSettings: false
  };

  async componentDidMount() {
    await roomrapi.handledSetRoomDataOnce(this);
    roomrapi.handledSetRoomDataLoop(this);
  };
    
  onAddRoomSubmit = async (reqData) => {
    await this.setState({ errorMessage: '', errorType: '' });
    await roomrapi.handledAddRoom(this, reqData);
    roomrapi.handledSetRoomDataOnce(this);
  }

  onDeleteRoomSubmit = async (reqData) => {
    await this.setState({ errorMessage: '', errorType: '' });
    await roomrapi.handledDeleteRoom(this, reqData);
    roomrapi.handledSetRoomDataOnce(this);
  }

  onBlockRoomSubmit = async (reqData) => {
    await this.setState({ errorMessage: '', errorType: '' });
    await roomrapi.handledBlockRoom(this, reqData);
    roomrapi.handledSetRoomDataOnce(this);
  }

  onUnblockRoomSubmit = async (reqData) => {
    await this.setState({ errorMessage: '', errorType: '' });
    await roomrapi.handledUnblockRoom(this, reqData);
    roomrapi.handledSetRoomDataOnce(this);
  }

  onErrorButtonClick = () => {
    this.setState({ errorMessage: '', errorType: '' });
  }

  onSettingsButtonClick = () => {
    this.setState({ showSettings: !this.state.showSettings });
  }
  
  render() { //app is awaiting server response
    if (this.state.getStatus === "pending" && this.state.errorType === '') {
      return <div>Loading...</div>
    } 

    //the request failed because the server didnt respond
    if (this.state.getStatus === "failed" && this.state.errorType === 'serverError') {
      return <ErrorPage />
    } 
    
    //errorPage for unauthorized login
    if(this.state.errorType === 'clientErrorUnauthorized') {
      return <ErrorPage loginMessage={this.state.errorMessage} />
    }

    

    
    //the user has made some error
    if (this.state.errorType === 'clientError') {
      return (
        <React.Fragment>
          <ErrorMessage errorMessage={this.state.errorMessage} onErrorButtonClick={this.onErrorButtonClick}/>
          <div className="form-area">
            <LogoutButton />
            {this.props.match.params.isAdmin &&
            <SettingsButton
              onSettingsButtonClick={this.onSettingsButtonClick}
              showSettings={this.state.showSettings}
            />}
            <FormList
              showSettings={this.state.showSettings}
              data={this.state.data}
              onAddRoomSubmit={this.onAddRoomSubmit} 
              onDeleteRoomSubmit={this.onDeleteRoomSubmit}
              onBlockRoomSubmit={this.onBlockRoomSubmit}
              onUnblockRoomSubmit={this.onUnblockRoomSubmit}
            />
          </div>
          <div className="info-area">
              <TimeLine />
            <div className="room-area">
              <RoomList data={this.state.data}/>
              
            </div>
          </div>
        </React.Fragment>
      )
    } 

    //request was successful and there is data in the database
    if (this.state.getStatus === "successful" && this.state.data.length > 0){
      return (
        <React.Fragment>
          <div className="form-area">
            <LogoutButton />
            {this.props.match.params.isAdmin &&
            <SettingsButton
              onSettingsButtonClick={this.onSettingsButtonClick}
              showSettings={this.state.showSettings}
            />}
            <FormList
              showSettings={this.state.showSettings}
              data={this.state.data}
              onAddRoomSubmit={this.onAddRoomSubmit} 
              onDeleteRoomSubmit={this.onDeleteRoomSubmit}
              onBlockRoomSubmit={this.onBlockRoomSubmit}
              onUnblockRoomSubmit={this.onUnblockRoomSubmit}
            />
          </div>
          <div className="info-area">
              <TimeLine />
            <div className="room-area">
              <RoomList data={this.state.data}/>
              
            </div>
          </div>
        </React.Fragment>
      )
    } 
    //request successful but database still empty
    return (
      <div className="form-area">
        <LogoutButton />
        {this.props.match.params.isAdmin &&
            <SettingsButton
              onSettingsButtonClick={this.onSettingsButtonClick}
              showSettings={this.state.showSettings}
            />}
        <FormList
          showSettings={this.state.showSettings}
          data={this.state.data}
          onAddRoomSubmit={this.onAddRoomSubmit} 
          onDeleteRoomSubmit={this.onDeleteRoomSubmit}
          onBlockRoomSubmit={this.onBlockRoomSubmit}
          onUnblockRoomSubmit={this.onUnblockRoomSubmit}
        />
      </div>
    )
  }
}

export default BookingPage;