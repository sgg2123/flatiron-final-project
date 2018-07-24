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
  return {
    type: "HANDLE_SEARCH_CHANGE",
    payload: {
      searchTerm: event.target.value
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