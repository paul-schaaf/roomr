import React from 'react';
import Form from './Form';
import './FormList.css';

/*
* this component renders the forms
* the buttonValue it passes down is the text for each submit button
* the datalistName is the identifier for each form's datalist (datalists need an identifier to link to an input)
* so both input and the datalist are given datalistName
* select is given to a form if it does require you to select a time
* DataListRequired is passed down if no datalist is required: e.g. for addRoom, you need to choose a new name
* so a datalist wouldnt make sense
* the --users modifier is used for the forms only admins have access to
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
            />
          </div>}
          {props.showSettings &&
          <div className="formbox forms--users">
            <Form
              formAction={props.onAddUserSubmit}
              buttonValue="▹ add user"
              userForm
              hasPassword
            />
            <Form
              data={props.data}
              formAction={props.onDeleteUserSubmit}
              buttonValue="▹ delete user" 
              userForm
            />
           </div>}
          {props.showSettings &&
          <div className="formbox forms--admins">
            <Form
              data={props.data}
              formAction={props.onMakeAdminSubmit}
              buttonValue="▹ make admin"
              userForm
            />
            <Form
              data={props.data}
              formAction={props.onUnmakeAdminSubmit}
              buttonValue="▹ remove admin status"
              userForm
            />
          </div>}
        </div>
    )
}

export default FormList;