import AppDispatcher from '../dispatcher/AppDispatcher'
import BioConstants from '../constants/bio.constants'
import {EventEmitter} from 'events'

const CHANGE_EVENT = 'change'

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

class BioStore extends EventEmitter{
    emitChange(){
        this.emit(CHANGE_EVENT)
    }
    
    addChangeListener(cb){
        this.on(CHANGE_EVENT, cb)
    }
    
    removeChangeListener(cb){
        this.removeListener(CHANGE_EVENT,cb)
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

    displayBios(){
        return bios.length > 0
    }

}

const store = new BioStore()

store.dispatchToken = AppDispatcher.register( action  => {

    switch(action.actionType){
        case BioConstants.GET_BIOS_BY_WORD: setBios(action.payload)
        break;
        case BioConstants.GET_BIO_DETAIL: setBio(action.payload)        
        break;
        case BioConstants.GET_CONNECTIONS_BY_USER: setConnections(action.payload)
        break;
        default: return;
    }
    
    store.emitChange(CHANGE_EVENT)  
})



export default store