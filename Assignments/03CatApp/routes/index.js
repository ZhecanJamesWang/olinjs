var router = {};

var express = require('express');

var db = require('../fakeDatabase');

var nameList = ["Tom", "James", "Shruti", "Sherry"];


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function getColor() {
  colorList = ['black', 'white', 'yellow', 'gray', 'brown'];
  firstColor = colorList[getRandomInt(0, colorList.length-1)];
  secondColor = colorList[getRandomInt(0, colorList.length-1)];
  return [firstColor, secondColor];
}
//function that constructs and returns lizard object
function getCat(){
  var cat = {
    name: nameList[getRandomInt(0,nameList.length-1)],
    age: getRandomInt(0,100),
    color: getColor()
  };
  return cat;
}

function sortCats(cats){
	cats.sort(function (a, b) {
	if (a.age > b.age) {
	return 1;
	}
	if (a.value < b.value) {
	return -1;
	}
	// a must be equal to b
	return 0;
	});
	return cats;
}

function findOldestCat(cats){
	var maxAge = 0;
	var index = 0;
	var counter = 0;
	cats.forEach(function(cat){
		if (maxAge < cat.age){
			maxAge = cat.age;
			index = counter;
			counter += 1;
		}
	});
	return index;
}

function sortCatsbyColor(paramColor, cats){
	var colorCats = [];
	for (var i = 0; i < cats.length; i++){
		console.log("color[0]" + cats[i].color[0]);
		console.log("color[1]" + cats[i].color[0]);
		if ((cats[i].color[0] == paramColor)||(cats[i].color[1] == paramColor)){
			colorCats.push(cats[i]);
		}
	}
	console.log(colorCats)
	return colorCats;
}


//get all lizard names
router.getAllCats = function(req, res, next){
	var cats = db.getAll();
	cats = sortCats(cats);
	console.log(cats)
	var message = "All the cats are: "
	res.render("allCats", {message: message, cats: cats});
}


// create new lizard named Bob

router.getNewCat = function(req, res, next) {
	var cat = getCat();
	db.add(cat);
	var message = "new cat: "
	console.log(cat)
	cats = [cat];
	res.render("allCats", {message: message, cats: cats});
	// res.render("eachCat", cat);
}

router.getCatColor = function(req, res){
	var color = req.params.color;
	var color = color.slice(1, color.length);
	console.log(color);
	var cats = db.getAll();
	cats = sortCatsbyColor(color, cats);
	var message = "Find cats: ";
	res.render("allCats", {message: message, cats: cats});
}

router.deleteCat = function(req, res){
	var cats = db.getAll();
	var index = findOldestCat(cats);
	var cat = db.remove(index);
	console.log(cat)
	var message = "delete cat: "
	res.render("allCats", {message: message, cats: cat})
}

router.home = function(req, res){
	res.render("home");
};


module.exports = router;
