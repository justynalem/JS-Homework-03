const financialData = require("./financial.json");

console.log("Financial data: ", getFiancialObject(financialData));

function getFiancialObject(arr) {
  const financialObject = {};
  // TODO (create functions for calculations below)
  financialObject.spendings = spendingsOfYear(arr, 2014);
  financialObject.companiesEarnings = companiesEarnings(arr);
  financialObject.spendingsByMonth = spendingsByMonth(arr);
  financialObject.spendingsPerDayOfTheWeek = spendingsPerDayOfTheWeek(arr);
  return financialObject;
}

// TODO (util functions)

// DATE OF TRANSACTION - usefull to establish  year(i), month(iv), day of a week(v) of transaction
function getDate(str) {
  const [year, month, day] = str.split("-").reverse();
  const dateOfTransaction = new Date(year, month - 1, day);
  return dateOfTransaction;
}
/////////////////////////////////////////////////////////////////////
// i. HOW MUCH MONEY WAS SPENT IN 2014
function spendingsOfYear(arr, year) {
  const costsOfYear = arr.reduce((acc, { detailsOfPayent: { date }, cost }) => {
    if (getDate(date).getFullYear() === year) {
      return (acc += Number(cost));
    }
    return acc;
  }, 0);
  return costsOfYear.toFixed(2);
}

/////////////////////////////////////////////////////////////////////
// ii. EARNINGS PER COMPANY

function companiesEarnings(arr) {
  return arr.reduce((acc, { cost, detailsOfPayent: { company } }) => {
    if (!acc[company]) {
      acc[company] = 0;
    }
    const companyEarning = Number(acc[company]) + Number(cost);
    acc[company] = companyEarning.toFixed(2);
    return acc;
  }, {});
}
// console.log(companiesEarnings(financialData));

/////////////////////////////////////////////////////////////////////
// iii. SPENDINGS PER TRANSACTION TYPE
function spendingsPerTransactionType(arr) {
  // return arr.reduce(acc, curObj) // Below used with destructuring of object in sake of non repeating everywhere currObj.detailsOfPayent.Type and currObj.cost
  return arr.reduce((acc, { cost, detailsOfPayent: { Type: type } }) => {
    if (!acc[type]) {
      acc[type] = 0;
    }
    const spendings = Number(acc[type]) + Number(cost);
    acc[type] = spendings.toFixed(2);
    return acc;
  }, {});
}
// console.log(spendingsPerTransactionType(financialData));

/////////////////////////////////////////////////////////////////////
// iv. SPENDINGS BY MONTH
function monthName(date) {
  return date.toLocaleString("en-US", { month: "long" });
} // to get name of the month instead of number of the month

function spendingsByMonth(arr) {
  return arr.reduce((acc, { cost, detailsOfPayent: { date } }) => {
    let month = monthName(getDate(date));
    if (!acc[month]) {
      acc[month] = 0;
    }
    const spendingsMonth = Number(acc[month]) + Number(cost);
    acc[month] = spendingsMonth.toFixed(2);
    return acc;
  }, {});
}
// console.log(spendingsByMonth(financialData));

/////////////////////////////////////////////////////////////////////
// v. SPENDINGS PER DAY OF THE WEEK
function weekday(date) {
  return date.toLocaleString("en-US", { weekday: "long" });
}

function spendingsPerDayOfTheWeek(arr) {
  return arr.reduce((acc, { cost, detailsOfPayent: { date } }) => {
    const weekDay = weekday(getDate(date));
    if (!acc[weekDay]) {
      acc[weekDay] = 0;
    }
    // acc[weekDay] = Number(acc[weekDay]) + Number(curObj.cost);
    // return acc;
    spendingsPerDay = Number(acc[weekDay]) + Number(cost);
    acc[weekDay] = spendingsPerDay.toFixed(2);
    return acc;
  }, {});
}

// console.log(spendingsPerDayOfTheWeek(financialData));
