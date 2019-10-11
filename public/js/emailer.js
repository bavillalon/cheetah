$(function () {
    $("#submit").on("click", function (event) {
        event.preventDefault();
        var emailObj = {
            emailRecipient: $("#emailOfUser").val().trim(),
            nameOfUser: $("#nameOfUser").val().trim(),
            subjectOfIssue: $("#subjectOfIssue").val().trim(),
            fullDescription: $("#fullDescription").val().trim(),
        };
        console.log(emailObj);
        // Send the PUT request.
        $.ajax("/api/mail", {
            type: "POST",
            data: emailObj
        }).then(
            function () {
                $("#emailOfUser").val("")
                $("#nameOfUser").val("")
                $("#subjectOfIssue").val("")
                $("#fullDescription").val("")
                console.log("sent");
                location.reload();
            }
        );
    });
});
