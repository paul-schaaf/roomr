import React from 'react';
import Room from './Room';

/*
* state.rooms that is passed down into this component as data holds the array of rooms in the database
* we loop over the array to create and render rooms
*/

const RoomList = ({ data }) => {
  const renderedRooms = data.map((room) => {
    return <Room key={room.roomName} roomData={room}/>
  })
  return (
    <React.Fragment>
      {renderedRooms}
    </React.Fragment>
  )
}

export default RoomList;