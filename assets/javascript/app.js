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
let response;//vairiable to llow us to play with FDA api response



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
  }).then(function (res) {

    console.log("This is the response form chemSpell: ", res)//<---checking info from API

    //TODO: Turn our response into an array and split it from the '"'
    spell = res.split('"');

    //TODO: review all of our elements with a loop
    for (let i = 0; i < spell.length; i++) {
      //Capture our elements
      const el = spell[i];
      //TODO: This if will check first character of the elements in the array and check against user input first letter.
      if (el.charAt(0) == med.charAt(0).toUpperCase()) {

        console.log("Elements from array that match the chacrater: ", el);

        //TODO: Will need to pass this result  into a button or list creater function 
        //to populate DOM with correct spelling for user to select 
        medSpellingList(el)
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
  }).then(function (res) {

    console.log("This is the full response from FDA: ", res);//<---checking info from API
    //assign the data to global variable. to be able to display on dom without saveing to database
    response = res;
  });
};
//#############################################################################################
// End of API/AJAX queries
//#############################################################################################



//#############################################################################################
// start Functions to manipulate the database
//#############################################################################################

//TODO: The addME function needs to be part of an (addButton).on.('click',
//med  =  'this' data attribute on a button
//removeMed(med)
//}
function addMed(med) {

  medDB = dbRef.ref('med/' + med);
  //Save data to folder with .set()
  medDB.set({
    medinfo: response,
    //KEY:VALUE,
    //KEY:VALUE
  });
};

//TODO: The removeMed function needs to be part of an (removeButton).on.('click',
//med  =  'this' data attribute on a button
//removeMed(med)
//}
function removeMed(med) {

  //Target your specific medication with med variable
  medDB = dbRef.ref('med/' + med);
  medDB.remove();
};

//#############################################################################################
// End Functions to maniipulate the database
//#############################################################################################


//TODO: ENTER will be the search for the med. i dont see a submit button
$('#med-search').submit(e => {
  e.preventDefault();


  let med = document.getElementById("search").value

  console.log('This is your meds ' + med)

  //pass med to the spell checker
  spellChecker(med)

  //reset serach form
  document.getElementById("med-search").reset()
})


//TODO: Create list items as they words are passed through from the spellchecker
function medSpellingList(words) {
  let ul = $('.spelling')
  
    let li = $('<li>', { 'class': 'med-li btn col s6 z-depth-1', 'data-name': words })
    ul.append(li.text(words))
  
  console.log(words + " in the medSpellingList");//<---checking to see if i am in this function
}


