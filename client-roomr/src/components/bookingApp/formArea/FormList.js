/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React, { Fragment, Component } from 'react';
import Form from './Form';
import './FormList.css';

/**
* this component renders the forms
*
* Forms can be given the following parameters:
* className - contains class name for css
* isDisabled - determines whether Form should be disabled
* data - contains data for datalists
* formAction - contains BookingApp callback
* buttonValue - contains the text for the submit button
* datalistType - contains the type for Datalist (room or user)
* datalistName - contains the id for the datalist if required
* adminForm - determines whether form is member form or admin form
* hasPassword - determines whether form has password input
* hasEmail - determines whether form has email input
* hasRoom - determines whether form has room input
* deleteEntity - determines whether form has deleteEntity input
*/

class FormList extends Component {
  state = {
    weekday: ''
  }

  componentDidMount = () => {
    const currentDate = new Date(Date.now())
    const currentDay = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(currentDate);
    this.setState({ weekday: currentDay });
  }

  render() {
    return (
      <div className="forms">
    <div className="formbox forms--blocking">
      <Form
        isDisabled={this.props.isDisabled}
        data={this.props.rooms}
        formAction={this.props.onBlockRoomSubmit}
        buttonValue="▹ reserve room"
        datalistType="room"
        datalistName="reserve"
        day={this.state.weekday}
      />
      <Form
        isDisabled={this.props.isDisabled}
        data={this.props.rooms}
        formAction={this.props.onUnblockRoomSubmit}
        buttonValue="▹ unblock room"
        datalistType="room"
        datalistName="unblock"
        day={this.state.weekday}
      />
    </div>
    <div className="forms__day-btns-box">
      <button className="forms__day-btns-box__btn" type="button" >mon</button>
      <button className="forms__day-btns-box__btn" type="button" >tue</button>
      <button className="forms__day-btns-box__btn" type="button" >wed</button>
      <button className="forms__day-btns-box__btn" type="button" >thu</button>
      <button className="forms__day-btns-box__btn" type="button" >fri</button>
    </div>
    {this.props.showSettings
          && (
          <Fragment>
            <div className="formbox forms--rooms">
              <Form
                isDisabled={this.props.isDisabled}
                formAction={this.props.onAddRoomSubmit}
                buttonValue="▹ add room"
                adminForm
                hasRoom
              />
              <Form
                className="form--delete-room"
                isDisabled={this.props.isDisabled}
                data={this.props.rooms}
                formAction={this.props.onDeleteRoomSubmit}
                buttonValue="▹ delete room"
                adminForm
                hasRoom
                datalistType="room"
                datalistName="deleteRoom"
              />
            </div>
            
            <div className="formbox forms--users">
              <Form
                className="form--add-user"
                isDisabled={this.props.isDisabled}
                formAction={this.props.onAddUserSubmit}
                buttonValue="▹ add user"
                adminForm
                hasEmail
                hasPassword
              />
              <Form
                className="form--delete-user"
                isDisabled={this.props.isDisabled}
                data={this.props.users}
                formAction={this.props.onDeleteUserSubmit}
                buttonValue="▹ delete user"
                adminForm
                hasEmail
                datalistName="deleteUser"
                datalistType="user"
              />
            </div>

            <div className="formbox forms--admins">
              <Form
                className="form--make-admin"
                isDisabled={this.props.isDisabled}
                data={this.props.usersWithoutAdmins}
                formAction={this.props.onMakeAdminSubmit}
                buttonValue="▹ make admin"
                adminForm
                hasEmail
                datalistName="makeAdmin"
                datalistType="user"
              />
              <Form
                className="form--unmake-admin"
                isDisabled={this.props.isDisabled}
                data={this.props.admins}
                formAction={this.props.onUnmakeAdminSubmit}
                buttonValue="▹ remove admin status"
                adminForm
                hasEmail
                datalistName="removeAdminStatus"
                datalistType="user"
              />
            </div>
            <div className="formbox forms--entity">
              <Form
                className="form--delete-entity"
                isDisabled={this.props.isDisabled}
                formAction={this.props.onDeleteEntitySubmit}
                buttonValue="▹ delete entity"
                adminForm
                deleteEntity
              />
            </div>
          </Fragment>
          )}
  </div>
    )
  }
};

export default FormList;
