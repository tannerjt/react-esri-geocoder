import React, { Component } from 'react'
import store from './store'
import { Provider } from 'react-redux'
import Geocoder from './components/Geocoder'

class EsriGeocoder extends Component {
  render() {
    return (
      <Provider store={store}>
        <Geocoder />
      </Provider>
    )
  }
};

export default EsriGeocoder;
