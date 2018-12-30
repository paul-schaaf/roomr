import React from 'react';
import FormList from './formArea/FormList';
import RoomList from './infoArea/RoomList';
import TimeLine from './infoArea/TimeLine';
import ResponsePage from './specialPages/ResponsePage';
import LoadingPage from './specialPages/LoadingPage';
import roomrapi from '../../apis/roomrapi';
import ResponseMessage from './ResponseMessage';
import LogoutButton from './LogoutButton';
import SettingsButton from './SettingsButton';

import './BookingApp.css';

/**
* this component is responsible for rendering the booking app
* state.getStatus saves whether the get requests for the data in roomrapi.js were successful. If not BookingApp.js
* renders the ErrorPage.js
*
* state.errorType shows the type of error in a shorter format
*
* state.responseMessage saves whether all other requests(post, delete)
* were successful and renders dynamic responses
* using ResponseMessage.js
*
* state.data, users, admins, and usersWithoutAdmins hold all data received
* through the get requests and BookingApp.js passes that data down to the individual components
*
* in the case that the get request was successful but the database is empty BookingApp.js
* will only render the FormList component but not
* the RoomList component
*/
class BookingPage extends React.Component {
  state = {
    getStatus: 'pending',
    data: [],
    users: [],
    admins: [],
    usersWithoutAdmins: [],
    responseMessage:'',
    errorType:'',
    isAdmin: (this.props.match.params.isAdmin === 'admin') ? true : false,
    showSettings: false,
    entityDeleted: false
  };

  async componentDidMount() {
    await roomrapi.handledGetRoomDataOnce(this);
    roomrapi.handledGetRoomDataLoop(this);
    if(this.state.isAdmin) {
      await roomrapi.handledGetUserDataOnce(this);
      roomrapi.handledGetUserDataLoop(this);
    }
  };
    
  onAddRoomSubmit = async (reqData) => {
    await this.setState({ responseMessage: '', errorType: '' });
    await roomrapi.handledAddRoom(this, reqData);
    roomrapi.handledGetRoomDataOnce(this);
  }

  onDeleteRoomSubmit = async (reqData) => {
    await this.setState({ responseMessage: '', errorType: '' });
    await roomrapi.handledDeleteRoom(this, reqData);
    roomrapi.handledGetRoomDataOnce(this);
  }

  onBlockRoomSubmit = async (reqData) => {
    await this.setState({ responseMessage: '', errorType: '' });
    await roomrapi.handledBlockRoom(this, reqData);
    roomrapi.handledGetRoomDataOnce(this);
  }

  onUnblockRoomSubmit = async (reqData) => {
    await this.setState({ responseMessage: '', errorType: '' });
    await roomrapi.handledUnblockRoom(this, reqData);
    roomrapi.handledGetRoomDataOnce(this);
  }

  onAddUserSubmit = async (reqData) => {
    await this.setState({ responseMessage: '', errorType: '' });
    await roomrapi.handledAddUser(this, reqData);
    roomrapi.handledGetRoomDataOnce(this);
    roomrapi.handledGetUserDataOnce(this);
  }

  onDeleteUserSubmit = async (reqData) => {
    await this.setState({ responseMessage: '', errorType: '' });
    await roomrapi.handledDeleteUser(this, reqData);
    roomrapi.handledGetRoomDataOnce(this);
    roomrapi.handledGetUserDataOnce(this);
  }

  onMakeAdminSubmit = async (reqData) => {
    await this.setState({ responseMessage: '', errorType: '' });
    await roomrapi.handledMakeAdmin(this, reqData);
    roomrapi.handledGetRoomDataOnce(this);
    roomrapi.handledGetUserDataOnce(this);
  }

  onUnmakeAdminSubmit = async (reqData) => {
    await this.setState({ responseMessage: '', errorType: '' });
    await roomrapi.handledUnmakeAdmin(this, reqData);
    roomrapi.handledGetRoomDataOnce(this);
    roomrapi.handledGetUserDataOnce(this);
  }

  onDeleteEntitySubmit = async (reqData) => {
    await this.setState({ responseMessage: '', errorType: '' });
    await roomrapi.handledDeleteEntity(this, reqData);
    await roomrapi.handledGetRoomDataOnce(this);
    this.setState({ entityDeleted: true });
    roomrapi.clearRoomInterval();
    roomrapi.clearUserInterval();
  }

  onMessageButtonClick = () => {
    this.setState({ responseMessage: '', errorType: '' });
  }

  onSettingsButtonClick = () => {
    this.setState({ showSettings: !this.state.showSettings });
  }

  componentWillUnmount = () => {
    roomrapi.clearRoomInterval();
    roomrapi.clearUserInterval();
  }

  render() { //app is awaiting server response
    if (this.state.getStatus === "pending" && this.state.errorType === '') {
      return <LoadingPage />
    } 
    
    //the request failed because the server didnt respond
    if (this.state.getStatus === "failed") {
      return <ResponsePage />
    } 
    
    //errorPage for unauthorized access
    if(this.state.errorType === 'clientErrorUnauthorized') {
      return <ResponsePage entityDeleted={this.state.entityDeleted}loginMessage={this.state.responseMessage} />
    }
    
    //request was successful
    if (this.state.getStatus === "successful"){
      return (
        <React.Fragment>
          {this.state.errorType === 'clientError' && <ResponseMessage clientError responseMessage={this.state.responseMessage} onMessageButtonClick={this.onMessageButtonClick}/>}
          {!this.state.errorType && this.state.responseMessage && <ResponseMessage responseMessage={this.state.responseMessage} onMessageButtonClick={this.onMessageButtonClick}/>}
          <div className="form-area">
            <LogoutButton />
            {this.props.match.params.isAdmin &&
            <SettingsButton
              onSettingsButtonClick={this.onSettingsButtonClick}
              showSettings={this.state.showSettings}
            />}
            <FormList
              isDisabled={(this.state.responseMessage === 'loading') ? true : false}
              showSettings={this.state.showSettings}

              users={this.state.users}
              admins={this.state.admins}
              usersWithoutAdmins={this.state.usersWithoutAdmins}
              data={this.state.data}
              onAddRoomSubmit={this.onAddRoomSubmit} 
              onDeleteRoomSubmit={this.onDeleteRoomSubmit}
              onBlockRoomSubmit={this.onBlockRoomSubmit}
              onUnblockRoomSubmit={this.onUnblockRoomSubmit}
              onAddUserSubmit={this.onAddUserSubmit}
              onDeleteUserSubmit={this.onDeleteUserSubmit}
              onMakeAdminSubmit={this.onMakeAdminSubmit}
              onUnmakeAdminSubmit={this.onUnmakeAdminSubmit}
              onDeleteEntitySubmit={this.onDeleteEntitySubmit}
            />
          </div>
           {/**
            * only show info-area if there are rooms in the database
            */}
          {this.state.data.length > 0 && <div className="info-area">
              <TimeLine />
            <div className="room-area">
              <RoomList data={this.state.data}/>
            </div>
          </div>}
        </React.Fragment>
      )
    } 
    return <div></div>
  }
}

export default BookingPage;