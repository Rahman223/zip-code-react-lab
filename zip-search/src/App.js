import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (<div className="border w-25 m-auto">
    <div className="heading">{props.city}, {props.state}</div>
    <div>
      <ul>
        <li>State: {props.state}</li>
        <li>Location: ({props.long} {props.lat})</li>
        <li>Population (estimated): {props.population}</li>
        <li>Total Wages: {props.wages}</li>
      </ul>
    </div>
    
  </div>);
}

function ZipSearchField(props) {
  return (
    <div className="w-50 m-auto">
  <form onSubmit={props.onSubmit}>
    <label>Zip Code:</label>
    <input type="text" placeholder="try zip code" onChange={props.handleZipChange}></input>
    
    <input type="submit" value="submit"></input>
    
  </form>
  </div>
    );
}



class App extends Component {
constructor(props){
  super(props);
  this.state = {
    city: [],
    zipCode :'',
    
  }
this.handleZipChange = this.handleZipChange.bind(this);
this.onSubmit = this.onSubmit.bind(this);
this.handleKeyPress = this.handleKeyPress.bind(this);
}

onSubmit(e){
  e.preventDefault();
  if(this.state.zipCode.length === 5){
    const enpoint = `http://ctp-zip-api.herokuapp.com/zip/${this.state.zipCode}`; 
  fetch(enpoint)
  .then(res => res.json())
  .then(jsonObj => {
    console.log(jsonObj)
    this.setState({city: jsonObj})
  }).catch(err => {
    console.log(err)
    this.setState({
      city : []
    })
  })

}else {
  this.setState({
    city: []
  })
}


}

handleZipChange (event){
  event.preventDefault();
  let zip = event.target.value
  this.setState({zipCode: zip})
}

handleKeyPress(e){
  if(e.keyCode === 13){
this.onSubmit()
  }
}


  render() {
 

    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField handleZipChange = {this.handleZipChange} onSubmit={this.onSubmit} onKeyPress={this.handleKeyPress}/>
        <div className="d-grid gap-3">
          {this.state.city.length !==0? (this.state.city.map((c, index)=><City key={index} city={c.City} state={c.State} long={c.Long} lat={c.Lat} population={c.EstimatedPopulation} wages={c.TotalWages}/>))
  : <>No Response</>}
        </div>
      </div>
    );
  }
}

export default App;
