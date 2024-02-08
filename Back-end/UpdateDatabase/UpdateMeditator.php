<?php
// Include the PHP file with the function to update the Meditator object
include_once('../../Back-end/Connect.php');

// Create a database connection
$con = new Connect;
$db = $con->__getConnection();
$db->query('USE Arm_mo_v2');

// Check if the request contains the meditator object
if (isset($_POST['meditator'])) {
    $meditator = json_decode($_POST['meditator'], true);

  // Extract the properties from the meditator object
  $meditatorID = $meditator['Meditator_ID'];
  $firstName = $meditator['First_Name'];
  $lastName = $meditator['Last_Name'];
  $username = $meditator['Username'];
  $password = $meditator['Password'];
  $currentStageNo = $meditator['Current_Stage_No'];

  // Update the Meditator table
  $sql = "UPDATE Meditator SET 
            First_Name = '$firstName',
            Last_Name = '$lastName',
            Username = '$username',
            Password = '$password',
            Stage_ID = '$currentStageNo'
          WHERE Meditator_ID = '$meditatorID'";
  $result = $db->query($sql);

  if ($result) {
    echo 'Meditator updated successfully.';
  } else {
    echo 'Failed to update meditator.';
  }
} else {
  echo 'No meditator object found in the request.';
}
?>