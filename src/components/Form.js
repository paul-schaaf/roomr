import React from 'react';
import './Form.css';



class Form extends React.Component {


  render () {
    return (
      <div className="form">
        <form>
          <input type="text"></input>
          <input type="text"></input>
          <input type="text"></input>
          <input type="submit"></input>
        </form>
      </div>
    )
  }
}

export default Form;