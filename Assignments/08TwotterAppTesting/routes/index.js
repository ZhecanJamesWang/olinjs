var path = require('path');
var mongoose = require('mongoose');
var userModel = require('./../models/userModel.js');
var tweetModel = require('./../models/tweetModel.js');

var routes = {};

routes.login = function(req, res) {

	res.render("login");
};


routes.addUsers = function(userName) {	
	userModel.count({name: userName}, function (err, count){

	    if(count>0){
	        console.log('user already exists');
		    }
		else{
			console.log('add new user');
	            formData = {name: userName}
				var o = new userModel(formData);	    	
		      	o.save(function(err, data) {
			    	if(err){
						console.log(err)
					}
					else{
			        	console.log("user is added: ", data);

					}
				});
		}
	}); 



	
};


routes.getInfo = function(req, res) {
	// userModel.find().remove().exec();
	// tweetModel.find().remove().exec();

	var users, tweets;
	
	userModel.find(function(err, data) {
		users = JSON.parse(JSON.stringify(data));


		tweetModel.find({}).sort({date: 'descending'}).find(function(err, data) {
			tweets = data;
			// tweets.forEach(function(element){console.log(element.name);});
			if (typeof(req.user) != "undefined"){
				currentUser = req.user.displayName;
			}
			else{
				currentUser = "";
			}

			res.render("home", {tweets: tweets, users: users, currentUser: currentUser});
		}); 
	});
}




routes.addTweet = function(req, res) {
	if(req.body){
		var o = new tweetModel({tweet: req.body.tweet, name: currentUser, date: req.body.date});
		o.save(function(err, data) {
		    if(err){
				console.log(err)
				res.end("");
			}
			else{
		    	res.json(data);
		    }
		});
	}
	else{
		res.end("");
	}

}


routes.delTweet = function(req, res) {
	if(req.body){
		console.log("delTweet");
		tweetModel.findOneAndRemove({"_id": req.body.id}, function(err, data) {
		res.json(data);
		});
	}
	else{
		res.end("");
	}
}


module.exports = routes;
