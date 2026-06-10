<?php


session_start();

switch($_REQUEST["reqType"]){
    case "sign-in":
        sign_in();
        break;
    case "log-in":
        log_in();
        break;

    case "delete":
        deleteAcc();
        break;

    default:
        http_response_code(400);
        exit;
}


function sign_in(){
    if(!isset($_POST["password"])||!isset($_POST["username"])){
        http_response_code(400);
        exit;
    } 

    $password=json_decode($_POST["password"]);
    $username=json_decode($_POST["username"]);

    $usernamePattern = '/[a-zA-Z]{2,8}/';
    $passwordPattern = '/^[A-Z][a-zA-Z]{2,6}[0-9]$/';

    if(!preg_match($usernamePattern,$username) || !preg_match($passwordPattern,$password)){
        http_response_code(401);
        echo json_encode(['message' => 'Credentials do not match the required patterns']);
        exit;
    }

    try{
        $pdo=new PDO('mysql:host=localhost;dbname=caruso_672673','root','');
        $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

        $query=$pdo->prepare('SELECT *  FROM players WHERE username=:username');
        $query->bindParam(':username',$username);
        $query->execute();

        if($query->rowCount()> 0){
            http_response_code(401);
            echo json_encode(['message' => 'This Username already exists']);
            exit;
        }

        $query=$pdo->prepare('INSERT INTO players(username,password) VALUES (:username, :password )');
        $query->bindParam(':username',$username);
        $hashed_password = password_hash($password,PASSWORD_BCRYPT);
        $query->bindParam(':password',$hashed_password);
        
        $query->execute();

        $pdo=null;

    }catch(PDOException $e){
        http_response_code(500);
        echo json_encode(['message'=> $e->getMessage()]);
        exit;
    }
}

function log_in(){
    if(!isset($_POST["password"])||!isset($_POST["username"])){
        http_response_code(400);
        exit;
    } 

    $password=json_decode($_POST["password"]);
    $username=json_decode($_POST["username"]);

    $usernamePattern = '/[a-zA-Z]{2,8}/';
    $passwordPattern = '/^[A-Z][a-zA-Z]{2,6}[0-9]$/';

    if(!preg_match($usernamePattern,$username) || !preg_match($passwordPattern,$password)){
        http_response_code(401);
        echo json_encode(['message' => 'Credentials do not match the required patterns']);
        exit;
    }

    try{
        $pdo=new PDO('mysql:host=localhost;dbname=caruso_672673','root','');
        $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

        $query=$pdo->prepare('SELECT *  FROM players WHERE username=:username');
        $query->bindParam(':username',$username);
        $query->execute();

        if($query->rowCount()== 0){
            http_response_code(401);
            echo json_encode(['message' => 'This Username does not exists']);
            exit;
        }

        $row=$query->fetch(PDO::FETCH_ASSOC);
        $hashPass=$row['password'];
        if(!password_verify($password,$hashPass)){
            http_response_code(401);
            echo json_encode(['message'=> 'Incorrect Password']);
            exit;
        }

        $team=[$row['1'], $row['2'], $row['3'], $row['4'], $row['5'], $row['6']];

        echo json_encode($team);
        $pdo=null;

        $_SESSION['username']=$row['username'];
        $_SESSION['packetmons']=$team;
        $_SESSION['coins']=$row['coin'];

    }catch(PDOException $e){
        http_response_code(500);
        echo json_encode(['message'=> $e->getMessage()]);
        exit;
    }
}

function deleteAcc(){
    if(!isset($_POST["password"])||!isset($_POST["username"])){
        http_response_code(400);
        exit;
    } 

    $password=json_decode($_POST["password"]);
    $username=json_decode($_POST["username"]);

    $usernamePattern = '/[a-zA-Z]{2,8}/';
    $passwordPattern = '/^[A-Z][a-zA-Z]{2,6}[0-9]$/';

    if(!preg_match($usernamePattern,$username) || !preg_match($passwordPattern,$password)){
        http_response_code(401);
        echo json_encode(['message' => 'Credentials do not match the required patterns']);
        exit;
    }

    try{
        $pdo=new PDO('mysql:host=localhost;dbname=caruso_672673','root','');
        $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

        $query=$pdo->prepare('SELECT *  FROM players WHERE username=:username');
        $query->bindParam(':username',$username);
        $query->execute();

        if($query->rowCount()== 0){
            http_response_code(401);
            echo json_encode(['message' => 'This Username does not exists']);
            exit;
        }

        $row=$query->fetch(PDO::FETCH_ASSOC);
        $hashPass=$row['password'];
        if(!password_verify($password,$hashPass)){
            http_response_code(401);
            echo json_encode(['message'=> 'Incorrect Password']);
            exit;
        }

        $query=$pdo->prepare('DELETE FROM players WHERE username=:username');
        $query->bindParam(':username',$username);
        
        $query->execute();

        $pdo=null;

    }catch(PDOException $e){
        http_response_code(500);
        echo json_encode(['message'=> $e->getMessage()]);
        exit;
    }
}
