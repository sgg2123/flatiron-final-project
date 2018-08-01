import React from 'react';
import { clearResults } from './actions';
import { connect } from 'react-redux';


class Logo extends React.Component {
  handleClick = () => {
    this.props.clearResults(this.props.formSubmitted)
    this.props.history.push("/")
  }

  render() {
    return (
      <div className='logo' onClick={this.handleClick}>
        <h1>CAMPHUB</h1>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    formSubmitted: state.formSubmitted,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clearResults: () => dispatch(clearResults()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logo);
