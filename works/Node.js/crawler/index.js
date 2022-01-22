var cheerio = require('cheerio'),
$ = cheerio.load('<h2 class = "title" title="sdf">Hello world</h2>');

$('h2.title').text('Hello there!');
$('h2').addClass('welcome');
console.log($('h2').attr('title'));

$('h2').attr('title');
console.log($.html());

$.html();