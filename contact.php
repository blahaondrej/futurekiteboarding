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
        $arrival = check_input( $_POST['formArrival'] );
        $departure = check_input( $_POST['formDeparture'] );
	    $amount = check_input( $_POST['formAmount'] );
	    $contact = check_input( $_POST['formContact'] );
    	$email = check_input( $_POST['formMail'] );
    	$phone = check_input( $_POST['formPhone'] );
    	$notes = check_input( $_POST['formNotes'] );

	// Set e-mail
	$recipients = "hello@forestresort.cz";

	$subject = "FOREST RESORT - poptávkový formulář";

		$body = "Poptávkový formulář z webu Forest Resort: <br><br><br>";
		$body .= "Datum příjezdu: " . $arrival . "<br><br>";
		$body .= "Datum odjezdu: " . $departure . "<br><br><br>";
		$body .= "Počet osob: " . $amount . "<br><br>";
		$body .= "Kontaktní osoba: " . $contact . "<br><br><br>";
    	$body .= "E-mail: " . $email . "<br><br>";
    	$body .= "Telefon: " . $phone . "<br><br><br>";
    	$body .= "Poznámky: " . $notes . "<br><br>";

$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_OFF;
    $mail->isSMTP();
    $mail->Host       = 'smtp.office365.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'system@forestresort.cz';
    $mail->Password   = 'Wax11088';
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
    $mail->setFrom('system@forestresort.cz');
    $mail->addAddress('hello@forestresort.cz');
    $mail->addAddress(trim($email));

    $mail->isHTML();
    $mail->Subject = 'FOREST RESORT - poptávkový formulář';
    $mail->Body    = $body;

    $mail->send();
    send_status_message( 1 );
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
