const rp = require('request-promise');
const $ = require('cheerio');
// var fs = require('fs');
const arr = [];
var url  = "https://www.nokia.com/about-us/investors/";
console.log("Web scrap : "+ url)
		rp(url).then(function(html) {
        	var entities = $(html).find('p').length;// to get p tag length
			$('p',html).each(function(i, elem) {
  				console.log($(this).text()+"\n");
			});
		})
		.catch(function(err) {
			//handle error
			console.log("Unable to scrap the page",err)
			// res.json({"status":'false',"message":"Unable to scrap the page"});
		});