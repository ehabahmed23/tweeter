/*
 * Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$( document ).ready(function() {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  
const createTweetElement = function(tweet) {
  const timestamp = timeago.format(tweet.created_at);
  let $tweet = $(`
  <article class="tweet-container">
  <header>
  <div id = 'avatar_username'>
  <img src="${escape(tweet.user.avatars)}" class="avatar"> 
  <span>${tweet.user.name}</span>
  </div>
  <div>
  ${tweet.user.handle}
  </div>
      </header>
      <p class="user-post">${escape(tweet.content.text)}</p>
      <footer> 
        ${timestamp}
        <span>
          <i class="fa-sharp fa-solid fa-flag"></i>
          <i class="fa-sharp fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </span>
      </footer>
    </article>`);
    return $tweet;
  };
  

const renderTweets = (tweets) => {
  const container = $("#tweets-container").empty();

 tweets.forEach(function(tweet){
   let tweetElement = createTweetElement(tweet)
   container.prepend(tweetElement)
 })
};

const loadTweets = () => {
  $.get('http://localhost:8080/tweets', (data) => {
    console.log("Fetched succesfully: ", data);
    renderTweets(data);
  });
};



  $('.tweet-form').submit(function(event){
  event.preventDefault();
  const serializeTweet = $(this).serialize();
  console.log(serializeTweet);
  const tweetData = $('#tweet-text').val();
    if (!tweetData.length) {
      $("#error-message").text('No text. Please try again.');
      $("#error-container").slideDown();
      return
    } else if (tweetData.length > 140) {
      $("#error-message").text("Too long. Your post must be less then 140 characters");
      $("#error-container").slideDown();
      return
    }
  $.post('http://localhost:8080/tweets', serializeTweet, (result) => {
    $("textarea").val("");
    $(".counter").text(0);
    $("#error-container").hide();
    loadTweets();
    });
  })


loadTweets();

});

