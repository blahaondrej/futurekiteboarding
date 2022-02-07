<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/SMTP.php';

	function autoUTF($s){
		if (preg_match('#[\x80-\x{1FF}\x{2000}-\x{3FFF}]#u', $s)) return $s;
		if (preg_match('#[\x7F-\x9F\xBC]#', $s)) return iconv('WINDOWS-1250', 'UTF-8', $s); return iconv('ISO-8859-2', 'UTF-8', $s);
	}

	function check_input($data) {
  		$data = trim($data);
  		$data = stripslashes($data);
  		$data = htmlspecialchars($data);
  		return $data;
	}

	function cs_mail ($email, $subject, $body, $head = ""){
        		$subject = "=?utf-8?B?".base64_encode(autoUTF ($subject))."?=";
        		$head .= "From:".$email."\n"; $head .= "MIME-Version: 1.0\n";
        		$head .= "Content-Type: text/plain; charset=\"utf-8\"\n";
        		$head .= "Content-Transfer-Encoding: base64\n";

        		return mail ($email, $subject, $head);
        	}

        	function send_status_message($status){
        		print json_encode($status);
        		die();
        	}

	// Get and validate values
        $name = check_input( $_POST['name'] );
    	$email = check_input( $_POST['email'] );
        $comment =check_input( $_POST['comment'] );

	// Set e-mail
	$recipients = "info@futurekiteboarding.com";

	$subject = "FUTURE kiteboarding - kontaktní formulář";

		$body = "Kontaktní formulář z webu Forest Resort: <br><br><br>";
		$body .= "Jméno: " . $name . "<br><br>";
    	$body .= "E-mail: " . $email . "<br><br>";
    	$body .= "Zpráva: " . $comment . "<br><br><br>";

$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_OFF;
    $mail->isSMTP();
    $mail->Host       = 'smtp.forpsi.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'info@futurekiteboarding.com';
    $mail->Password   = 'Jedembomby2022!';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet = 'UTF-8';
    $mail->SMTPOptions = [
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        ]
    ];

    //Recipients
    $mail->setFrom('info@futurekiteboarding.com');
    $mail->addAddress('info@futurekiteboarding.com');
    $mail->addAddress(trim($email));

    $mail->isHTML();
    $mail->Subject = 'FUTURE kiteboarding - kontaktní formulář';
    $mail->Body    = $body;

    $mail->send();
    send_status_message( 1 );
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
