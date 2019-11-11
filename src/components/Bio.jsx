import React,{Component} from 'react'
import {getBioDetail, getConnections} from '../actions/bio.actions'
import '../assets/styles/Bio.css'


class Bio extends Component {

  
  constructor(props)
  {
    super(props)
    this.showBioModal = this.showBioModal.bind(this)
  }


  showBioModal(e){
    getBioDetail(this.props.bio.publicId)
  }

  showConnectionsModal(){
    getConnections(this.bio.publicId)
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
                <h6>{`Client: ${this.props.bio.name}`}</h6>           
            </div>
          </div>
        <div className="bio-container_actions">
            <button id="bio-detail" className="bio-container_actions__btn_losser" type="button" onClick={this.showBioModal}>View Detail</button>
            <button id="connections" className="bio-container_actions__btn_winner" type="button" onClick={this.showModal}>Tree</button>
        </div>
        </div>
    )
  }
}
export default Bio