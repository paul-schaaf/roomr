/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React, { Fragment } from 'react';
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

const FormList = props => (
  <div className="forms">
    <div className="formbox forms--blocking">
      <Form
        isDisabled={props.isDisabled}
        data={props.rooms}
        formAction={props.onBlockRoomSubmit}
        buttonValue="▹ reserve room"
        datalistType="room"
        datalistName="reserve"
      />
      <Form
        isDisabled={props.isDisabled}
        data={props.rooms}
        formAction={props.onUnblockRoomSubmit}
        buttonValue="▹ unblock room"
        datalistType="room"
        datalistName="unblock"
      />
    </div>
    <div className="forms__day-btns-box">
      <button className="forms__day-btns-box__btn" type="button" >mon</button>
      <button className="forms__day-btns-box__btn" type="button" >tue</button>
      <button className="forms__day-btns-box__btn" type="button" >wed</button>
      <button className="forms__day-btns-box__btn" type="button" >thu</button>
      <button className="forms__day-btns-box__btn" type="button" >fri</button>
    </div>
    {props.showSettings
          && (
          <Fragment>
            <div className="formbox forms--rooms">
              <Form
                isDisabled={props.isDisabled}
                formAction={props.onAddRoomSubmit}
                buttonValue="▹ add room"
                adminForm
                hasRoom
              />
              <Form
                className="form--delete-room"
                isDisabled={props.isDisabled}
                data={props.rooms}
                formAction={props.onDeleteRoomSubmit}
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
                isDisabled={props.isDisabled}
                formAction={props.onAddUserSubmit}
                buttonValue="▹ add user"
                adminForm
                hasEmail
                hasPassword
              />
              <Form
                className="form--delete-user"
                isDisabled={props.isDisabled}
                data={props.users}
                formAction={props.onDeleteUserSubmit}
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
                isDisabled={props.isDisabled}
                data={props.usersWithoutAdmins}
                formAction={props.onMakeAdminSubmit}
                buttonValue="▹ make admin"
                adminForm
                hasEmail
                datalistName="makeAdmin"
                datalistType="user"
              />
              <Form
                className="form--unmake-admin"
                isDisabled={props.isDisabled}
                data={props.admins}
                formAction={props.onUnmakeAdminSubmit}
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
                isDisabled={props.isDisabled}
                formAction={props.onDeleteEntitySubmit}
                buttonValue="▹ delete entity"
                adminForm
                deleteEntity
              />
            </div>
          </Fragment>
          )}
  </div>
);

export default FormList;
