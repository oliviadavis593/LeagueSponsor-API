# LeagueSponsor 🏆

-  [LeagueSponsor](https://leaguesponsor.oliviadavis593.vercel.app/) is a fully responsive full-stack React application designed for the LeagueSide company tech interview! The Frontend repo can be found [here](https://github.com/oliviadavis593/LeagueSponsor).

## API Overview 

```
/api
.
├── /leagues
│   └── GET
│   └── POST   
```

### POST /api/leagues
```javascript
//req.body
{
    league_name: String, 
    location: String, 
    latitude: Number, 
    longitude: Number, 
    price: Number
}

//res.body
{
    league_name: String, 
    location: String, 
    price: Number
}
```

### GET /api/leagues
```javascript
//req.body
{
    league_name: String, 
    location: String, 
    latitude: Number, 
    longitude: Number, 
    price: Number
}

//res.body
{
    league_name: String, 
    location: String, 
    price: Number
}
```

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

# Tech Used 🖥
**Back-End**
- [Node](https://nodejs.org/en/) (JavaScript runtime environment)
- [Express](https://expressjs.com/) (web application framework for Node.js)
- [PostgreSQL](https://www.postgresql.org/) (Relational Database Management System)

**Testing and Deployment**
- [Enzyme](https://github.com/enzymejs/enzyme) (Front-End Framework Testing)
- [Mocha](https://mochajs.org/) (Back-End Framework Testing)
- [Chai](https://www.chaijs.com/) (Assertion Library For Node)
- [Heroku](https://www.heroku.com/platform) (Cloud PaaS)