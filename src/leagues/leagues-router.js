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
        const knexInstance = req.app.get('db')
        const { latitude, longitude, budget, radius } = req.query; 

        LeaguesService.getAllLeagues(knexInstance)
            .then(leagues => {
     

        if (!latitude || !longitude || !budget || !radius) {
            return res.status(200).json(leagues)
        } else {
            /*
             This is a random assumption of what 5 miles radius might be
            */
           const isWithinRadius = (league) => {
                   return league.latitude - latitude <= radius && league.longitude - longitude <= radius;
           };
           const withinRadius = leagues.filter(isWithinRadius).sort((a, b) =>
             a.price > b.price ? 1 : -1,
           );
           let sum = 0; 
           const withinBudget = [];
           withinRadius.forEach((league) => {
               if (sum + league.price > budget || league.price > budget) {
                   return;
               }
               else {
                   withinBudget.push(league);
                   sum += league.price; 
               }
           });
            return res.status(200).json(withinBudget)
        
        }
        
    })
})
    
    .post(jsonParser, (req, res, next) => {

        LeaguesService.createLeague(
            req.app.get('db'),
            req.body
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