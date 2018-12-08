import React from 'react';

const DataList = ({ data }) => {
  
  const renderedOptions = data.map(roomObject => {
    return <option key={roomObject.name}value={roomObject.name}></option>
  })

  return <datalist id="rooms">{renderedOptions}</datalist>;
}

export default DataList;