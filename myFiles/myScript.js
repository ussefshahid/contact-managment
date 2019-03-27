$(function () {
    var reglastname = /^[a-z]{2,}$/i;
    var regemail = /^[a-z].*@[a-z]{2,}\.[a-z]{2,}$/i;
    var regtel = /^[0-9]{10}$/i;

    $(".myButton").attr("disabled","false");


    $("input#lastName").blur(function () {
        var lastname = $("#lastName").val();
        if(!reglastname.test(lastname)){
            $(this).css("border", "2px solid red");
            $(".lname p").remove();
            var message = $("<p>Nom est incorrect!</p>").css("color","red");
            $(".lname").append(message);
        }else{
            $(this).css("border", "2px solid green");
            $(".lname p").remove();
            var message = $("<p>Nom est correct!</p>").css("color","green");
            $(".lname").append(message);
        }
    });

    $("input#firstName").blur(function () {
        var firstName = $("#firstName").val();

        if(!reglastname.test(firstName)){
            $(this).css("border", "2px solid red");
            $(".fname p").remove();
            var message = $("<p>Prenom est incorrect!</p>").css("color","red");
            $(".fname").append(message);
        }else{
            $(this).css("border", "2px solid green");
            $(".fname p").remove();
            var message = $("<p>Prenom est correct!</p>").css("color","green");
            $(".fname").append(message);
        }
    });

    $("input#email").blur(function () {
        var email = $("#email").val();

        if(!regemail.test(email)){
            $(this).css("border", "2px solid red");
            $(".lemail p").remove();
            var message = $("<p>Email est incorrect!</p>").css("color","red");
            $(".lemail").append(message);
        }else{
            $(this).css("border", "2px solid green");
            $(".lemail p").remove();
            var message = $("<p>Email est correct!</p>").css("color","green");
            $(".lemail").append(message);
        }
    });

    $("input#tel").blur(function () {
        var tel = $("#tel").val();

        if(!regtel.test(tel)){
            $(this).css("border", "2px solid red");
            $(".ltel p").remove();
            var message = $("<p>Telephone est incorrect!</p>").css("color","red");
            $(".ltel").append(message);
        }else{
            $(this).css("border", "2px solid green");
            $(".ltel p").remove();
            var message = $("<p>Telephone est correct!</p>").css("color","green");
            $(".ltel").append(message);
            $(".myButton").removeAttr("disabled");
        }
    });

    function getLength(){
        var ref = firebase.database().ref("Personne/");
        var key;

        ref.on("value", function(snapshot) {
            key = Object.keys(snapshot.val());
        }, function (error) {
            console.log("Error: " + error.code);
        });

        return key.length;
    }

    function getData(){
        var ref = firebase.database().ref('Personne/');

        ref.on("value", function(snapshot) {
            var data=snapshot.val();
            var key = Object.keys(data);

            for(var i=0; i<key.length;i++){
                var text="";
                console.log(data + i +"");
                var j = key[i];
                var fname = data[j].firstName;
                var lname = data[j].LastName;
                var email = data[j].Email;
                var tele = data[j].Tel;

                text+="<tr>" +
                    "<td>"+fname+"</td>" +
                    "<td>"+lname+"</td>" +
                    "<td>"+email+"</td>" +
                    "<td>"+tele+"</td>" +
                    "<td><button class='edit' data-toggle='modal' data-target='#myModal' onclick='document.querySelector(\".editid\").innerHTML="+j+"; editer();'><span class='glyphicon glyphicon-edit'></span></button></td>" +
                    "<td><button class='delete' onclick='document.querySelector(\".deleteid\").innerHTML="+j+"; deleter();'><span class='glyphicon glyphicon-trash'></span></button></td>" +
                    "</tr>";

                $("table").append(text);
            }
            console.log(snapshot.val());
        }, function (error) {
            console.log("Error: " + error.code);
        });
    }

    $(".affiche").click(function () {
        $("tr").not(".trCondition").remove();
        getData();
    });

    $(".clear").click(function () {
        $("tr").not(".trCondition").remove();
    });

    $(".adding").hide();
    $(".showing").hide();
    $(".deletemessage").hide();
    $(".updatemessage").hide();

    $(".myButton").click(function () {
        var ID = getLength()+1;
        var firstName = $("#firstName").val();
        $("#firstName").val("")
        var lastName = $("#lastName").val();
        $("#lastName").val("")
        var email = $("#email").val();
        $("#email").val("")
        var tele = $("#tel").val();
        $("#tel").val("");

        var data = { firstName: firstName, LastName: lastName, Email:email, Tel:tele };
        var MyPath = firebase.database().ref('Personne/'+ID);
        MyPath.set(data)
            .then(function() {
                console.log('succeeded');
            })
            .catch(function(error) {
                console.log("failed: " + error.message);
            });

        $(".adding").show();
        $(".addmessage").show();
        $(".addcontact").hide();
    });

    $("#btnadd").click(function () {
        $(".acceuil").hide();
        $(".showing").hide();
        $(".adding").show();

        $(".addcontact").show();
        $(".addmessage").hide();
    });

    $("#btnaccueil").click(function () {
        $(".adding").hide();
        $(".showing").hide();


        $(".acceuil").show();
    });

    $("#btnshow").click(function () {
        $(".acceuil").hide();
        $(".adding").hide();
        $(".deletemessage").hide();
        $(".updatemessage").hide();
        $("tr").not(".trCondition").remove();
        getData();
        $(".showing").show();
        $(".show1").show();
    });

    $(".gotoaffiche").click(function () {
        $(".acceuil").hide();
        $(".adding").hide();
        $(".deletemessage").hide();
        $(".updatemessage").hide();
        $("tr").not(".trCondition").remove();
        getData();
        $(".showing").show();
        $(".show1").show();
    });

});