import React, {Component} from 'react'
import BioConstants from '../constants/bio.constants'
import Card from './Card'
import bioStore from '../stores/bio.store'
import '../assets/styles/BioModal.css'
class BioModal extends Component{

    constructor(){
        super()
        this.state = {
            show:false,
            bio:{},
            connections:[]
        }
        this.handleClose = this.handleClose.bind(this)
        this.onBioChange = this.onBioChange.bind(this)        
        bioStore.addChangeListener(BioConstants.GET_BIO_DETAIL,this.onBioChange)
    }

    componentWillUnmount(){
        bioStore.removeListener(BioConstants.GET_BIO_DETAIL,this.onBioChange)
    }

    componentDidMount(){
        //this.onChange()
    }

    onBioChange(){
        this.setState({
            bio:bioStore.getBio(),
            connections:bioStore.getConnections(),
            show:true
        })

    }

    handleClose(){
        this.setState({
            show:false,
            bio:{}
        })
    }

    render(){
        return (
            <React.Fragment>
                {this.state.bio.person &&
                    <div className="modal" style={{display: this.state.show ? 'block' : 'none' }}>
                        <div className="modal-content">
                            <div>
                                <span className="modal_close-btn" onClick={this.handleClose}>&times;</span>
                            </div>
                            <div className="modal_detail_header" >
                                <div className="modal_detail_img-container">
                                    <img className="modal_detail__img" src={this.state.bio.person.picture} alt="Bio"/>
                                </div>
                                <div className="modal_detail__info">
                                    <h1 className="modal_detail__h5">{this.state.bio.person.name}</h1>
                                    <h3 className="modal_detail__h5">{this.state.bio.person.publicId}</h3>
                                    <div className="modal_detail__tags">
                                        <div >
                                            { this.state.bio.strengths.slice(0,5).map( item  => 
                                                    <span key={item.name} className="label strengths">{`${item.name} `}</span>
                                                )
                                            }
                                        </div>
                                        <div>
                                        { this.state.bio.languages.slice(0,5).map( item  => 
                                            <span key={item.language} className="label languages">{`${item.language} `}</span>
                                            )
                                        }                    
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {this.state.connections.length === 0 &&
                                <h3>No Connections</h3>
                            }
                            {this.state.connections.length > 0 &&
                                <div className="network">
                                <div><h3>Top Connections</h3></div>
                                {this.state.connections.map( connection => 
                                    <React.Fragment>
                                    <div>
                                    <h5>{`${connection.name} (${Math.round(connection.weight*100)/100}${connection.weight/1000 >= 1?`K`:''}) top connections`}</h5>
                                    </div>
                                    <div className="cards-container">
                                        
                                        {
                                            connection.topConnections.map( item => <Card person={item}/>)
                                        }
                                    </div>
                                    </React.Fragment>
                                )     }                                                                                                                                               
                                </div>                                        
                            }
                    </div>
                </div>        
                }
            </React.Fragment>
          
        )
    }
  }

  export default BioModal