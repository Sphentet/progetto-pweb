<?php

session_start(); 

switch ($_REQUEST["reqType"]) {
    case "fetchpacketco":
        fetchpacketco();
        break;
    case "getpacket":
        getpacket();
        break;
    case "updcoins":
        updcoins();
        break;

    default:
        http_response_code(400);
}



function fetchpacketco(){


    try {
        $pdo=new PDO('mysql:host=localhost;dbname=caruso_672673','root','');
        $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

        $query=$pdo->prepare('SELECT * FROM players WHERE username=:username');
        $query->bindParam(':username',$_SESSION['username']);
        $query->execute();

        if($query->rowCount()== 0){
            http_response_code(401);
            echo json_encode(['message' => 'This Username does not exists']);
            exit;
        }

        $row=$query->fetch(PDO::FETCH_ASSOC);
        $team=[$row['1'], $row['2'], $row['3'], $row['4'], $row['5'], $row['6']];

        
        $pdo=null;

        $_SESSION['packetmons']=$team;
        $_SESSION['coins']=$row['coin'];

        echo json_encode(["username"=>$_SESSION["username"], "packetmons"=>$_SESSION["packetmons"], "coins"=>$_SESSION["coins"]]);
        
    }catch(PDOException $e){
        http_response_code(500);
        echo json_encode(['message'=> $e->getMessage()]);
        exit;
    }
    

    
}

function getpacket(){
    $packet=$_GET["packetmon"];

    if($packet!=="vulpine"&&$packet!=="bubblotl"&&$packet!=="ignispark"&&$packet!=="velocivolt"&&$packet!=="mudgrunt"&&$packet!=="nightwing"){
        http_response_code(400);
        echo json_encode(['message' => 'Invalid Packètmon']);
        exit;
    }   

    for($i= 0;$i<6;$i++){
        if($_SESSION["packetmons"][$i]==$packet){
            http_response_code(400);
            echo json_encode(['message' => 'Packètmon already owned']);
            exit;
        }

        if($_SESSION["packetmons"][$i]==null){
            $_SESSION["packetmons"][$i]=$packet;
            break;
        }
    }
    
    try{
        $pdo=new PDO('mysql:host=localhost;dbname=caruso_672673','root','');
        $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

        $query=$pdo->prepare('UPDATE players SET `1`=:p1, `2`=:p2, `3`=:p3, `4`=:p4, `5`=:p5, `6`=:p6 WHERE username=:username');

        $query->bindParam(":p1",$_SESSION["packetmons"][0]);
        $query->bindParam(":p2",$_SESSION["packetmons"][1]);
        $query->bindParam(":p3",$_SESSION["packetmons"][2]);
        $query->bindParam(":p4",$_SESSION["packetmons"][3]);
        $query->bindParam(":p5",$_SESSION["packetmons"][4]);
        $query->bindParam(":p6",$_SESSION["packetmons"][5]);
        $query->bindParam(":username",$_SESSION["username"]);
        
        $query->execute();
        $pdo=null;

    }catch(PDOException $e){
        http_response_code(500);
        echo json_encode(['message'=> $e->getMessage()]);
        exit;
    }
}


function updcoins(){
    $coins=$_GET['number'];
    if($coins==null){
        http_response_code(400);
        echo json_encode(['message' => 'Invalid Amount of Coins']);
        exit;
    }

    try {
        $pdo=new PDO('mysql:host=localhost;dbname=caruso_672673','root','');
        $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

        $query=$pdo->prepare('UPDATE players SET coin=:coins WHERE username=:username');
        $query->bindParam(":coins",$coins);
        $query->bindParam(":username",$_SESSION["username"]);
        $query->execute();
        $pdo=null;

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message'=> $e->getMessage()]);
        exit;
    }
}




  
 

  
 





