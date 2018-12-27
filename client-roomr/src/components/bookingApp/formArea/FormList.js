import React from 'react';
import Form from './Form';
import './FormList.css';

/*
* this component renders the four forms
* the buttonValue it passes down is the text for each submit button
* the datalistName is the identifier for each form's datalist (datalists need an identifier to link to an input)
* so both input and the datalist are given datalistName
* noSelect is given to a form if it does not require you to select a time (addRoom and deleteRoom)
* DataListRequired is passed down if no datalist is required: for addRoom, you need to choose a new name
* so a datalist wouldnt make sense
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
              data={props.data}
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
              data={props.data}
              formAction={props.onAddUserSubmit}
              buttonValue="▹ add user"
              userForm
            />
            <Form
              data={props.data}
              formAction={props.onDeleteUserSubmit}
              buttonValue="▹ delete user" 
              userForm
              deleteForm
            />
           </div>}
        </div>
    )
}

export default FormList;