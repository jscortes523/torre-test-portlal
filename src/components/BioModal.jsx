import React, {Component} from 'react'
import _ from 'lodash'
import bioStore from '../stores/bio.store'
import {  Button, Header, Icon, Image, Modal } from 'semantic-ui-react'
import '../assets/styles/Modal.css'
class BioModal extends Component{

    constructor(){
        super()
        this.state = {
            show:false,
            bio:{}
        }
        this.handleClose = this.handleClose.bind(this)
        this.onChange = this.onChange.bind(this)
        bioStore.addChangeListener(this.onChange)
    }

    componentWillUnmount(){
        bioStore.removeListener(this.onChange)
    }

    componentDidMount(){
        this.onChange()
    }

    onChange(){
        this.setState({
            bio:bioStore.getBio(),
            show:true
        })
    }

    handleClose(){
        this.setState({
            show:false,
            quotations:{
                time:"",
                data:[]
            }
        })
    }

    render(){
        return (
            <React.Fragment>
            { this.state.bio.person && 
            <Modal trigger={<Button>Scrolling Content Modal</Button>} style={{display: this.state.show ? 'block' : 'none' }}>
                <Modal.Header>Profile Picture</Modal.Header>
                <Modal.Content image scrolling>
                <Image size='medium' src={this.state.bio.person.picture} wrapped />
            
                <Modal.Description>
                    <Header>{this.bio.person.name}}</Header>
                    <p>
                    This is an example of expanded content that will cause the modal's
                    dimmer to scroll
                    </p>
            
                    {_.times(8, (i) => (
                    <Image
                        key={i}
                        src='/images/wireframe/paragraph.png'
                        style={{ paddingBottom: 5 }}
                    />
                    ))}
                </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                <Button primary>
                    Proceed <Icon name='chevron right' />
                </Button>
                </Modal.Actions>
            
            </Modal>
            }
            </React.Fragment>
          
        )
    }
  }

  export default BioModal