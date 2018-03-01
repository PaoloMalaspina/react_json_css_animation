<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
$ch = curl_init();
$url = "http://18.195.225.57/articles.php";
$username = "username";
$password = "password";
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
$output = curl_exec($ch);
$info = curl_getinfo($ch);
curl_close($ch);
echo $output
?>
