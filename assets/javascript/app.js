/*!
 * validate.js 0.12.0
 *
 * (c) 2013-2017 Nicklas Ansman, 2013 Wrapp
 * Validate.js may be freely distributed under the MIT license.
 * For all details and documentation:
 * http://validatejs.org/
 */

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBIimPmRheCy92C-RjKrrtc31wKOOevhwU",
  authDomain: "getdrugs-d1ac4.firebaseapp.com",
  databaseURL: "https://getdrugs-d1ac4.firebaseio.com",
  projectId: "getdrugs-d1ac4",
  storageBucket: "getdrugs-d1ac4.appspot.com",
  messagingSenderId: "893576016495"
};
firebase.initializeApp(config);


//Global variables
//dataBase reference
let dbRef = firebase.database();//variable needed to create 'folder' for each med selection




//#############################################################################################
// Start of API/AJAX queries
//#############################################################################################
//Spellcheck API
//TODO: Run the user input from through this function 
function spellChecker(med) {
  //Empty variable will be use to store array
  var spell;

  //Query for spell checker API.
  let spellQuery = "https://cors-anywhere.herokuapp.com/https://chemspell.nlm.nih.gov/spell/restspell/restSpell/getQuery4JSON?query=" + med

  //AJAX call for API
  $.ajax({
    url: spellQuery,
    method: "GET"
  }).then(function (response) {

    console.log("This is the response form chemSpell: ", response)//<---checking info from API

    //TODO: Turn our response into an array and split it from the '"'
    spell = response.split('"');

    //TODO: review all of our elements with a loop
    for (let i = 0; i < spell.length; i++) {
      //Capture our elements
      const el = spell[i];
      //TODO: This if will check first character of the elements in the array and check against user input first letter.
      if (el.charAt(0) == med.charAt(0).toUpperCase()) {

        console.log("Elements from array that match the chacrater: ", el);

        //TODO: Will need to pass this result  into a button or list creater function 
        //to populate DOM with correct spelling for user to select 

      };
    };
  });
};

//  FDA API 
//TODO: When user selects the correct spelling, i should send the value into the FDA functoin
function FDA(med) {
  //Query for FDA API.
  let FDAQuery = "https://api.fda.gov/drug/label.json?search=" + med; //Will need a variable in place




  $.ajax({
    url: FDAQuery,
    method: "GET"
  }).then(function (response) {

    console.log("This is the full response from FDA: ", response);//<---checking info from API


    //var medDB = dbRef.push()
    medDB.set({
      adverse_reactions: response.results[0].adverse_reactions,
      boxed_warning: response.results[0].boxed_warning
    });

  });

};
//#############################################################################################
// End of API/AJAX queries
//#############################################################################################


//Will need to creat an addBtn function to pass user selection into the data base below
//variable needed to create 'folder' for each med selection
medDB = dbRef.ref('med/' + med);
//Save data to folder with .set()
medDB.set({
  //KEY:VALUE,
  //KEY:VALUE,
  //KEY:VALUE
})

