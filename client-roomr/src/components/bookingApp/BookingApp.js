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
* state.responseMessage saves whether all other requests(post, delete) were successful and renders dynamic error messages
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
    responseMessage:'',
    errorType:'',
    isAdmin: (this.props.match.params.isAdmin === 'admin') ? true : false,
    showSettings: false
  };

  async componentDidMount() {
    await roomrapi.handledSetRoomDataOnce(this);
    roomrapi.handledSetRoomDataLoop(this);
  };
    
  onAddRoomSubmit = async (reqData) => {
    await this.setState({ responseMessage: '', errorType: '' });
    await roomrapi.handledAddRoom(this, reqData);
    roomrapi.handledSetRoomDataOnce(this);
  }

  onDeleteRoomSubmit = async (reqData) => {
    await this.setState({ responseMessage: '', errorType: '' });
    await roomrapi.handledDeleteRoom(this, reqData);
    roomrapi.handledSetRoomDataOnce(this);
  }

  onBlockRoomSubmit = async (reqData) => {
    await this.setState({ responseMessage: '', errorType: '' });
    await roomrapi.handledBlockRoom(this, reqData);
    roomrapi.handledSetRoomDataOnce(this);
  }

  onUnblockRoomSubmit = async (reqData) => {
    await this.setState({ responseMessage: '', errorType: '' });
    await roomrapi.handledUnblockRoom(this, reqData);
    roomrapi.handledSetRoomDataOnce(this);
  }

  onAddUserSubmit = async (reqData) => {
    await this.setState({ responseMessage: '', errorType: '' });
    await roomrapi.handledAddUser(this, reqData);
    roomrapi.handledSetRoomDataOnce(this);
  }

  onDeleteUserSubmit = async (reqData) => {
    await this.setState({ responseMessage: '', errorType: '' });
    await roomrapi.handledDeleteUser(this, reqData);
    roomrapi.handledSetRoomDataOnce(this);
  }

  onMessageButtonClick = () => {
    this.setState({ responseMessage: '', errorType: '' });
  }

  onSettingsButtonClick = () => {
    this.setState({ showSettings: !this.state.showSettings });
  }

  componentWillUnmount = () => {
    roomrapi.clearRoomInterval();
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
      return <ErrorPage loginMessage={this.state.responseMessage} />
    }
    
    //request was successful and there is data in the database
    if (this.state.getStatus === "successful" && this.state.data.length > 0){
      return (
        <React.Fragment>
          {this.state.errorType === 'clientError' && <ErrorMessage errorMessage={this.state.responseMessage} onMessageButtonClick={this.onMessageButtonClick}/>}
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
              onAddUserSubmit={this.onAddUserSubmit}
              onDeleteUserSubmit={this.onDeleteUserSubmit}
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
      <React.Fragment>
        {this.state.errorType === 'clientError' && <ErrorMessage errorMessage={this.state.responseMessage} onMessageButtonClick={this.onMessageButtonClick}/>}
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
            onAddUserSubmit={this.onAddUserSubmit}
            onDeleteUserSubmit={this.onDeleteUserSubmit}
          />
        </div>
      </React.Fragment>
    )
  }
}

export default BookingPage;