import React from 'react';

const DataList = ({ data, id }) => {
  const renderedOptions = data.map(roomObject => {
    return <option key={roomObject.roomName}value={roomObject.roomName}></option>
  })

  return <datalist id={id}>{renderedOptions}</datalist>;
}

export default DataList;