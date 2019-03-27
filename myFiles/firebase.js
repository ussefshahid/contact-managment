(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCThszC4PJ7KQrdal0MGNN2es7I6U0wIgc",
        authDomain: "webproject-260ba.firebaseapp.com",
        databaseURL: "https://webproject-260ba.firebaseio.com",
        projectId: "webproject-260ba",
        storageBucket: "webproject-260ba.appspot.com",
        messagingSenderId: "1015769504177"
    };
    firebase.initializeApp(config);

    //get elements
    const preobject = document.getElementById('object');

    // create references
    const dbRefObject = firebase.database().ref().child('object');

    //sync object changes
    dbRefObject.on('value', snap => console.log(snap.val()));







}());