export function changeLocation() {
  return {
    type: "CHANGE_LOC",
    payload: {
      lat: 40.705489,
      lng: -74.014081,
    }
  }
}

export function toggle3D(bool) {
  return {
    type: "TOGGLE_3D",
    payload: {
      toggled3D: !bool
    }
  }
}

export function updateDetails(details) {
  return {
    type: "UPDATE_DETAILS",
    payload: details
  }
}

export function handleSearchChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;
  return {
    type: "HANDLE_SEARCH_CHANGE",
    payload: {
      [name]: value
    }
  }
}

export function updateSiteList(array) {
  return {
    type: "UPDATE_SITE_LIST",
    payload: {
      siteList: array
    }
  }
}

export function submitForm() {
  return {
    type: "SUBMIT_FORM",
    payload: {
      formSubmitted: true
    }
  }
}

export function clearResults() {
  return {
    type: "CLEAR_RESULTS",
    payload: {
      formSubmitted: false
    }
  }
}

export function updateSelectedSite(contractID, facilityID, facilityName) {
  return {
    type: "UPDATE_SELECTED_SITE",
    payload: {
      contractID,
      facilityID,
      facilityName,
    }
  }
}
