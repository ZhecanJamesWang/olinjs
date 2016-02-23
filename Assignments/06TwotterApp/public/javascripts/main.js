
var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};



//----------------------------------------------------------------------------------
var $loginForm = $("#login");

var loginFunction = function () {
  var name = $loginForm.find("#username").val();
  console.log(name);
  
  var formData = {
     name: name,
  }

$.post("addUsers", formData)
    .done(onSuccess)
     .error(onError);
}


var onSuccess = function(data, status) {
  console.log("addUsers onSuccess");
  window.location.href='/';
};



//----------------------------------------------------------------------------------
var $tweetForm = $("#newtweet");

var newTweetFunction = function () {
  var tweet = $tweetForm.find("#tweet").val();
  var name = $("#currentUser").html();
  // console.log("newTweetFunction");
  // console.log($("#currentUser").html());
  // console.log(tweet);

var currentdate = new Date(); 
  
  formData = {
      name: name,
      tweet: tweet,
      date: currentdate
  }

$.post("addTweet", formData)
    .done(addTweetonSuccess)
     .error(onError);
}


var addTweetonSuccess = function(data, status) {
  var tweetsList = $("#tweets");

  console.log("tweetsList"); 
  console.log(tweetsList);
  var tweetsListElementSample = $("#tweetsListElement");
  console.log(tweetsListElementSample);
  var tweetsListElement = tweetsListElementSample.clone();
  tweetsListElement.css("visibility", "visible");

  tweetsListElement = $(tweetsListElement);
  tweetsListElement.find('div.tweetName').html(data['name']);
  tweetsListElement.find('span.tweetContent').html(data['tweet']);
  tweetsListElement.attr("id", data["_id"]);
  console.log("addTweetonSuccess");
  console.log("id: ", data["_id"]);
  
  tweetsListElement.find("button:button").attr("onclick", "delTweetFunction('"+data["_id"]+"')");

  tweetsListElement.css('background-color', 'red');

  tweetsList.prepend(tweetsListElement);
  console.log(tweetsListElement);
  console.log("addTweet onSuccess");
  console.log(data);
};


//----------------------------------------------------------------------------------
// var $tweetForm = $("#newtweet");

var delTweetFunction = function (id) {
  console.log("delTweetFunction");
  // console.log(id);
  li = $("#"+ id);
  tweetName = li.find('div.tweetName').html();
  var currentName = $("#currentUser").html();
  console.log("currentName: ", currentName);
  console.log("tweetName: ", tweetName);
  if(tweetName = currentName){
    console.log("name match!")
    var formData = {id: id};
    $.post("delTweet", formData)
        .done(delTweetonSuccess)
         .error(onError);
  }
}


var delTweetonSuccess = function(data, status) {
  console.log("delTweet onSuccess");
  console.log(data);
  $( "#" + data._id).remove(); 
};


var userClickFunction = function(name) {
  console.log("userClickFunction onSuccess");
  var tweetsList = $("#tweets li");  
  tweetsList.each(function(idx, li) {
    if (name == $(li).find("div.tweetName").html()){
      console.log("find match");
      $(li).css('background-color', 'yellow');  
    }
  });
};




