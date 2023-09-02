<?php
$target_dir = "image/";
$img = $target_dir . basename($_FILES["newImg"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($img, PATHINFO_EXTENSION));
$newimg = $target_dir . $_POST['newName'] . "." . $imageFileType;

if (isset($_POST["submit"])) {
  $check = getimagesize($_FILES["newImg"]["tmp_name"]);
  if ($check !== false) {
    echo "File is an image - " . $check["mime"] . ".";
    $uploadOk = 1;
  } else {
    echo "File is not an image.";
    $uploadOk = 0;
  }
}

if ($_FILES["newImg"]["size"] > 500000) {
  echo "Sorry, your file is too large.";
  $uploadOk = 0;
}

// Allow certain file formats
if (
  $imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
  && $imageFileType != "gif"
) {
  echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
  $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
  echo "Sorry, your file was not uploaded.";
  // if everything is ok, try to upload file
} else {
  if (move_uploaded_file($_FILES["newImg"]["tmp_name"], $newimg)) {
    echo "The file " . htmlspecialchars(basename($_FILES["newImg"]["name"])) . " has been uploaded.";
  } else {
    echo "Sorry, there was an error uploading your file.";
  }
}


?>