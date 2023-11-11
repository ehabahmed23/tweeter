/*
 * Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$( document ).ready(function() {
  
  loadTweets();
});
const createTweetElement = function(tweet) {
  
  let $tweet = $(`
  <article class="tweet-container">
  <header>
  <div id = 'avatar_username'>
  <img src="${tweet.user.avatars}" class="avatar"> 
  <span>${tweet.user.name}</span>
  </div>
  <div>
  ${tweet.user.handle}
  </div>
      </header>
      <p class="user-post">${tweet.content.text}</p>
      <footer> 
        ${tweet.created_at}
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


