<?php

require './vendor/autoload.php';

use Chat\ChatServer;

$app = new Ratchet\App('153.92.6.32', 9990);
$app->route('/chat', new ChatServer, ['*']);
$app->run();
