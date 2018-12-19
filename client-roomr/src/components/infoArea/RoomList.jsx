import React from 'react';
import Room from './Room';

/*
* state.data that is passed down into this component holds the array of rooms in our database
* we loop over the array to create and render rooms
*/

const RoomList = ({ data }) => {
  const renderedRooms = data.map(room => <Room key={room.roomName} roomData={room} />);
  return (
    <React.Fragment>
      {renderedRooms}
    </React.Fragment>
  );
};

export default RoomList;
