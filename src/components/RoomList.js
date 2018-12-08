import React from 'react';
import Room from './Room';

const RoomList = ({ data }) => {
  const renderedRooms = data.map((room,index) => {
    return <Room key={data[index].name} roomData={data[index]}/>
  })
  return (
    <React.Fragment>
      {renderedRooms}
    </React.Fragment>
  )
}

export default RoomList;