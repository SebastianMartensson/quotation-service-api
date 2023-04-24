# Quotation serivce for cleaning company
This API have three endpoints. One GET and two POST.<br><br>
GET request ***'/api/v1/city-costs/'*** returns a list of json object containing information about all the available cities and the prices for the different choices.
<br><br>
POST request  ***'/api/v1/city-costs/city'*** takes an json object as req.body containing of *{"city": "city"}*. To do a search for the desired city in the mongoDB if a city was found a json object with information of the specific city is returned.
<br><br>
POST request  ***'/api/v1/city-costs/calculate'*** takes an json object as req.body containing of <br>*{
  "city": "uppsala",
  "price_per_square_meter": 123,
  "window_cleaning": true,
  "balcony_cleaning": true,
  "removal_of_garbage": true
}*.<br>
Gets the prices from the selected options and returns an estimated cost.