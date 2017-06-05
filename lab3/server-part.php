<?php

echo json_encode((array) simplexml_load_file($_GET["file_path"]), JSON_PRETTY_PRINT);