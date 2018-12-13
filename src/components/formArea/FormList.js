import React from 'react';
import Form from './Form';
import './FormList.css';

const FormList = props =>  {
    return (
        <div className="forms">
          <Form 
            data={props.data}
            formAction={props.onBlockRoomSubmit}
            buttonValue="▹ reserve room"
            datalistName="reserve"
          />
          <Form
            data={props.data}
            formAction={props.onUnblockRoomSubmit}
            buttonValue="▹ unblock room"
            datalistName="unblock"
          />
          <Form
            data={props.data}
            formAction={props.onAddRoomSubmit}
            buttonValue="▹ add room"
            DataListRequired="false"
            noSelect="true"
          />
          <Form
            data={props.data}
            formAction={props.onDeleteRoomSubmit}
            buttonValue="▹ delete room" 
            noSelect="true"
            datalistName="delete"
          />
        </div>
    )
}

export default FormList;