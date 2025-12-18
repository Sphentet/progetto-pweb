<?php


session_start();

if(!isset($_POST["password"])){
    http_response_code(400);
    exit;
} 

$password=json_decode($_POST["password"]);




