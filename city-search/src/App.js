import React, { Component } from "react";
import "./App.css";
import MapZipsToObj from "./MapZipsToObj"

function ZipCodes(props) {
  return (
    <div className="zips">
      <h4>
        {props.order}: {props.zipCode}
      </h4>
    </div>
  );
}

function CitySearchField(props) {
  return (
    <div className="w-50 m-auto">
      <form onSubmit={props.onSubmit}>
        <label>City Name:</label>
        <input
          type="text"
          placeholder="Enter City Name"
          onChange={props.handleChange}
        ></input>

        <input type="submit" value="submit"></input>
      </form>
    </div>
  );
}



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCodes: [],
      cityName: "",
      isReady : false
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const enpoint = `http://ctp-zip-api.herokuapp.com/city/${this.state.cityName}`;
    fetch(enpoint)
      .then((res) => res.json())
      .then((jsonObj) => {
        this.setState({ zipCodes: jsonObj });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          zipCodes: [],
        });
      });

      this.setState({
        isReady: true
      })
  }

  handleChange(event) {
    event.preventDefault();
    let city = event.target.value;
    this.setState({ cityName: city.toUpperCase() });
    this.setState({
      isReady: false
    })
  }

  handleKeyPress(e) {
    if (e.keyCode === 13) {
      this.onSubmit();
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField
          handleChange={this.handleChange}
          onSubmit={this.onSubmit}
          onKeyPress={this.handleKeyPress}
        />
        <div className=" d-inline">
          {this.state.zipCodes.length !== 0 ? (
            this.state.zipCodes.map((z, index) => (
              <ZipCodes key={index} order={index} zipCode={z} />
            ))
          ) : (
            <>No Response</>
          )}
        </div>
        <div>
          {this.state.isReady? <MapZipsToObj zipCodes={this.state.zipCodes} cityName={this.state.cityName}/> : <></>}
        </div>
      </div>
    );
  }
}

export default App;
