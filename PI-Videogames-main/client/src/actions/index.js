import axios from 'axios';

export function getAllGames() {
    return async function (dispatch) {
        var json = await axios.get(`/videogames`);
        dispatch({
            type: 'GET_ALL_GAMES',
            payload: json.data
        })
    }
}

export function getAllGenres() {
    return async function (dispatch) {
        var json = await axios.get(`/genres`);
        return dispatch({
            type: 'GET_ALL_GENRES',
            payload: json.data
        })
    }
}

export function getGameBySearch(name) {

    try{
        return{
            type: 'GET_GAME_BY_SEARCH',
            payload: name
            }
        }catch(error){
            console.log(error)
        }
}

    // return async function (dispatch) {
    //     try {
    //         var json = await axios.get(`http://localhost:3001/videogames?name=${name}`);
    //         return dispatch({
    //             type: 'GET_GAME_BY_SEARCH',
    //             payload: json.data
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


export function filterByGenre(payload) {
    return {
        type: 'FILTER_BY_GENRE',
        payload: payload
    }
}

export function filterByRating(payload) {
    return {
        type: 'FILTER_BY_RATING',
        payload
    }
}

export function filterByAbc(payload) {
    return {
        type: 'FILTER_BY_ABC',
        payload
    }
}

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function postGame(payload) {
    return async function () {
        const createPost = await axios.post('/videogame', payload);
        console.log(createPost);
        return createPost;
    }
}

export function getAllPlatforms(){
    return async function(dispatch){
        const json = await axios.get('/platforms')
        const platformss = json.data
        return dispatch({
            type: 'GET_ALL_PLATFORMS',
            payload: platformss        
        })
    }
}

export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get(`/videogames/${id}`)
            return dispatch({
                type: 'GET_DETAIL',
                payload : json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}

export function clear(){
    return{
        type: 'CLEAR',
        payload : []
    }
}