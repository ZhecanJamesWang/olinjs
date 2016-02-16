var mongoose = require('mongoose');
var express = require('express');
var catModel = require('./../models/catModel.js'); // Conventionally you'd name this variable "Cat" -- constructors are capitalized
var db = require('../fakeDatabase');
// It's usually good practice to group your dependencies based on where they're
// coming from -- all external dependencies together (mongoose and express),
// all internal dependencies together (catModel and db), etc.

var router = {};

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

//function that constructs and returns cat object
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
	return cats[index];
}

function sortCatsbyColor(paramColor, cats){
	// This is a great place to use Array.filter -- does exactly what you're doing here
	// and requires MUCH less work from you. Maybe more efficient, too!
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


//get all cat names
router.getAllCats = function(req, res, next){
	catModel.find(function(err, data) {
		var cats = data;
		cats = sortCats(cats);
		console.log(cats);
		var message = "All the cats are: "
		res.render("allCats", {message: message, cats: cats});
	});
};


// create new cat
router.getNewCat = function(req, res, next) {
	var cat = getCat();
	// var cats = [cat]; -- you'd want to use "var cats" so the variable is scoped within the function
	// ... or you could just define cats as [cat] in the object, like I did below

	var o = new catModel(cat);
	o.save(function(err) {
		res.render("allCats", {message: "new cat: ", cats: [cat]});
	});
};



router.getCatColor = function(req, res){
	var color = req.params.color;
	// var color = color.slice(1, color.length); // good, you don't need this. Go ahead and remove the comment next time!
	catModel.find({}, function(err, data) {
		var cats = data
		cats = sortCatsbyColor(color, cats);
		// You're finding all cats of a particular color by finding all cats and then
		// running what's essentially a filter function over the list -- would be better
		// to use a Mongoose query! That's what Mongoose is for.
		res.render("allCats", {message: "Find cats: ", cats: cats});
	});
};

router.deleteCat = function(req, res){
	catModel.find({}, function(err, cats) {
		// I went through and cleaned up extraneous variables -- this is a little cleaner
		var cat = findOldestCat(cats);
		catModel.findOneAndRemove({"_id": cat._id}, function(err, data) {
			catModel.find({}, function(err, cats) {
				res.render("allCats", {message: "After deleting: ", cats: cats});
			});
			// particularly when nesting callbacks, indentation is really important.
		});
	});
};

router.home = function(req, res){
	res.render("home");
};


module.exports = router;
