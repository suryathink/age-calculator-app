const dayInput = document.getElementById("dayInput");
const monthInput = document.getElementById("monthInput");
const yearInput = document.getElementById("yearInput");
const dayOut = document.getElementById("dayOut");
const monthOut = document.getElementById("monthOut");
const yearOut = document.getElementById("yearOut");
const calculateBtn = document.getElementById("calculateBtn");

function isValidDate(day, month, year) {
  // Check if the month is valid (between 1 and 12)
  if (month < 1 || month > 12) {
    return false;
  }

  // Check if the day is valid for the given month
  if (day < 1 || day > new Date(year, month, 0).getDate()) {
    return false;
  }

  return true;
}

function calculateAge(dob) {
  var dobArray = dob.split("/"); // Split the input into day, month, and year
  var userDay = parseInt(dobArray[0]);
  var userMonth = parseInt(dobArray[1]);
  var userYear = parseInt(dobArray[2]);

  if (!isValidDate(userDay, userMonth, userYear)) {
    return [-1, -1, -1]; // Invalid date, return error values
  }

  var userDOB = new Date(userYear, userMonth - 1, userDay); // Create a Date object with user input
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

  return [ageInYears, ageInMonths, ageInDays];
}

calculateBtn.addEventListener("click", () => {
  const Day = dayInput.value;
  const Month = monthInput.value;
  const Year = yearInput.value;

  const DOB = `${Day}/${Month}/${Year}`;

  const [ageInYears, ageInMonths, ageInDays] = calculateAge(DOB);

  if (ageInYears === -1 || ageInMonths === -1 || ageInDays === -1) {
    // Invalid date, show error message
    alert("Invalid date! Please enter a valid date.");
    return;
  }

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
