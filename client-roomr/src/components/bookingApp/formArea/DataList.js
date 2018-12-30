/* eslint-disable react/jsx-filename-extension */
import React from 'react';

const DataList = ({ data, id, type }) => {
  if (type === 'room') {
    const renderedOptions = data
      .map(roomObject => <option key={roomObject.roomName} value={roomObject.roomName} />);

    return <datalist id={id}>{renderedOptions}</datalist>;
  }


  const renderedUsers = data.map(userObject => <option key={userObject} value={userObject} />);

  return <datalist id={id}>{renderedUsers}</datalist>;
};

export default DataList;
