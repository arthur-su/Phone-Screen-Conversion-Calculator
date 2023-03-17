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
  const container = document.querySelector('.container-phonescreens');
  container.innerHTML = `<b class="display-phonescreens">Phone Screens:</b> ${totalPhoneScreens}`;
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
  const container = document.querySelector('.container-applications');
  container.innerHTML = `<b class="display-applications">Application(s):</b> ${totalEasyApplyApplications}`;
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
    phoneScreenConversionRate < 5
  ) {
    const container = document.querySelector('.container-conversionrate');
    container.innerHTML = `<b>Converted:</b> ${phoneScreenConversionRate}%`;
    container.style.color = 'rgb(220 38 38)';
  } else if (
    phoneScreenConversionRate >= 5 &&
    phoneScreenConversionRate < targetConversionRate
  ) {
    const container = document.querySelector('.container-conversionrate');
    container.innerHTML = `<b>Converted:</b> ${phoneScreenConversionRate}%`;
    container.style.color = 'rgb(251 191 36)';
  } else {
    const container = document.querySelector('.container-conversionrate');
    container.innerHTML = `<b>Converted:</b> ${phoneScreenConversionRate}%`;
    console.log('phoneScreenConversionRate', phoneScreenConversionRate);
    container.style.color = 'rgb(132 204 22)';
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
  const container = document.querySelector('.container-reminders');
  container.innerHTML = `<b>Reminder:</b> Time to re-evaluate strategy based on above Conversion Rate!`;
}

function unmountReminder() {
  const container = document.querySelector('.container-reminders');
  container.innerHTML = `<b>Reminder: </b>Keep going, you got this!`;
}
