const inicialState = {
    allGames: [],
    allMyGenres: [],
    games: [],
    platforms : [],
    gameDetail: []
}


export default function rootReducer(state = inicialState, action) {
    switch (action.type) {
        case 'GET_ALL_GAMES':
            return {
                ...state,
                allGames: action.payload,
                games: action.payload
            }

        case 'GET_ALL_GENRES':
            return {
                ...state,
                allMyGenres: action.payload
            }

        case   'GET_GAME_BY_SEARCH':

            let nombre = action.payload === '' ? state.allGames : state.allGames.filter(e => e.name.toLowerCase().includes(action.payload.toLowerCase()))

            return{
                ...state,
                games: nombre
            }
            
        case 'GET_ALL_PLATFORMS':
            return{
                ...state,
                platforms : action.payload
            }
        case 'GET_DETAIL':
            return{
                ...state,
                gameDetail: action.payload
            }
        // case 'POST_GAME':
        //     return{
        //         ...state
        //     }

        case 'FILTER_BY_GENRE':

            let juegos = action.payload
            state.games = state.allGames.filter(videogames => videogames.genres?.includes(juegos))
            if (action.payload === "all") state.games = state.allGames
            if (state.games.length === 0) {
                alert("No hay resultados")
                state.games = state.allGames
            }
            return {
                ...state,
                games: state.games
            }


        case 'FILTER_BY_RATING':
            let sorted2 = action.payload === 'desc' ?
                state.allGames.sort((a, b) => {
                    if (a.rating > b.rating) {
                        return 1;
                    }
                    if (a.rating < b.rating) {
                        return -1;
                    }
                    return 0;
                }) :
                state.allGames.sort((a, b) => {
                    if (a.rating > b.rating) {
                        return -1;
                    }
                    if (a.rating < b.rating) {
                        return 1;
                    }
                    return 0;
                });
                

            return {
                ...state,
                games: sorted2
            }

        case 'FILTER_BY_ABC':
            let sorted = action.payload === 'asc' ?
            state.allGames.sort(( a, b ) => {
                if(a.name > b.name) {
                    return 1;
                }
                if(a.name < b.name) {
                    return -1;
                }
                return 0;
            }) :
            state.allGames.sort(( a, b ) => {
                if(a.name > b.name) {
                    return -1;
                }
                if(a.name < b.name) {
                    return 1;
                }
                return 0;
            })
            return{
                ...state,
                games : sorted
            }

        case 'FILTER_CREATED':
            const createdFilter =
            action.payload === "db"
              ? state.allGames.filter((e) => e.createDB)
              : state.allGames.filter((e) => !e.createDB);
          return {
            ...state,
            games: action.payload === "origin" ? state.allGames : createdFilter,
          };
          case 'CLEAR':
            return {
                ...state,
                gameDetail : action.payload
            }
        default:
            return state;
    }
}