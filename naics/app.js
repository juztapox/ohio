const express = require("express");
const cors = require("cors");
const NAICS = require("naics-2012");
const axios = require('axios')

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let vm = 'https://vm104.datacubes.io'

// Routes
app.get("/", (req, res) => {
	let results = NAICS.search(req.query.query);
	return res.json(results);
});

app.get("/find", (req, res) => {
	let results = NAICS.find(req.query.query);
	return res.json(results);
});

app.get("/below", (req, res) => {
	let results = NAICS.below(req.query.query);
	results = results.map(r => {
		return { code: r.code, title: r.title };
	});
	return res.json(results);
});

app.get("/above", (req, res) => {
	let results = NAICS.above(req.query.query);
	results = results.map(r => {
		return { code: r.code, title: r.title };
	});
	return res.json(results);
});

app.post("/wcc", (req, res) => {
    axios.post(`${vm}/rest/wcc`, req.body)
    .then(r=>{
        return res.json(r.data);
    })
});



// Start server
app.listen(port, () =>
	console.log(`NAICS lookup service listening on port ${port}!`)
);
