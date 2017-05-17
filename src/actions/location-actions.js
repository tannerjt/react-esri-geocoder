export const UPDATE_USER_INPUT = 'UPDATE_USER_INPUT'
export const UPDATE_GEOCODER_SUGGESTIONS = 'UPDATE_GEOCODER_SUGGESTIONS'
export const SHOW_LOADING = "SHOW_LOADING"
export const FOUND_ADDRESS = 'FOUND_ADDRESS'

export const updateUserInput = (input) => ({
  type: UPDATE_USER_INPUT,
  input,
})

export const updateGeocoderSuggestions = (suggestions) => ({
  type: UPDATE_GEOCODER_SUGGESTIONS,
  suggestions,
})

export const showLoading = (status = true) => ({
  type: SHOW_LOADING,
  status,
})

export const foundAddress = (result) => ({
  type: FOUND_ADDRESS,
  result,
})
