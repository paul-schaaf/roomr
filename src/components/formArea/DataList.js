import React from 'react';

const DataList = ({ data, list }) => {
  
  const renderedOptions = data.map(roomObject => {
    return <option key={roomObject.roomName}value={roomObject.roomName}></option>
  })

  return <datalist id={list}>{renderedOptions}</datalist>;
}

export default DataList;