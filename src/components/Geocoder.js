import React, { Component } from 'react'
import './Geocoder.css'
import { connect } from 'react-redux'
import {
  updateUserInput,
  updateGeocoderSuggestions,
  showLoading,
  foundAddress,
} from '../actions/location-actions.js'

import axios from 'axios'
import Autosuggest from 'react-autosuggest'

const cancelMessage = 'Request Cancelled'
const geocoderBaseUrl = 'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer'
const searchUrl = 'findAddressCandidates'
const searchParams = {
  outFields: '*',
  forStorage: 'false',
  maxLocations: 1,
  f: 'json',
}
const suggestUrl = 'suggest'
const suggestParams = {
  f: 'json',
}

const getSuggestionValue = suggestion => suggestion.text
const renderSuggestion = suggestion => (
  <div>
    {suggestion.text}
  </div>
)

class EsriGeocoder extends Component {
  suggestRequest = {
    cancelToken: null,
    source: null,
    request: null,
  }

  geocodeRequest = {
    cancelToken: null,
    source: null,
    request: null,
  }

  onChange = (event, { newValue }) => {
    this.props.dispatch(updateUserInput(newValue))
  }

  onSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    //cancel previous requests
    if(this.suggestRequest.request) {
      this.suggestRequest.source.cancel(cancelMessage)
    }

    if(inputLength < 3) return []

    this.props.dispatch(showLoading())

    this.suggestRequest.cancelToken = axios.CancelToken;
    this.suggestRequest.source = this.suggestRequest.cancelToken.source();
    this.suggestRequest.request = axios.get(`${geocoderBaseUrl}/${suggestUrl}`, {
      cancelToken: this.suggestRequest.source.token,
      params: {
        ...suggestParams,
        text: inputValue,
      }
    }).then((response) => {
      this.props.dispatch(updateGeocoderSuggestions(response.data.suggestions))
    }).catch((err) => {
      if(err.message === cancelMessage) return
      console.warn(err)
    })
  }


  onSuggestionsClearRequested = () => {
    this.props.dispatch(updateGeocoderSuggestions([]))
  }

  onSuggestionSelected = (event, { suggestion, suggestionValue, sectionIndex, method }) => {
    // suggestion selected, get address candidate
    this.geocodeRequest.cancelToken = axios.CancelToken;
    this.geocodeRequest.source = this.geocodeRequest.cancelToken.source();
    this.geocodeRequest.request = axios.get(`${geocoderBaseUrl}/${searchUrl}` , {
        cancelToken: this.geocodeRequest.source.token,
        params: {
          ...searchParams,
          magicKey: suggestion.magicKey,
          SingleLine: suggestion.text,
        }
      }).then((response) => {
        const locations = response.data.candidates.map((loc) => {
          return loc.attributes
        })
        this.props.dispatch(foundAddress(locations[0]))
      }).catch((err) => {
        if(err.message === cancelMessage) return
        console.warn(err)
      })
  }

  render() {
    const { placeholder, userInput, loading, suggestions } = this.props.location

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder,
      value: userInput,
      onChange: this.onChange,
    }

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        focusFirstSuggestion={true}
        />
    )
  }
}

export default connect((store) => {
  return {
    location: store.location
  }
})(EsriGeocoder)
