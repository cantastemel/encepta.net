<?php
// Only process POST reqeusts.
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $to = "info@encepta.net";     

    $headers = 'From: info@encepta.net' . "\r\n" .
    'Reply-To: info@encepta.net' . "\r\n" .
    'X-Mailer: PHP/' . phpversion() . "\r\n";

    $subject = "You have a message sent from your website"; 
    
    if( isset($_POST['email']) ){
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    }else{
        $email = "";
    }
    if( isset($_POST['fname']) ){
        $fname = strip_tags(trim($_POST["fname"]));
        $fname = str_replace(array("\r","\n"),array(" "," "), $fname);
    }else{
        $fname = "";
    }
    if( isset($_POST['lname']) ){
        $lname = strip_tags(trim($_POST["lname"]));
        $lname = str_replace(array("\r","\n"),array(" "," "), $lname);
    }else{
        $lname = "";
    }
    if( isset($_POST['phone']) ){
        $phone = strip_tags(trim($_POST["phone"]));
        $phone = str_replace(array("\r","\n"),array(" "," "), $phone);
    }else{
        $phone = "";
    }
    if( isset($_POST['company']) ){
        $company = strip_tags(trim($_POST["company"]));
        $company = str_replace(array("\r","\n"),array(" "," "), $company);
    }else{
        $company = "";
    }
    if( isset($_POST['i-am-a']) ){
        $i_am_a = implode($_POST['i-am-a'], ', ');
    }else{
        $i_am_a = "";
    }
    if( isset($_POST['interest']) ){
        $interest = implode($_POST['interest'], ', ');
    }else{
        $interest = "";
    }
    if( isset($_POST['contact-by']) ){
        $contact_by = implode($_POST['contact-by'], ', ');
    }else{
        $contact_by = "";
    }
    if( isset($_POST['details']) ){
        $details = trim($_POST["details"]);
    }else{
        $details = "";
    }
    
    // Check that data was sent to the mailer.
    if ( empty($fname) || empty($lname) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Set a 400 (bad request) response code and exit.
        http_response_code(400);
        exit;
    }

    $body = "";
    $body .= "Name: ". $fname . " " . $lname . "\n";
    $body .= "\n";
    $body .= "Email: ". $email . "\n";
    $body .= "\n";
    $body .= "Phone: ". $phone . "\n";
    $body .= "\n";
    $body .= "Company / Organization: ". $company . "\n";
    $body .= "\n";
    $body .= "I am a: ". $i_am_a . "\n";
    $body .= "\n";
    $body .= "I am interested in: ". $interest . "\n";
    $body .= "\n";
    $body .= "I would like to be contacted by: ". $contact_by . "\n";
    $body .= "\n";
    $body .= "Additional details: ". $details . "\n";

    // Send the email.
    if (mail($to, $subject, $body, $headers)) {
        // Set a 200 (okay) response code.
        http_response_code(200);
    } else {
        // Set a 500 (internal server error) response code.
        http_response_code(500);
    }

} else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
}
?>