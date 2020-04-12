var ig = require('instagram-scraping');
var username = "mindcrewtechnologiespvtltd";
ig.scrapeUserPage(username).then(result => {
  console.dir(result);
});