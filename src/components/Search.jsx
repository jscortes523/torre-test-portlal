import React, { Component } from "react";
import axios from 'axios'
import '../assets/styles/Search.css'

class Search   extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: "",
      word:""
    };

    // bind context to methods
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  /**
   * Handle form input field changes & update the state
   */
  handleFieldChange = event => {
    const { value } = event.target;
    
    this.setState(
      {
        word:value,
      }
    )

    if(this.state.word.length > 1){
      this.setState({
        loading:true
      })
      console.log('axios')
      const url = `${process.env.REACT_APP_API_URL}/search?word=${value}`

      axios.get(url)
        .then( res => {
          this.props.addBios(res.data)
          this.setState({
            loading:false
          })
        })   
    }

  };
  
  renderError() {
    return this.state.error ? (
      <div className="alert alert-danger">{this.state.error}</div>
    ) : null;
  }

  render() {
    return (
      <React.Fragment>
        <div className="search">
          <h6 className="search_title">{this.state.loading ? `Loading...` : 'Search a Bio'            
            }</h6>
            <input
              onChange={this.handleFieldChange}
              value={this.state.word}
              className="search_input"
              placeholder="😎 Name"
              name="name"
              type="text"
            />
          {this.renderError()}
        </div>
      </React.Fragment>
    );
  }
}

export default Search 