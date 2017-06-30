<?php

	if ('POST' === $_SERVER['REQUEST_METHOD'])   {
        if(isset($_POST['url']) && $_POST['url'] == ''){
            if(empty($_POST['email'])) {
                echo "Error";

            }else {
                $to = "team@verbenergybar.com";
                $message = trim($_POST['message']);
                $email = trim($_POST['email']);

                $subject = "Contact Us Form";
                $headers = "From: $email";
                $messages = $message;
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