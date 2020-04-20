 const rp = require('request-promise');
const $ = require('cheerio');
// const url = 'https://www.infosys.com/about.html';
const fetch = require('node-fetch');
var router = express.Router();

router.post('/', function(req, res, next) {
	if(req.body.reqType == 'webScrap'){

		console.log("parse web scrap calling")
		rp(req.body.url).then(function(html) {
			var a = $( html).text();
			var entities = a.replace(/\n/g,'');
			entities = entities.replace(/\t/g,'');
			// console.log(entities)
			res.json({"status":'true',"message":entities.trim()});
		})
		.catch(function(err) {
			//handle error
			console.log(err)
			res.json({"status":'false',"message":"Unable to scrap the page"});
		});
	}
	else if(req.body.reqType == 'customAboutSearch'){

		console.log("scrapAboutCustom calling")
		var keyword = req.body.keyword;
		if(!keyword.trim() ||keyword == undefined || keyword== null){
			res.json({status: 'false',message : 'Keyword can not blank'})
		}
		else{
			fetch('https://www.googleapis.com/customsearch/v1?key=AIzaSyCFkEVLPFknrAtMbdelG8lxLLdaEaJ6gdM&cx=008904969361411019302:prrfelrwnlk&q='+keyword, {
			"method": "GET"
			})
			.then(res => res.json())
			.then(json =>
				{
					// console.log(json);
					// var a = $( html).text();
					var entities = json.items[0].snippet.replace(/\n/g,'');
					res.json({status: 'true',about: entities})
				}
			)
			.catch(function (err)
			{
				// console.log("error",err)
				res.json({status: 'false',message : 'Something went wrong'})
			});
		}
	}

	else if(req.body.reqType == 'customAboutSearch_new'){

		console.log("scrapAboutCustom calling")
		var keyword = req.body.keyword;
		if(!keyword.trim() ||keyword == undefined || keyword== null){
			res.json({status: 'false',message : 'Keyword can not blank'})
		}
		else{
			fetch('https://www.googleapis.com/customsearch/v1?key=AIzaSyCFkEVLPFknrAtMbdelG8lxLLdaEaJ6gdM&cx=008904969361411019302:prrfelrwnlk&q='+keyword, {
			"method": "GET"
			})
			.then(res => res.json())
			.then(json =>
				{
					// console.log(json);
					var entities = json.items[0].snippet.replace(/\n/g,'');
					res.json({status: 'true',about: entities, link : json.items[0].link})
				}
			)
			.catch(function (err)
			{
				res.json({status: 'false',message : 'Something went wrong'})
			});
		}
	}

	else if(req.body.reqType == 'aboutTextScrap'){ // HTML scrap

		console.log("aboutTextScrap calling")
		var keyword = req.body.keyword;
		if(!keyword.trim() ||keyword == undefined || keyword== null){
			res.json({status: 'false',message : 'Keyword can not blank'})
		}
		else{
			keyword=keyword+" aboutus";
			fetch('https://www.googleapis.com/customsearch/v1?key=AIzaSyCFkEVLPFknrAtMbdelG8lxLLdaEaJ6gdM&cx=008904969361411019302:prrfelrwnlk&q='+keyword, {
			"method": "GET"
			})
			.then(res => res.json())
			.then(json =>
				{
					// var entities = json.items[0].snippet.replace(/\n/g,'');
					///Scraper run
					var url = json.items[0].link;
					rp(url).then(function(html) {
						console.log(url)
						var a = $( html).text();
						var entities = a.replace(/\n/g,'');
						entities = entities.replace(/\t/g,'');
						res.json({"status":'true',"data":entities.trim(),"message":"Scraper worked"});
					})
					.catch(function(err) {
						res.json({"status":'false',"data":"", "message" : "Scraping is not allowed"});
					});
					///Scraper run
				}
			)
			.catch(function (err)
			{
				res.json({status: 'false',message : 'Something went wrong'})
			});
		}
	}

	else if(req.body.reqType == 'p_selectorScrap'){ // P tag scrap

		console.log("p_selectorScrap calling")
		var keyword = req.body.keyword;
		if(!keyword.trim() ||keyword == undefined || keyword== null){
			res.json({status: 'false',message : 'Keyword can not blank'})
		}
		else{
			keyword=keyword+" aboutus";
			fetch('https://www.googleapis.com/customsearch/v1?key=AIzaSyCFkEVLPFknrAtMbdelG8lxLLdaEaJ6gdM&cx=008904969361411019302:prrfelrwnlk&q='+keyword, {
			"method": "GET"
			})
			.then(res => res.json())
			.then(json =>
				{
					///Scraper run start
					var url = json.items[0].link;
					let text='';
					rp(url).then(function(html) {
						$('p',html).each(function(i, elem) {
							text+=$(this).text()+"\n\n";
						});
						// console.log(text)
						res.json({"status":'true',"data":text,"message":"Scraper worked"})
					})
					.catch(function(err) {
						res.json({"status":'false',"data":"", "message" : "Scraping is not allowed"});
					});
					///Scraper run end
				}
			)
			.catch(function (err)
			{
				res.json({status: 'false',message : 'Something went wrong'})
			});
		}
	}

})

module.exports = router;