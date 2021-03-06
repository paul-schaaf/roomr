/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import DataList from './DataList';
import InputTimes from './InputTimes';
import './Form.css';

// this component renders forms based on the input given from FormList.js (see there for more info)

const timeArray = [
  '09:00',
  '09:15',
  '09:30',
  '09:45',
  '10:00',
  '10:15',
  '10:30',
  '10:45',
  '11:00',
  '11:15',
  '11:30',
  '11:45',
  '12:00',
  '12:15',
  '12:30',
  '12:45',
  '13:00',
  '13:15',
  '13:30',
  '13:45',
  '14:00',
  '14:15',
  '14:30',
  '14:45',
  '15:00',
  '15:15',
  '15:30',
  '15:45',
  '16:00',
  '16:15',
  '16:30',
  '16:45',
  '17:00',
];

class Form extends Component {
  state = {
    start: '09:00',
    end: '09:15',
    room: '',
    email: '',
    password: '',
    entity: '',
  }

  // see InputTimes.js for explanation for this function
  componentDidUpdate() {
    const indexStart = timeArray.indexOf(this.state.start);
    const indexEnd = timeArray.indexOf(this.state.end);
    if (indexEnd < indexStart) {
      this.setState({ end: timeArray[indexStart + 1] });
    }
  }

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }


  onRoomFormSubmit = (event) => {
    event.preventDefault();
    if (!this.props.isDisabled) {
      this.props.formAction({
        roomName: this.state.room,
        start: this.state.start,
        end: this.state.end,
        day: this.props.day,
      });
    }
    this.setState({ room: '' });
  }

  onUserFormSubmit = (event) => {
    event.preventDefault();
    if (!this.props.isDisabled) {
      this.props.formAction({
        entity: this.state.entity,
        email: this.state.email,
        password: this.state.password,
      });
    }
    this.setState({ email: '', password: '', entity: '' });
  }

  render() {
    if (this.props.adminForm) {
      return (
        <form
          className={this.props.className}
          onSubmit={(this.props.hasRoom) ? this.onRoomFormSubmit : this.onUserFormSubmit}
        >
          {this.props.hasRoom
          && (
          <input
            className="input-room"
            autoComplete="off"
            name="room"
            list={this.props.datalistName}
            onChange={this.onInputChange}
            value={this.state.room}
            type="text"
            placeholder="room..."
          />
          )}
          {this.props.hasEmail
          && (
          <input
            className="input-user input-user--email"
            autoComplete="off"
            name="email"
            onChange={this.onInputChange}
            value={this.state.email}
            list={this.props.datalistName}
            type="text"
            placeholder="email..."
          />
          )}
          {this.props.datalistName
          && (
          <DataList
            type={this.props.datalistType}
            id={this.props.datalistName}
            data={this.props.data}
          />
          )}
          {this.props.hasPassword
          && (
          <input
            className="input-user input-user--password"
            autoComplete="off"
            name="password"
            onChange={this.onInputChange}
            value={this.state.password}
            type="text"
            placeholder="password..."
          />
          )}
          {this.props.deleteEntity
          && (
          <input
            className="input-user input-user--entity"
            autoComplete="off"
            name="entity"
            onChange={this.onInputChange}
            value={this.state.entity}
            type="text"
            placeholder="type entity name to confirm..."
          />
          )}
          <input
            className={`submit-button ${(this.props.isDisabled) && 'submit-button--disabled'}`}
            type="submit"
            value={this.props.buttonValue}
          />
        </form>
      );
    }

    return (
      <form className={this.props.className} onSubmit={this.onRoomFormSubmit}>
        <input
          className="input-room"
          autoComplete="off"
          name="room"
          list={this.props.datalistName}
          onChange={this.onInputChange}
          value={this.state.room}
          type="text"
          placeholder="room..."
        />
        <DataList
          type={this.props.datalistType}
          id={this.props.datalistName}
          data={this.props.data}
        />
        <select name="start" onChange={this.onInputChange} value={this.state.start} type="text">
          <InputTimes />
        </select>
        <select name="end" onChange={this.onInputChange} value={this.state.end} type="text">
          <InputTimes start={this.state.start} />
        </select>
        <input
          className={`submit-button ${(this.props.isDisabled) && 'submit-button--disabled'}`}
          type="submit"
          value={this.props.buttonValue}
        />
      </form>
    );
  }
}

export default Form;
