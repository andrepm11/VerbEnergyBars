<?php

	if ('POST' === $_SERVER['REQUEST_METHOD'])   {
        if(isset($_POST['url']) && $_POST['url'] == ''){
            if(empty($_POST['comments'])) {
                echo "Error";

            }else {
                $to = "team@verbenergybar.com";
                $name = trim($_POST['name']);
                $email = trim($_POST['email']);
                $comments = trim($_POST['comments']);
                $rating = trim($_POST['rating']);
                $subscribe=trim($_POST['subscribe']);

                $subject = "NEW WEBSITE REVIEW";
                $headers = "From: $email";
                $messages = "Name: $name \r\n
                 Email: $email \r\n
                 Rating: $rating stars\r\n
                 Subscribe: $subscribe\r\n
                 Comments: $comments";
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