const mongoose = require('mongoose');

const { Schema } = mongoose;

const room = new Schema({
  roomName: {
    type: String,
    required: true,
    unique: true,
  },
  times: {
    type: Array,
    default: [
      {
        time: {
          type: String,
          default: '09:00',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '09:15',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '09:30',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '09:45',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '10:00',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '10:15',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '10:30',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '10:45',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '11:00',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '11:15',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '11:30',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '11:45',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '12:00',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '12:15',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '12:30',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '12:45',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '13:00',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '13:15',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '13:30',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '13:45',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '14:00',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '14:15',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '14:30',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '14:45',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '15:00',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '15:15',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '15:30',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '15:45',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '16:00',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '16:15',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '16:30',
        },
        availability: {
          type: String,
          default: true,
        },
      },
      {
        time: {
          type: String,
          default: '16:45',
        },
        availability: {
          type: String,
          default: true,
        },
      },
    ],
  },

});

module.exports = room;
