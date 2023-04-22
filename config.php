<?php
$DBSERVER = "localhost"; // Database server
$DBUSERNAME = "u801320556_rootpoker"; // Database username
$DBPASSWORD = "Sempre12vezes"; // Database password 
$DBNAME = "u801320556_subpoker"; // Database name

/* connect to MySQL database */ 
$db = mysqli_connect($DBSERVER, $DBUSERNAME, $DBPASSWORD, $DBNAME);

// Check db connection
if (!$db) {
    die("Connection failed: " . mysqli_connect_error());
}

mysqli_close($db);
?>