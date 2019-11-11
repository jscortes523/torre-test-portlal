import BioConstants from '../constants/bio.constants'
import AppDispatcher from '../dispatcher/AppDispatcher'
import axios from 'axios'


const getData = ( word, limit )=>{
    
    const url = `${process.env.REACT_APP_API_URL}/search?$word=${word}&limit=${limit}`

    axios(url).then( res => {
        AppDispatcher.dispatch({
            actionType:BioConstants.GET_BIOS_BY_WORD,
            payload: res.data
        })
    }).catch( err => {
        AppDispatcher.dispatch({
            actionType:BioConstants.error,
            payload:{
                message:err
            }
        })
    })

}

const getBioData = (username) =>{

    const url = `${process.env.REACT_APP_API_URL}/bio/${username}`   

    axios(url).then( res => {
        AppDispatcher.dispatch({
            actionType:BioConstants.GET_BIO_DETAIL,
            payload: res.data
        })
    }).catch( err => {
        AppDispatcher.dispatch({
            actionType:BioConstants.error,
            payload:{
                message:err
            }
        })
    })

}

const getConnectionsByUsername = (username) =>{

    const url = `${process.env.REACT_APP_API_URL}/bio/${username}`   

    axios(url).then( res => {
        AppDispatcher.dispatch({
            actionType:BioConstants.GET_BIO_DETAIL,
            payload: res.data
        })
    }).catch( err => {
        AppDispatcher.dispatch({
            actionType:BioConstants.error,
            payload:{
                message:err
            }
        })
    })

}

export const getBios = (word,limit) =>{

    getData(word,limit)
    
}

export const getBioDetail = (username) => {
    getBioData(username)
}

export const getConnections = (username) => {
    getConnectionsByUsername(username)
}