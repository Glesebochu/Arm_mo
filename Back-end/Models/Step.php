<?php
// Step.php

class Step {
    public $Step_ID;
    public $Session_ID;
    public $Title;
    public $Description;
    public $Type;
    public $Category;
    public $Duration;
    public $Response;
    public $Activity_ID;
   
    public static function getStep($identifier) {
        include_once(__DIR__ . '/../Connect.php');
        $con = new Connect;
        $db = $con->__getConnection();
        $db->query('USE Arm_mo_v2');
        
        // Query the database based on the identifier
        $query = "SELECT * FROM Step WHERE Step_ID = '$identifier'";
        $result = $db->query($query);
        $row = $result->fetch_assoc();
        
        // Create a new Step object and assign values from the query result
        $Step = new Step();
        $Step->Step_ID = $row['Step_ID'];
        $Step->Session_ID = $row['Session_ID'];
        $Step->Title = $row['Title'];
        $Step->Description = $row['Description'];
        $Step->Type = $row['Type'];
        $Step->Category = $row['Category'];
        $Step->Duration = $row['Duration'];
        $Step->Response = $row['Response'];
        $Step->Activity_ID = $row['Activity_ID'];
            
        return $Step;
    }
    
    public static function getJavaScriptStep($identifier) {
        $Step = Step::getStep($identifier);
    
        // Convert the Step object to a JSON string
        $StepJson = json_encode($Step);
    
        // Return the JavaScript code to create the JavaScript Step object
        return $StepJson;
    }
    
    public static function getStepArray($Session_ID) {
        include_once(__DIR__ . '/../Connect.php');
        $con = new Connect;
        $db = $con->__getConnection();
        $db->query('USE Arm_mo_v2');
        
        // Query the database based on the Session ID
        $query = "SELECT * FROM Step
                  WHERE Session_ID = '$Session_ID'";
        $result = $db->query($query);
        
        // Create an array to store the Step objects
        $StepArray = array();
        
        // Iterate over the query results and create Step objects
        while ($row = $result->fetch_assoc()) {
            $Step = new Step();
            $Step->Step_ID = $row['Step_ID'];
            $Step->Session_ID = $row['Session_ID'];
            $Step->Title = $row['Title'];
            $Step->Description = $row['Description'];
            $Step->Type = $row['Type'];
            $Step->Category = $row['Category'];
            $Step->Duration = $row['Duration'];
            $Step->Response = $row['Response'];
            $Step->Activity_ID = $row['Activity_ID'];
            
            // Add the Step object to the array
            $StepArray[] = $Step;
        }
        
        return $StepArray;
    }
    
    public static function getJavaScriptStepArray($Session_ID) {
        $StepArray = Step::getStepArray($Session_ID);
        
        // Convert each Step object to a JSON string
        $StepJsonArray = array();
        foreach ($StepArray as $Step) {
            $StepJson = json_encode($Step);
            $StepJsonArray[] = $StepJson;
        }
        
        // Return the JavaScript code to create the JavaScript Step array
        return $StepJsonArray;
    }
}