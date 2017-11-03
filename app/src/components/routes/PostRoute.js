import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from 'static/icon/logo.svg';

class PostRoute extends Component {
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const mapDispatchToProps = {
};

const mapStateToProps = state => ({
  posts: {}//state.books.books
});

export default connect(mapStateToProps, mapDispatchToProps)(PostRoute);