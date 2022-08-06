const { Router } = require('express');
const axios= require('axios');
const { Videogame, Genres, Platform} = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { API_KEY } = process.env;


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//------------------------------ Functions --------------------------------------------------------\\

//Function to get videogames from the API

const getApiInfo = async () => {
    const oneHundredGames = [];

    for (let i = 1; i <= 5; i++) {
        let api = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
        api.data.results.map(e => {
            oneHundredGames.push( {
                id : e.id,
                name: e.name,
                img: e.background_image,
                genres: e.genres.map(e => e.name).join(', '),
                released: e.released,
                rating: e.rating,
                platform: e.platforms.map((e) => e.platform.name).join(', ')
            })
        })
    }

    return oneHundredGames;
}

//Funtion to get videogames from the database
const getInfoDB = async () => {
    const dbData = await Videogame.findAll({
      include: {
        model: Genres,
        attribute: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return dbData;
  };

// Function to get videosgames from api and db
const getAllVideogames = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getInfoDB();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

//------------------------------ Functions end --------------------------------------------------------\\

//------------------------------ ROUTES --------------------------------------------------------\\

//ROUTE TO GET ALL VIDEOGAMES
router.get('/videogames', async (req,res) =>{

    const name = req.query.name // ej: "/videogames?gta"
    let videogamesTotal = await getAllVideogames();
    
    //Si tengo un nombre que me pasan por query
    if(name){
        let videogameName = await videogamesTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
        videogameName.length ? 
        res.status(200).send(videogameName) :
        res.status(404).send('No se encuentra el videojuego');
    }else{
        res.status(200).send(videogamesTotal)
    }
})

//Route to get genders and save in my db
router.get('/genres', async (req,res) => {
    const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const genres = await genresApi.data.results.map(e => e.name)
 
    

    genres.forEach(e => Genres.findOrCreate({ //lo uso para guardar los generos que me traje de la API en la base de datos
        where: {name: e} //
    }))

    const allGenres = await Genres.findAll() //me traigo todos los generos que guarde en mi db
    res.json(allGenres)
})

router.get('/platforms', async (req, res)=> {
    const apiURL3 = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
    const apiPlatf = await apiURL3.data.results.map(el => el.name)
    apiPlatf.forEach( el => {
        Platform.findOrCreate({
            where : {
                name: el
            }
        })
    });
    const allPlatf = await Platform.findAll();
    res.status(200).send(allPlatf)
})

//route to post videogame

router.post('/videogame', async (req,res) =>{
    let {name, description, released, rating, platforms, img, genres} = req.body

    if (!name || !description || !genres ) {
        return res.status(400).send("Faltan parametros");
    }
    //valido que el nombre del juego no exista
    const findVideogame = await Videogame.findAll({ where: { name: name } });
    if (findVideogame.length != 0) {
        return res.send("El nombre ya esta en uso");
    }

    
    //creo un videogame
    let vgCreate = await Videogame.create({
        name,
        description,
        rating,
        released,
        img,
        platforms: platforms.toString(),

    });
    //busco el genero en mi Base de datos
    let genreDb = await Genres.findAll({
      where: { name: genres },
    });

    //agrego el genero a mi videogame creado
    vgCreate.addGenre(genreDb);

    res.send("El Videogame fue creado con exito");

})


//get videogame detail by id

router.get('/videogames/:id', async (req, res) =>{
    const {id} = req.params;
    try{
if(!id.includes('-')){
        let allVideogames = await getAllVideogames(); // me trae todo
    
        let idGame = await allVideogames.filter(e => e.id === parseInt(id));
    
        if(idGame.length > 0){
            const detalle = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            const description = detalle.data.description_raw;
            idGame[0]['description'] = description;
            res.status(200).send(idGame)
        }
    }else {
        let gameFound = await Videogame.findByPk(id, {
            include: [{
                model: Genres,
                attributes: ['name'],
                through : {
                    attributes: [],
                }
            }]
        })
        var arreglo = []
        arreglo.push(gameFound)

        res.status(200).json(arreglo)
    }
    }catch(error){
        res.status(404).send(error)
    }
    

})

//------------------------------ ROUTES END --------------------------------------------------------\\



module.exports = router;
