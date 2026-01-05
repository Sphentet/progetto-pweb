
<?php

session_start();
session_unset();
session_destroy();




?>


<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PACKÈTMON</title>
    <link rel="stylesheet" href="css/menu.css">
    <link rel="icon" href="immagini/packètball.svg">
    <script src="js/accHandling.js"></script>
</head>
<body>

    <div id="container">

        <div id="menu">
            <hr>
            <a href="html/sign-in.php">Sign-In</a>
            <hr>
            <a href="html/delete.php">Delete Account</a>
            <hr>
            <a href="html/info.html">Info Page</a>
            <hr>
        </div>


        <div id="interface">

            <h1>PACKÈTMON</h1>

            
            
            <div id="packetCard">
                <h2>Welcome to the Packètmon world!</h2>

                <div id="packet"><img src="immagini/packètball.svg" alt="packètball"/></div>

                <div class="row">

                    <label for="user">Username:</label>

                    <label for="pass">Password:</label>

                </div>

                <div class="row">
                    
                    <input id="user" type="text" required pattern="[a-zA-Z]{2,8}" title="Username must have 2 to 8 letters"> 

                    <div id="password-field">
                        <input id="pass" type="password" required pattern="^[A-Z][a-zA-Z]{2,6}[0-9]$" title="Password must begin with a capital letter, followed by 2 to 6 letters and must end with a digit">
                        <button type="button" id="togglePass" aria-label="Mostra password">👁️</button>
                    </div>

                </div>
                
                <button id="packetCardButton" name="log-in">START ADVENTURE</button>
            </div>





            

        </div>

    </div>
    
</body>
</html>




