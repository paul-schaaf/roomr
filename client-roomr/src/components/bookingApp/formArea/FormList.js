import React from 'react';
import Form from './Form';
import './FormList.css';

/**
* this component renders the forms
* 
* Forms can be given the following parameters:
* data - contains roomData for datalists
* formAction - contains BookingApp callback
* buttonValue - contains the text of the submit button
* datalistName - contains the id for the datalist
* select - if it exists, inputs will have time selects
* DatalistRequired - determines if input has datalist
* className - contains class names for css
* hasPassword - determines whether form has password input
* userForm - determines whether form is user form or room form
*/

const FormList = props =>  {
    return (
        <div className="forms">
          <div className="formbox forms--blocking">
            <Form 
              data={props.data}
              formAction={props.onBlockRoomSubmit}
              buttonValue="▹ reserve room"
              datalistName="reserve"
              select
            />
            <Form
              data={props.data}
              formAction={props.onUnblockRoomSubmit}
              buttonValue="▹ unblock room"
              datalistName="unblock"
              select
            />
          </div>
          {props.showSettings &&
          <React.Fragment>
            <div className="formbox forms--rooms">
              <Form
                formAction={props.onAddRoomSubmit}
                buttonValue="▹ add room"
                DataListRequired="false"
              />
              <Form
                data={props.data}
                formAction={props.onDeleteRoomSubmit}
                buttonValue="▹ delete room"
                datalistName="delete"
                className="form--delete-room"
              />
            </div>
            
            <div className="formbox forms--users">
              <Form
                formAction={props.onAddUserSubmit}
                buttonValue="▹ add user"
                userForm
                hasPassword
                className="form--add-user"
              />
              <Form
                data={props.data}
                formAction={props.onDeleteUserSubmit}
                buttonValue="▹ delete user" 
                userForm
                className="form--delete-user"
              />
            </div>
            
            <div className="formbox forms--admins">
              <Form
                data={props.data}
                formAction={props.onMakeAdminSubmit}
                buttonValue="▹ make admin"
                userForm
                className="form--make-admin"
              />
              <Form
                data={props.data}
                formAction={props.onUnmakeAdminSubmit}
                buttonValue="▹ remove admin status"
                userForm
                className="form--unmake-admin"
              />
            </div>
            <div className="formbox forms--entity">
            <Form
                data={props.data}
                formAction={props.onDeleteEntitySubmit}
                buttonValue="▹ delete entity"
                userForm
                noEmail
                deleteEntity
                className="form--delete-entity"
              />
            </div>
          </React.Fragment>}
        </div>
    )
}

export default FormList;