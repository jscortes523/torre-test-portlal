import AppDispatcher from '../dispatcher/AppDispatcher'
import BioConstants from '../constants/bio.constants'
import {EventEmitter} from 'events'


let bio = {}

const setBio = (data) =>{
    bio = data
}

let bios = []

const setBios = (data) =>{
    bios = data
}

let connections = []

const setConnections= (data) => {
    connections = data
}

let userConnections = []

const setUserConnections= (data) => {
    userConnections = data
}

class BioStore extends EventEmitter{
    emitChange(event){
        this.emit(event)
    }
    
    addChangeListener(event,cb){
        this.on(event, cb)
    }
    
    removeChangeListener(event,cb){
        this.removeListener(event,cb)
    }

    getBio(){
        return bio
    }

    getBios(){
        return bios
    }

    getConnections(){
        return connections
    }

    getUserConnections(){
        return userConnections
    }

    displayBios(){
        return bios.length > 0
    }

}

const store = new BioStore()

store.dispatchToken = AppDispatcher.register( action  => {

    switch(action.actionType){
        case BioConstants.GET_BIOS_BY_WORD: setBios(action.payload) 
        break;
        case BioConstants.GET_BIO_DETAIL: setBio(action.payload.bio)        
        setConnections(action.payload.connections)
        break;
        case BioConstants.GET_CONNECTIONS_BY_USER: setUserConnections(action.payload)
        break;
        default: return;
    }
    
    store.emitChange(action.actionType)  
})



export default store