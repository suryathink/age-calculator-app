const dayInput = document.getElementById("dayInput");
const monthInput = document.getElementById("monthInput");
const yearInput = document.getElementById("yearInput");
const dayOut = document.getElementById("dayOut");
const monthOut = document.getElementById("monthOut");
const yearOut = document.getElementById("yearOut");
const calculateBtn = document.getElementById("calculateBtn");

function calculateAge(dob) {
  var dobArray = dob.split("/"); // Split the input into day, month, and year

  var userDOB = new Date(dobArray[2], dobArray[1] - 1, dobArray[0]); // Create a Date object with user input
  var currentDate = new Date(); // Get the current date

  var ageInYears = currentDate.getFullYear() - userDOB.getFullYear(); // Calculate the age in years
  var ageInMonths = currentDate.getMonth() - userDOB.getMonth(); // Calculate the age in months
  var ageInDays = currentDate.getDate() - userDOB.getDate(); // Calculate the age in days

  // Adjust age if current date is before the birthdate in the current month
  if (ageInDays < 0) {
    ageInMonths--; // Subtract 1 month
    ageInDays += new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate(); // Add days in previous month
  }

  // Adjust age if current date is before the birthdate in the current year
  if (ageInMonths < 0) {
    ageInYears--; // Subtract 1 year
    ageInMonths += 12; // Add 12 months
  }

  var result =
    ageInYears + " years " + ageInMonths + " months " + ageInDays + " days"; // Create the result string
  return [ageInYears, ageInMonths, ageInDays];
}

calculateBtn.addEventListener("click", () => {
  const Day = dayInput.value;
  const Month = monthInput.value;
  const Year = yearInput.value;

  const DOB = `${Day}/${Month}/${Year}`;

  const [ageInYears, ageInMonths, ageInDays] = calculateAge(DOB);

  if (Month > 12 || Month == "") {
    document.getElementById("monthError").textContent = "Must be a Valid Month";
    document.getElementById("monthHeading").style.color = "#FF5959";
    document.getElementById("monthHeading").style.fontWeight = 800;
  }

  if (Day > 31 || Day == "") {
    document.getElementById("dayError").textContent = "Must be a Valid Day";
    document.getElementById("dayHeading").style.color = "#FF5959";
    document.getElementById("dayHeading").style.fontWeight = 800;
  }

  if (Year > new Date().getFullYear() || Year == "") {
    document.getElementById("yearError").textContent = "Must be a Valid Year";
    document.getElementById("yearHeading").style.color = "#FF5959";
    document.getElementById("yearHeading").style.fontWeight = 800;
    return;
  }
  document.getElementById("monthError").textContent = "";
  document.getElementById("monthHeading").style.color = "#716f6f";
  document.getElementById("dayError").textContent = "";
  document.getElementById("dayHeading").style.color = "#716f6f";

  document.getElementById("yearError").textContent = "";
  document.getElementById("yearHeading").style.color = "#716f6f";

  document.getElementById("yearOut").textContent = ageInYears;
  document.getElementById("monthOut").textContent = ageInMonths;
  document.getElementById("dayOut").textContent = ageInDays;
});
