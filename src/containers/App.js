import React, { Component } from 'react'
import BioList from '../components/BioList'
import Search from '../components/Search'
import BioModal from '../components/BioModal'
import GraphModal from '../components/GraphModal'
import '../assets/styles/App.css'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bios: [],
      loading: false,
      show: false
    }

    this.addBios = this.addBios.bind(this)
    
  }

  addBios(bios) {
    
    this.setState({
      loading: false,
      bios: bios,
    });
  }

  loadInitialState(){

    const query = '?word=ana&limit=20'
    const url = `${process.env.REACT_APP_API_URL}/search${query}`

    axios.get(url).then( res => {
      this.setState({
        bios:res.data
      })
      
    }).catch( err => {
      this.setState({loading:false})
    })    
  }

  componentDidMount(){
    this.loadInitialState()
  }

  render() {
    return (
      <div className="App container bg-light shadow">
        <header className="App-header">
          <h1 className="App-title">
              Torre Lite              
          </h1>
          <img src="https://img.icons8.com/dusk/64/000000/network.png" alt="Icon"/>
        </header>        
        <div className="app-bio-container">
          <div className="app-search">            
            <Search addBios={this.addBios}/>
          </div>
          <div className="app-bios-list">
          <BioList bios={this.state.bios} loading={this.state.loading}/>
          </div>
        </div>
        <BioModal />
        <GraphModal/>
      </div>
    )
  }
}

export default App