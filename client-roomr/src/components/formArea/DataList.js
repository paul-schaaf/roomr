import React from 'react';

const DataList = ({ data, id, required }) => {
  if (required === "false") {
    return <React.Fragment></React.Fragment>
  }
  
  const renderedOptions = data.map(roomObject => {
    return <option key={roomObject.roomName}value={roomObject.roomName}></option>
  })

  return <datalist id={id}>{renderedOptions}</datalist>;
}

export default DataList;