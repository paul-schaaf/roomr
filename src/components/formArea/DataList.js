import React from 'react';

const DataList = ({ data, list }) => {
  
  const renderedOptions = data.map(roomObject => {
    return <option key={roomObject.name}value={roomObject.name}></option>
  })

  return <datalist id={list}>{renderedOptions}</datalist>;
}

export default DataList;