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



// AJAX queries
function userSelection(med) {
  let FDAQuery = "https://api.fda.gov/drug/label.json?search=" + med; //Will need a variable in place
  //let FDAQuery = "https://api.fda.gov/drug/label.json?search=prozac"; //Will need a variable in place
  medDB = dbRef.ref('med/'+ med);//variable needed to create 'folder' for each med selection

  $.ajax({
    url: FDAQuery,
    method: "GET"
  }).then(function (response) {

    console.log("This is the full response: ", response);
    console.log("This is the meta disclaimer for the API: ", response.meta.disclaimer);
    console.log("The results are in an array: ", response.results[0]); //<--response.results[0] should be assigned to variable
    console.log("This is the results indexed for adverse_reactions which also come in an array: ", response.results[0].adverse_reactions);
    console.log("These are the results for adverse_reactions index 0:", response.results[0].adverse_reactions[0]);


    //var medDB = dbRef.push()
    medDB.set({
      adverse_reactions: response.results[0].adverse_reactions,
      boxed_warning: response.results[0].boxed_warning
    })

  });

}