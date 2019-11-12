import React,{Component} from 'react'
import {Graph} from 'react-d3-graph'
import bioStore from '../stores/bio.store'
import BioContants from '../constants/bio.constants'
import {getConnections} from '../actions/bio.actions'
import '../assets/styles/GraphModal.css'

class GraphModal extends Component{

    constructor(){
        super()

        this.state = {
            data: {
                nodes:[],
                links:[]
            },
            show:false
        }

        this.handleClose = this.handleClose.bind(this)
        this.onDisplay = this.onDisplay.bind(this)

        bioStore.addChangeListener(BioContants.GET_CONNECTIONS_BY_USER,this.onDisplay)
    }

    componentWillUnmount(){
        bioStore.removeListener(BioContants.GET_CONNECTIONS_BY_USER,this.onDisplay)
    }

    onDisplay(){
        const {
            username,
            data
        } = bioStore.getUserConnections()

        this.buildLinks(username,data)

    }

    buildLinks({username,picture},data){
        const nodes = []
        const links = []

        nodes.push({
            id:username,
            svg:picture
        })

        data.forEach( usr => {
            const existIdx = this.state.data.nodes.findIndex(item => item.id === usr.username)
            if(existIdx === -1){
                nodes.push({
                    id:usr.username,
                    svg:usr.picture
                })
            }

            const pathUsr = this.state.data.links.findIndex(item => {
                return item.source === username && item.target === usr.username
            })

            const pathTarget = this.state.data.links.findIndex(item => {
                return item.source === usr.username && item.target === username
            })


            if( pathTarget < 0 && pathUsr<0
            ){
                links.push({
                    source:username,
                    target:usr.username
                })
            }
        });

        this.setState({
            data:{
                nodes:[...this.state.data.nodes, ...nodes],
                links:[...this.state.data.links, ...links]
            },
            show:true
        })
    }

    onClick(nodeId){
        getConnections(nodeId)
    }

    myConfig = {
        nodeHighlightBehavior: true,
        node: {
            color:'#293462',
            size: 500,
            highlightStrokeColor: 'blue',
            fontSize:15,
            fontWeight:'bold'
        },
        link: {
            highlightColor: 'lightblue',
            fontWeight:'bold',
            color:'#472b62'
        }
    };

    handleClose(){
        this.setState({
            data:{
                nodes:[],
                links:[]
            },
            show:false
        })
    }    

    render(){
        return (
            <div className="modal-container" style={{display: this.state.show ? 'block' : 'none' }}>                
                <div className="modal-container_detail" >
                <div className="modal-container_header">
                    <h3 className="modal-title">Top Connections</h3>
                    <span className="modal-container_close-btn" onClick={this.handleClose}>&times;</span>
                </div>
                <div>
                { this.state.show &&
                    <Graph
                        id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
                        data={this.state.data}
                        config={this.myConfig}
                        onClickNode={this.onClick}
                    />
                }
                </div>
                </div>
            </div>
                
        )
    }

}

export default GraphModal