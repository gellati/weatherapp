import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT;

async function getWeatherData(endpoint) {
  const response = await fetch(endpoint);
  return response.json();
}

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: '',
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const endpoint = `${baseURL}/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
        getWeatherData(endpoint)
          .then((data) => {
            this.setIcon(data.weather[0].icon.slice(0, -1));
          });
      });
    }
  }

  setIcon(icon) {
    this.setState({ icon });
  }

  render() {
    const { icon } = this.state;
    return (
      <div className="icon">
        { icon && <img src={`/img/${icon}.svg`} alt="weather icon" /> }
      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);
