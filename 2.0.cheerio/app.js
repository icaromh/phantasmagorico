'use strict';
var request = require('request')
	,	cheerio = require('cheerio');

request('http://dolarhoje.com/', (err, res, body) => {
	let $     = cheerio.load(body);
	var dolar = $('#nacional').val();
	
	console.log(`Dolar hoje é: ${dolar}`);

	request({
		url: 'http://www.bagill.com/ascii-sig.php',
		method: 'POST',
		formData: {
			txt: `${dolar}`, font: "doh", width: "100", align: "l", submit: "Generate ASCII Signature"
		}
	},
	(err, res, body) => {
		let $     = cheerio.load(body);
		let ascii = $('#results pre').html();
		console.log(ascii);
		console.log("entendeu?");
	});
});