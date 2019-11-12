import React,{Component} from 'react'
import {getBioDetail, getConnections, startLoading} from '../actions/bio.actions'
import bioStore from '../stores/bio.store'
import '../assets/styles/Bio.css'
import BioConstant from '../constants/bio.constants'

class Bio extends Component {

  
  constructor(props)
  {
    super(props)
    this.showBioModal = this.showBioModal.bind(this)
    this.showGraphModal = this.showGraphModal.bind(this)
  }

  showBioModal(e){
    startLoading(BioConstant.LOADING_BIO)
    getBioDetail(this.props.bio.publicId)
  }

  showGraphModal(){
    startLoading(BioConstant.LOADING_GRAPH)
    getConnections(this.props.bio.publicId)
  } 


  render(){
    return (
      <div className="bio-container">  
      <div className="bio-container_img">
      <img
      className="bio-container_img__item"
      src={this.props.bio.picture}
      alt={this.props.bio.name}
      />
      </div> 
      <div className="bio-container_info">
      <div className="bio-container_info__fields">
      <h6>{`${this.props.bio.name}`}</h6>           
      <h6>{`Reputation Weight: ${Math.round(this.props.bio.weight*100)/100}`}</h6>
      <h4>{`@${this.props.bio.publicId}`}</h4>
      </div>
      </div>
      <div className="bio-container_actions">
      <button id="bio-detail" className="bio-container_actions__btn_losser"
         type="button" onClick={this.showBioModal}
        >View Detail
    </button>
      <button id="connections" className="bio-container_actions__btn_winner" type="button" onClick={this.showGraphModal}>Graph</button>
        </div>
        </div>
    )
  }
}
export default Bio