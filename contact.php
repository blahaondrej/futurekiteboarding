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

	$subject = "FUTURE kiteboarding - contact form";

		$body = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <style>
        body, p, td, tr, span {
            padding: 0;
            margin: 0;
            font-family: \'Arial\', sans-serif;
            font-style: italic;
        }
    </style>
</head>
<body>
<table align="center" cellpadding="0" cellspacing="0" border="0" bgcolor="#fff" width="750">
	<tr>
		<td>
			<table align="center" width="750" cellpadding="0" cellspacing="0" border="0" bgcolor="#fff">
				<tr>
					<td>
						<a href="https://futurekiteboarding.com/">
							<img src="https://www.kitelementshop.com/assets/app/images/emails/intro.jpg"
								 alt="FUTURE Kiteboarding" style="width: 100%; height: auto;">
						</a>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
<table align="center" cellpadding="0" cellspacing="0" border="0" bgcolor="#fff" width="750">
		<tr>
			<td>
				<table align="center" width="650" cellpadding="0" cellspacing="0" border="0" bgcolor="#fff">
					<tr>
						<td height="30">
							&nbsp;
						</td>
					</tr>
					<tr>
						<td>
							<span style="font-size: 72px; color: #F71106; font-style: italic; font-weight: 600; letter-spacing: 0; line-height: 86px;">THE BALL IS IN OUR COURT…</span>
						</td>
					</tr>
					<tr>
						<td height="40">
							&nbsp;
						</td>
					</tr>
					<tr>
						<td>
							<span style="color: #030303; font-size: 36px; font-style: italic; font-weight: 600; letter-spacing: 0; line-height: 40px;">Unless we are at the sea or working on a new collection, we are probably about to answer your questions.</span>
						</td>
					</tr>
					<tr>
						<td height="30">
							&nbsp;
						</td>
					</tr>
					<tr>
						<td>
							<span style="color: #030303; font-size: 21px; font-style: italic; font-weight: 300; letter-spacing: 0.56px; line-height: 24px;">Thanks for your message, we will respond as soon as possible. If you cannot or don\'t want to wait, you can contact us via whatsapp or look up the FAQs.</span>
						</td>
					</tr>
					<tr>
						<td height="60">
							&nbsp;
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
	<table align="center" cellpadding="0" cellspacing="0" border="0" bgcolor="#fff" width="650">
	<tr>
		<td height="50" style="border-top: 1px solid #1A1A1A;">
			&nbsp;
		</td>
	</tr>
	<tr>
		<td>
			<span style="color: #030303; font-size: 36px; font-style: italic; font-weight: 600; letter-spacing: 0.96px; line-height: 40px;">GOT ANY MORE QUESTIONS?</span>
		</td>
	</tr>
	<tr>
		<td height="30">
			&nbsp;
		</td>
	</tr>
	<tr>
		<td>
			<table>
				<tr>
					<td width="135">
						<img src="https://www.kitelementshop.com/assets/app/images/emails/email.png"
							 alt="FUTURE Kiteboarding" style="width: 100%; height: auto;">
					</td>
					<td width="50">
						&nbsp;
					</td>
					<td>
						<a href="mailto:info@futurekiteboarding.com"
						   style="color: #F71106; font-size: 21px; font-style: italic; font-weight: bold; letter-spacing: 0.56px; line-height: 66px; text-transform: uppercase; text-decoration: none;">INFO@FUTUREKITEBOARDING.COM</a>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<table>
				<tr>
					<td width="135">
						<img src="https://www.kitelementshop.com/assets/app/images/emails/whatsapp.png"
							 alt="FUTURE Kiteboarding" style="width: 100%; height: auto;">
					</td>
					<td width="50">
						&nbsp;
					</td>
					<td>
						<a href="https://wa.me/420775526626"
						   style="color: #F71106; font-size: 21px; font-style: italic; font-weight: bold; letter-spacing: 0.56px; line-height: 66px; text-transform: uppercase; text-decoration: none;">WHATSAPP</a>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td height="40">
			&nbsp;
		</td>
	</tr>
</table>
<table align="center" cellpadding="0" cellspacing="0" border="0" bgcolor="#fff" width="750">
	<tr>
		<td>
			<table align="center" width="750" cellpadding="0" cellspacing="0" border="0" bgcolor="#1A1A1A">
				<tr>
					<td>
						<table align="center" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#1A1A1A">
							<tr>
								<td height="30">
									&nbsp;
								</td>
							</tr>
							<tr>
								<td align="center">
									<span style="color: #FFFFFF; font-size: 21px; font-style: italic; font-weight: 300; letter-spacing: 0.56px; line-height: 40px; text-align: center;">Follow us and stay updated on new products and other exciting stuff.</span>
								</td>
							</tr>
							<tr>
								<td height="30">
									&nbsp;
								</td>
							</tr>
							<tr>
								<td>
									<table align="center">
										<tr>
											<td width="84">
												<a href="https://www.instagram.com/futurekiting/">
													<img src="https://www.kitelementshop.com/assets/app/images/emails/instagram.png"
														 alt="FUTURE Kiteboarding" style="width: 100%; height: auto;">
												</a>
											</td>
											<td width="30">
												&nbsp;
											</td>
											<td width="84">
												<a href="https://www.facebook.com/futurekiteboarding">
													<img src="https://www.kitelementshop.com/assets/app/images/emails/facebook.png"
														 alt="FUTURE Kiteboarding" style="width: 100%; height: auto;">
												</a>
											</td>
											<td width="30">
												&nbsp;
											</td>
											<td width="84">
												<a href="https://www.youtube.com/channel/UCoBM9F04NllSO8Hk4KDZUeA">
													<img src="https://www.kitelementshop.com/assets/app/images/emails/youtube.png"
														 alt="FUTURE Kiteboarding" style="width: 100%; height: auto;">
												</a>
											</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td height="30">
									&nbsp;
								</td>
							</tr>
							<tr>
								<td align="center">
									<span style="color: #FFFFFF; font-size: 12px; font-style: italic; font-weight: 300; letter-spacing: 0.32px; line-height: 20px;">ALL RIGHTS RESERVED BY  FUTURE kiteboarding 2022 ©</span>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<img src="https://www.kitelementshop.com/assets/app/images/emails/footer.jpg"
							 alt="FUTURE Kiteboarding" style="width: 100%; height: auto;">
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>';

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
    $mail->Subject = 'FUTURE kiteboarding - contact form';
    $mail->Body    = $body;

    $mail->send();
    send_status_message( 1 );
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
