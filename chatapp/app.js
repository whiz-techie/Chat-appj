
   var firebaseConfig = {
    apiKey: "AIzaSyAqIFjyLpFfTnAXpWh5A0GGhcOc2UxvIEU",
    authDomain: "real-time-chat-app-7be32.firebaseapp.com",
    databaseURL: "https://real-time-chat-app-7be32.firebaseio.com",
    projectId: "real-time-chat-app-7be32",
    storageBucket: "real-time-chat-app-7be32.appspot.com",
    messagingSenderId: "322720886256",
    appId: "1:322720886256:web:f60e8f9472d945f5870135",
    measurementId: "G-BGWEW2FR3M"
  };


  firebase.initializeApp(firebaseConfig);
  
var myName = prompt("Enter your name");

function sendMessage(event) {
    
    event.preventDefault()
    

        // get message
        var message = document.getElementById("message").value;
 
        // save in database
        firebase.database().ref("messages").push().set({
            "sender": myName,
            "message": message
        });
 
        // prevent form from submitting

}
firebase.database().ref("messages").on("child_added", function(snapshot){


var html = "";
html +=`<li id = "message-${snapshot.key}" + >`;
if(snapshot.val().sender == myName) {
    html += "<button data-id='"+ snapshot.key +"' onclick ='deleteMessage(this)'>"
        html+= "Delete"
    html += "</button>";
}
    html += snapshot.val().sender + ": " + snapshot.val().message;
html +="</li>";

document.getElementById("messages").innerHTML += html;
});
function deleteMessage(self) {
    var messageId = self.getAttribute("data-id");

    firebase.database().ref("messages").child(messageId).remove();
}
 

firebase.database().ref("messages").on("child_removed", function (snapshot) {
    // remove message node
    document.getElementById("message-" + snapshot.key).innerHTML = "This message has been removed";
});