# guptarithm
guptarithm is a **free & secure** full-stack (MERN) application that uses an **investment algorithm** to help users manage their own retirement assets. Users can create an account, input their investment accounts & holdings, and see portfolio analysis and trade recommendations with just a couple clicks of a button.

[Live Link](https://guptarithm.herokuapp.com/#/)

## Technologies
 * **MERN stack** - MongoDB, Express.js, JavaScript, Node.js
 * [IEX Cloud API](https://iexcloud.io/docs/api/) - to get real-world stock & fund prices
 * [Recharts](http://recharts.org/en-US) - to interactively visualize portfolio allocation
 * **mongoose.js** backend schema

 ## Features
  * E2E **user auth** with BCrypt and passport
  * **Security** - we never ask for or store any personally identifiable information (PII)
  * **Accounts & Holdings** - users can easily input their account and holdings information
  * **Portfolio Allocation** - users see a pie chart that breaks down where their assets are invested, with analysis for more detail
  * **Investment Algorithm** - with the click of a button users will get personalized trade recommendations to keep their retirement portfolios balanced


  ### Splash Page & User Auth
  Users are greeted with a clean and simple splash page where they can create an account or login.
  <p align="center">
    <img src="./gifs/splash_signup.gif" align="center">
  </p>

  ### Add Accounts
  Users can easily add accounts and enter basic info via a modal prompt.
  <p align="center">
    <img src="./gifs/accounts.gif" align="center">
  </p>

  ### Add Holdings
  Users can add holdings with a similar UI to accounts. Notice how the account values, charts and analysis all update seamlessly with each new holding.
  <p align="center">
    <img src="./gifs/holdings.gif" align="center">
  </p>
  
  ### Algorithm & Trade Recs
  Users can click a couple buttons and see a list of personalized trade recommendations to keep their retirement portfolios balanced and on track.
  <p align="center">
    <img src="./gifs/algo.gif" align="center">
  </p>