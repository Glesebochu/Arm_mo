// ?resets teh radio button to uncheck when the page reloads

window.addEventListener("load", function () {
  document.getElementById("rad2").checked = false;

  document.getElementById("rad1").checked = false;
});

let Current_Stage_No;
// Adds the radio buttoon switch property
// Displays the menu when 'Yes I am' is checked & removes it when 'No I'm not' is checked

document.getElementById("rad1").addEventListener("click", function () {
  document.getElementById("rad2").checked = false;
  document.getElementById("dropDownMenu").style.display = "block";
});
document.getElementById("rad2").addEventListener("click", function () {
  document.getElementById("rad1").checked = false;
  document.getElementById("dropDownMenu").style.display = "none";
  Current_Stage_No=1;
});

// Gives the selected stage to the variable when the done button is clicked

document.getElementById("dDButton").addEventListener("click", function () {
  Current_Stage_No = document.getElementById("dDM").selectedIndex + 1;
  document.getElementById("dropDownMenu").style.display = "none";
});
