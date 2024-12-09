var fs = require('fs');

// JSON file with the data
var data = fs.readFileSync('data.json');

var elements = JSON.parse(data).elements; // Fixed parsing to access "elements" array
const express = require("express");
const app = express();

// To solve the CORS issue
const cors = require('cors');

app.listen(3000, () => console.log("Server started at port 3000"));

app.use(express.static('public'));
app.use(cors());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

app.get('/elements', alldata);

function alldata(request, response) {
    
    response.send(elements);
}

app.get('/elements/:element/', searchElement);

function searchElement(request, response) {
    const word = decodeURIComponent(request.params.element).toLowerCase();
	const result = elements.find(el => el.name.toLowerCase() === word);

    if (result) {
        response.send(result); 
    } else {
        response.status(404).send({ status: "Not Found" });
    }
}

