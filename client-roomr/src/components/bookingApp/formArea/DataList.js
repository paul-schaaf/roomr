import React from 'react';

const DataList = ({ data, id, type }) => {
  if(type === 'room') {
    const renderedOptions = data.map(roomObject => {
      return <option key={roomObject.roomName}value={roomObject.roomName}></option>
    })
  
    return <datalist id={id}>{renderedOptions}</datalist>;
  }
  
  if(type === 'user') {
    const renderedUsers = data.map((userObject) => {
      return <option key={userObject} value={userObject}></option>
    })

    return <datalist id={id}>{renderedUsers}</datalist>;
  }
}

export default DataList;