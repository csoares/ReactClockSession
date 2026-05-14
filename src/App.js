import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      hours: null,
      minutes: null,
      seconds: null,
      visits: 0,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handleVisits = (event) => {
    // increment the state visits - and store in the localStorage or sessionStorage
    let visits = this.state.visits;
    if (event.target.name === "plus") {
      visits++;
      this.setState({ visits: visits });
    } else if (this.state.visits > 0) {
      visits--;
      this.setState({ visits: visits });
    }
    sessionStorage.setItem("visits", visits);
  };

  componentDidMount() {
    this.setState({ visits: sessionStorage.getItem("visits") || 0 });
    setInterval(() => {
      let now = new Date();

      this.setState({
        date: now,
        // update the hours, minutes and seconds
        hours: this.state.hours + 1, // hours: (now.getHours() % 12 || 0) * (360 / 12),
      });
    }, 50);
  }

  getHours() {
    return this.state.date.getHours();
  }
  getMinutes() {
    return this.state.date.getMinutes();
  }
  getSeconds() {
    return this.state.date.getSeconds();
  }

  render() {
    const visits = this.state.visits;
    const hours = this.state.hours;
    const styleHour = {
      transform: `rotate(${hours}deg)`,
    };

    return (
      <div>
        <p>Current time:</p>
        <p>
          {this.state.date.toDateString()} - {this.getHours()}h
          {this.getMinutes()}:{this.getSeconds()}
        </p>
        <div className="clock">
          <div className="wrap">
            <span style={styleHour} className="hour"></span>
            <span className="minute"></span>
            <span className="second"></span>
            <span className="dot"></span>
          </div>
        </div>
        <p>How many visits? {visits}</p>
        <form onSubmit={this.handleSubmit}>
          <button type="submit" name="plus" onClick={this.handleVisits}>
            PLUS
          </button>
          <button type="submit" name="minus" onClick={this.handleVisits}>
            MINUS
          </button>
        </form>
      </div>
    );
  }
}

export default App;
