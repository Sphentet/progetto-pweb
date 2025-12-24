<?php

switch ($_REQUEST["reqType"]) {
    case "fetchpacket":
        fetchpaket();
        break;


        
    default:
        http_response_code(400);
}



function fetchpaket(){
    echo json_encode(["username"=>$_SESSION["username"], "packetmons"=>$_SESSION["packetmons"]]);
}









