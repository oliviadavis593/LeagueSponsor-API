const path = require('path');
const express = require('express');
const LeaguesService = require('../leagues/leagues-service');

const leaguesRouter = express.Router();
const jsonParser = express.json();

const serializeLeague = league => ({
    id: league.id, 
    league_name: league.league_name,  
    website: league.website, 
    location: league.location, 
    latitude: league.latitude, 
    longitude: league.longitude, 
    price: league.price, 
})

leaguesRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        LeaguesService.getAllLeagues(knexInstance)
            .then(leagues => {
                res.json(leagues.map(serializeLeague));
            })
            .catch(next)
    })
    .get((req, res, next) => {
        if (!req.query.latitude || !req.query.longitude || !req.query.budget) {
            res.status(400).json({ error: 'Insufficent data provided' });
        }
        else {
            LeaguesService.findLeagues(req.query).then((leagues) => {
                res.status(200).json(leagues);
            })
            .catch(next)
        }
    })
    .post(jsonParser, (req, res, next) => {
        const { league_name, website, location, latitude, longitude, price } = req.body;
        const newLeague = { league_name, website, location, latitude, longitude, price };

        LeaguesService.createLeague(
            req.app.get('db'),
            newLeague
        )
            .then(league => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl + `/${league.id}`))
                    .json(serializeLeague(league))
            })
            .catch(next)
    })

module.exports = leaguesRouter; 