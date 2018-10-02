import React from 'react';

class Logo extends React.Component {
  handleClick = () => {
    this.props.history.push("/")
  }

  render() {
    return (
      <div className='logo' onClick={this.handleClick}>
        CAMPHUB
      </div>
    )
  }
}

export default Logo;
