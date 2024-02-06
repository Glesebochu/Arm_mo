<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <link rel="icon" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <title>Settings Page</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Mako%3A400"/>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro%3A400"/>
  <link rel="stylesheet" href="./styles/settings-page.css"/>
  <script>
    function hideMenuBar(className) {
      var elem = window.document.getElementsByClassName(className);
      var contentDiv = document.getElementById('contentDiv');
      var userNameTextToDisplay = document.querySelector('#userNameText');

      if (window.innerWidth > 600) {
        if (elem[0].style.left != '-200px') {
          elem[0].style.left = '-200px';
          elem[0].style.backgroundColor = 'white';
          contentDiv.style.left = '-200px';
          var tab = document.getElementsByClassName("activeTab");
          var tab2 = document.getElementsByClassName("deletecss");
          tab[0].classList.add('tempClass');
          tab[0].classList.remove('activeTab');
          tab2[0].classList.add('tempClass2');
          tab2[0].classList.remove('deletecss');
          userNameTextToDisplay.classList.add('removeDisplay');
        } else {
          elem[0].style.left = '0px';
          contentDiv.style.left = '0px';
          var tab = document.getElementsByClassName('tempClass');
          var tab2 = document.getElementsByClassName('tempClass2');
          tab[0].classList.add('activeTab');
          tab[0].classList.remove('tempClass');
          tab2[0].classList.add('deletecss');
          tab2[0].classList.remove('tempClass2');
          userNameTextToDisplay.classList.remove('removeDisplay');
        }
      } else {
        if (elem[0].style.left != '-200px') {
          elem[0].style.left = '-200px';
          elem[0].style.backgroundColor = 'white';
          contentDiv.style.left = '-280px';
          contentDiv.style.top = '40px';
          var tab = document.getElementsByClassName("activeTab");
          tab[0].classList.add('tempClass');
          tab[0].classList.remove('activeTab');
          userNameTextToDisplay.classList.add('removeDisplay');
        } else {
          elem[0].style.left = '0px';
          contentDiv.style.left = '80px';
          var tab = document.getElementsByClassName('tempClass');
          tab[0].classList.add('activeTab');
          tab[0].classList.remove('tempClass');
          userNameTextToDisplay.classList.remove('removeDisplay');
        }
      }
    }
    function navigateToPage(link){
      window.open(link,'_self')
    }

    function openSideMenu(link){
      var contentDiv = document.getElementById('contentDiv');
      contentDiv.innerHTML='<iframe src="' + link + '"></iframe>';
      if(window.innerWidth<=600){
        hideMenuBar('sideMenu');
      }
    }
  </script>

  <script>
    window.addEventListener('DOMContentLoaded', () => {
      <?php
        include_once('../../Back-end/Connect.php');
        $con = new Connect;
        $db = $con->__getConnection();
        $db->query('USE Arm_mo');
        session_start();

        $UsernametoEdit = $_SESSION['UsernametoEdit'];

        if (isset($_SESSION['UsernametoEdit'])) {
            // Fetch the profile picture from the database
            $queryProfilePic = "SELECT Profile_Picture FROM Meditator WHERE Username = '$UsernametoEdit'";
            $result = $db->query($queryProfilePic);
            $row = $result->fetch_assoc();
            $profilePicture = $row['Profile_Picture'];

            if ($profilePicture == null||$profilePicture=="") {
                $profilePicture = './assets/healthicons-ui-user-profile-YyH.png';
                
            }
            else{
              $profilePicture='../../Back-end'.$profilePicture;
            }
        } else {
            echo 'Could not retrieve your profile picture!';
        }
        ?>
        
        // Set the profile picture as the src attribute of the img element
        var profilePictureElement = document.getElementById('profilePicture');
        profilePictureElement.src = '<?php echo $profilePicture; ?>';

        // Set the username
        var userNamePar = document.getElementById('userNameText');
        userNamePar.innerHTML = '<?php echo $UsernametoEdit; ?>';
  
        openSideMenu('./account-panel-.html');
        activeTab('accountDetailsButton');
    });
  </script>

  <script>
    var tabs = document.getElementsByClassName("sideMenuButtons");
    
    function activeTab(tabClicked){
      for(tab of tabs){
        tab.classList.remove('activeTab');
        tab.classList.remove('deletecss');
      }
      var tabClick= document.getElementsByClassName(tabClicked);
      for(tab of tabClick){
        tab.classList.add('activeTab')
      }
      
    }
  </script>

  <script>
    
    function deletecss(tabClicked){
      
      var tabClick= document.getElementsByClassName(tabClicked);
      for(tab of tabClick){
        tab.classList.add('deletecss')
      }
      
    }
  </script>

  <script>
    function deleteAccount(){
      prompt('Are you sure you want to delete your account?')
    }
  </script>

  <script>
    function showFullScreen(source) {
      // Create a new element to display the fullscreen image
      var fullscreenImage = document.createElement('div');
      fullscreenImage.className = 'fullscreen-image';

      // Create an image element inside the fullscreen container
      var img = document.createElement('img');
      img.src = source;

      // Add the image element to the fullscreen container
      fullscreenImage.appendChild(img);

      // Append the fullscreen container to the document body
      document.body.appendChild(fullscreenImage);

      // Remove the fullscreen container when clicked
      fullscreenImage.addEventListener('click', function () {
        document.body.removeChild(fullscreenImage);
      });
    }
  </script>

</head>

<body>
<main class="mainWrapper">

  <nav class="sideMenu">

    <section class="sideMenuIcons">
      <img class="userProfilePic"  id="profilePicture" src="./assets/healthicons-ui-user-profile-YyH.png" onclick="showFullScreen(this.src)"/>
      <p class="userNameText" id='userNameText'></p>
      <img class="minimizeMenuIcon" onclick="hideMenuBar('sideMenu')" src="./assets/vector-RtP.png"/>
    </section>

    <section class="accountDetailsButton sideMenuButtons" onclick="openSideMenu('./account-panel-.html');activeTab('accountDetailsButton')">
      <img class="accountDetailsIcon" src="./assets/mdi-account-cog.png"/>
      <p class="accountDetailsText">Account</p>
    </section>

    <section class="themeButton sideMenuButtons" onclick="openSideMenu('../ControlPanel/Control_Panel.html');activeTab('themeButton')">
      <img class="themeIcon" src="./assets/fluent-dark-theme-24-regular.png"/>
      <p class="themeText">Appearance</p>
    </section>

    <section class="passwordButton sideMenuButtons" onclick="openSideMenu('./changePasswordPanel.html');activeTab('passwordButton')">
      <img class="passwordIcon" src="./assets/key-round.svg"/>
      <p class="passwordText">Password</p>
    </section>

    <section class="deleteAccountButton sideMenuButtons" onclick="openSideMenu('./deleteAccountPanel.html');deletecss('deleteAccountButton')">
      <img class="deleteAccountIcon" src="./assets/trash-2.svg"/>
      <p class="deleteAccountText">Delete Account</p>
    </section>
    
    <section class="logoutButton sideMenuButtons" onclick="navigateToPage('../Login/login.html')">
      <img class="logoutIcon" src="./assets/log-out.svg"/>
      <p class="logoutText">Log Out</p>
    </section>

  </nav>

  <section class="ContentPanel">
    <div class="IframeBox" id="contentDiv">
    </div>

    <div class="logoIcon">
      <img class="writing-1-opf" src="./assets/writing-1-Qcb.png"/>
      <img class="armimo-logo-2-1-LJo" onclick="navigateToPage('./home-page.php')" src="./assets/armimo-logo-2-1-mPH.png"/>
    </div>
  </section>

</main>
</body>
</html>