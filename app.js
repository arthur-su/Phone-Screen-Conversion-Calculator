const maxEasyApplies = 1000;
let totalPhoneScreens = 0;
let totalEasyApplyApplications = 0;
let phoneScreenConversionRate = 0;
let targetConversionRate = 10.0;
let intervalId;

class currentTotalEasyApplies {
  constructor(threshHold) {
    this.numOfEasyApplies = threshHold;
  }
}

const stage1 = new currentTotalEasyApplies(30);
const stage2 = new currentTotalEasyApplies(60);
const stage3 = new currentTotalEasyApplies(90);

// Add phone screen button

function incrementTotalPhoneScreens() {
  totalPhoneScreens += 1;
  const value = document.querySelector('.display-phonescreen-value');
  value.textContent = `${totalPhoneScreens}`;
  calculatePhoneScreenConversionRate();
}

function autoincrementTotalPhoneScreens() {
  intervalId = setInterval(incrementTotalPhoneScreens, 100);
}

function stopIncrementTotalPhoneScreens() {
  clearInterval(intervalId);
}

// add application button

function incrementTotalEasyApplyApplications() {
  totalEasyApplyApplications += 1;
  const value = document.querySelector('.display-application-value');
  value.textContent = `${totalEasyApplyApplications}`;
  remindToCheckIn();
  calculatePhoneScreenConversionRate();
  console.log('totalEasyApplyApplications', totalEasyApplyApplications);
}

function autoincrementTotalEasyApplyApplications() {
  intervalId = setInterval(incrementTotalEasyApplyApplications, 100);
}

function stopIncrementTotalEasyApplyApplications() {
  clearInterval(intervalId);
}

// calculate conversion rate

function calculatePhoneScreenConversionRate() {
  phoneScreenConversionRate = (
    (totalPhoneScreens / totalEasyApplyApplications) *
    100
  ).toFixed(2);
  console.log(phoneScreenConversionRate);
  if (
    phoneScreenConversionRate < targetConversionRate &&
    phoneScreenConversionRate < 5.0
  ) {
    const value = document.querySelector('.display-conversion-value');
    value.textContent = ` ${phoneScreenConversionRate}%`;
    value.style.color = 'rgb(220 38 38)';
  } else if (
    phoneScreenConversionRate >= 5.0 &&
    phoneScreenConversionRate < targetConversionRate
  ) {
    const value = document.querySelector('.display-conversion-value');
    value.textContent = ` ${phoneScreenConversionRate}%`;
    value.style.color = 'rgb(251 191 36)';
  } else {
    const value = document.querySelector('.display-conversion-value');
    value.textContent = ` ${phoneScreenConversionRate}%`;
    console.log('phoneScreenConversionRate', phoneScreenConversionRate);
    value.style.color = 'rgb(132 204 22)';
  }
}

// Notify client to evaluate strategy

function remindToCheckIn() {
  if (
    totalEasyApplyApplications === stage1.numOfEasyApplies ||
    totalEasyApplyApplications === stage2.numOfEasyApplies ||
    totalEasyApplyApplications === stage3.numOfEasyApplies
  ) {
    displayReminderToMakeDecisionOnApproach();
  } else {
    unmountReminder();
  }
}

function displayReminderToMakeDecisionOnApproach() {
  const value = document.querySelector('.display-reminder-value');
  value.textContent = `Time to re-evaluate strategy based on above Conversion Rate!`;
}

function unmountReminder() {
  const value = document.querySelector('.display-reminder-value');
  value.textContent = `Keep going, you got this!`;
}

function reset() {
  totalPhoneScreens = 0;
  totalEasyApplyApplications = 0;
  const phonescreenValue = document.querySelector('.display-phonescreen-value');
  phonescreenValue.textContent = `${totalPhoneScreens}`;
  const applicationValue = document.querySelector('.display-application-value');
  applicationValue.textContent = `${totalEasyApplyApplications}`;
  const conversionValue = document.querySelector('.display-conversion-value');
  conversionValue.textContent = 'none';
  conversionValue.style.color = 'black';
}
