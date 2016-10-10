/******************************************************************************/
/* Treehouse Full Stack Javascript Tech Degree                                */
/* Project #1: Random Quote Generator + EXTRA CREDIT                          */
/* Author: lis22                                                              */
/* Date: Oct 10, 2016                                                         */
/******************************************************************************/

//Creates an array of JavaScript objects to hold quotes
//EXTRA CREDIT: more than 5 quotes & categorization tags
var quotes = [
  {
    quote: "Most good programmers do programming not because they expect to get" +
           " paid or get adulation by the public, but because it is fun to program.",
    source: "Linus Torvalds",
    citation: "Internet",
    tags: ["inspiration", "motivation", "Linux"],
  },
  {
    quote: "Everyday life is like programming, I guess. If you love something you" +
           " can put beauty into it.",
    source: "Donald Knuth",
    tags: ["inspiration", "motivation"],
  },
  {
    quote: "The best thing about a boolean is even if you are wrong, you are" +
           " only off by a bit.",
    source: "Anonymous",
    tags: ["humor"],
  },
  {
    quote: "First, solve the problem. Then, write the code.",
    source: "John Johnsons",
    tags: ["motivation"],
    citation: "Internet",
  },
  {
    quote: "Measuring programming progress by lines of code is like measuring" +
           " aircraft building progress by weight",
    source: "Bill Gates",
    citation: "Internet",
    year: "1995",
    tags: ["humor", "Microsoft"],
  },
  {
    quote: "It’s not a bug – it’s an undocumented feature.",
    source: "Anonymous",
    tags: ["humor", "programming life"],
  },
  {
    quote: "Always code as if the guy who ends up maintaining your code will be" +
           " a violent psychopath who knows where you live.",
    source: "Martin Golding",
    year: "1998",
    tags: ["humor", "programming life"],
  },
  {
    quote: "In order to understand recursion, one must first understand recursion.",
    source: "Anonymous",
    tags: ["humor", "programming life"],
  },
  {
    quote: "Don’t worry if it doesn’t work right. If everything did, you’d be out of a job. ",
    source: "Mosher’s Law of Software Engineering",
    year: "2000",
    tags: ["humor", "programming life"],
  },
  {
    quote: "Debugging is twice as hard as writing the code in the first place." +
           " Therefore, if you write the code as cleverly as possible, you are," +
           " by definition, not smart enough to debug it.",
    source: "Brian W. Kernighan",
    tags: ["humor", "programming life"],
  }
];

var validQuoteLength = quotes.length;
var hue, saturation, lightness, intervalId;

addEventHandlers();

//EXTRA CREDIT changes quote every 30 seconds
intervalId =  setInterval(printQuote, 30000);

/******************************************************************************/
/* getRandomQuote()                                                           */
/* Selects a random quote object from the quotes array and returns the        */
/* randomly selected quote object.                                            */
/* EXTRA CREDIT: It won't display the same quote twice until all quote have   */
/* been displayed.                                                            */
/******************************************************************************/
function getRandomQuote() {
  var quoteIndex;
  var quoteObj;

  //reset validquotelength when all quotes have been used
  if (validQuoteLength === 0) {
    validQuoteLength = quotes.length;
  }
  //retrieve a random index
  quoteIndex =  getRandomNumber(validQuoteLength);

  //store a copy of the quote object retrieved at that array index
  quoteObj = quotes[quoteIndex];

  //remove the chosen quote at the index retrieved from the array
  quotes.splice(quoteIndex,1);

  //place the chosen quote at the end of the array
  quotes.push(quoteObj);

  //decrease the length of quotes that are available for use
  validQuoteLength--;

  return quoteObj;
}

/******************************************************************************/
/* addEventHandlers()                                                         */
/* adds the event listeners for clicking the button, mousing over the button  */
/* and when the mouse leaves the button                                       */
/******************************************************************************/
function addEventHandlers() {
  document.getElementById("loadQuote").addEventListener("click", resetTimer, false);
  document.getElementById("loadQuote").addEventListener("mouseover", addHover, false);
  document.getElementById("loadQuote").addEventListener("mouseleave", removeHover, false);
}

/******************************************************************************/
/* resetTimer()                                                               */
/* Used to reset the interval. This is needed because it should start a new   */
/* interval when the show another quote button is clicked. Otherwise  it      */
/* changes quotes too quickly after the button is clicked.                    */
/******************************************************************************/
function resetTimer() {
  clearInterval(intervalId);
  intervalId =  setInterval(printQuote, 30000);
  printQuote();
}

/******************************************************************************/
/* printQuote()                                                               */
/* calls the getRandomQuote function and stores the returned quote object in  */
/* a variable. It then calls to change the background color of the page. It   */
/* builds a string with the properties of the quote object but won't add      */
/* missing properties. Then it displays the HTML string to the page.          */
/******************************************************************************/
function printQuote() {
  var quoteObj = getRandomQuote();

  changeBackgroundColor();

  var output = "<p class='quote'>" + quoteObj.quote + " </p> <p class='source'>" +
  quoteObj.source + " ";

  if (quoteObj.hasOwnProperty("citation"))
    output += "<span class ='citation'>" + quoteObj.citation + " " + "</span>";

  if (quoteObj.hasOwnProperty("year"))
    output += "<span class='year'>" + quoteObj.year + " " + "</span>";

  //EXTRA CREDIT: display tags to categorize each quote
  output+= "<span class='tags'> #" + quoteObj.tags.join(" #") + "</span></p>";

  document.getElementById("quote-box").innerHTML = output;
}

/******************************************************************************/
/* getRandomNumber()                                                          */
/* Accepts the max value, creates a random number from 0 up to                */
/* and including the max value, and returns the value                         */
/******************************************************************************/
function getRandomNumber(max){
  return Math.floor((Math.random()) * max);
}

/******************************************************************************/
/* changeBackgroundColor()                                                    */
/* Randomly changes the background color. Also changes the button's color     */
/* EXTRA CREDIT                                                               */
/******************************************************************************/
function changeBackgroundColor() {
  hue =  getRandomNumber(360);
  saturation = getRandomNumber(100);
  lightness =  getRandomNumber(20);

  document.body.style.backgroundColor = "hsl(" + hue + "," + saturation +
  "%," + lightness + "%" + ")";

  document.getElementById("loadQuote").style.backgroundColor = "hsl(" + hue +
  "," + saturation + "%," + lightness + "%" + ")";
}

/******************************************************************************/
/* addHover()                                                                 */
/* Adds a highlight color to the button                                       */
/******************************************************************************/
function addHover() {
  document.getElementById("loadQuote").style.backgroundColor = "hsl(" + hue +
  "," + saturation + "%," + (lightness+30) + "%" + ")";
}

/******************************************************************************/
/* removeHover()                                                              */
/* Changes button back to default color                                       */
/******************************************************************************/
function removeHover() {
  document.getElementById("loadQuote").style.backgroundColor = "hsl(" + hue +
  "," + saturation + "%," + lightness + "%" + ")";
}
