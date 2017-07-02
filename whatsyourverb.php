<?php
	if ('POST' === $_SERVER['REQUEST_METHOD'])   {
        if(isset($_POST['email'])){
            if(empty($_POST['verb'])) {
                echo "Error";
            }else {
                $to = "team@verbenergybar.com";
                $verb = trim($_POST['verb']);
                $email = trim($_POST['email']);

                $subject = "What's Your Verb";
                $headers = "From: $email";
                $messages = "My Verb is: $verb";
                $mailsent = mail($to, $subject, $messages, $headers);

                if($mailsent) {
                    echo "Mail sent successfuly";
                }
                else
                {
                    echo "Error";
                } 
            }
        }
    }
?>