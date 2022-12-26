"use strict";

const showPage = document.querySelector("main");

const sectionTransactionContainer = document.querySelector(
  ".section_container.left"
);

const greetingMessage = document.querySelector("#--greeting");

const currentBalance = document.querySelector("#--total_money");
const date = document.querySelector("#date");

const inBalance = document.querySelector("#--in");
const outBalance = document.querySelector("#--out");
const interest = document.querySelector("#--interest");

const logInSection = document.querySelector("#user_login");
const inputUserName = document.querySelector("#--user");
const inputUserPin = document.querySelector("#--pin");
const btnLogin = document.querySelector("#--log_in");
const transferToAccount = document.querySelector("#--transfer_to");
const transferAmount = document.querySelector("#--transfer_amount");
const btnTransfer = document.querySelector(".__transfer");
const requestLoan = document.querySelector("#--request_loan");
const btnRequest = document.querySelector(".__request");
const closeUserName = document.querySelector("#--confirm_user");
const closePin = document.querySelector("#--confirm_pin");
const btnClose = document.querySelector(".__close");

const arrowIcon = document.querySelector("#arrowIcon");
const sortElement = document.querySelector("#--sort");
const timerElement = document.querySelector("#--time");

let balance;
let currentAccount;
let logInSectionHTML;
let exitButton;
let checkSorting = true;
let dateFormatWH;
let dateFormatWoH;
let time;
let timer;

const account1 = {
  owner: "Melek Yavuz",
  transactions: [200, 400, -229, -4999, 300, 5000, -400, 54, -69],
  insterestRate: 1.5,
  pin: 1234,
};

const account2 = {
  owner: "Yaşar Güneş",
  transactions: [430, 400, 329, -459, -300, 6340, -440, 34, -24],
  insterestRate: 1.1,
  pin: 2345,
};

const account3 = {
  owner: "Emel Özkan",
  transactions: [30, -560, 29, -455, -30, 4340, -40, 340, 34],
  insterestRate: 1.3,
  pin: 3456,
};

const accounts = [account1, account2, account3];

const arrayItemRemove = function (arr, value) {
  const index = arr.indexOf(value);
  arr.splice(index, 1);
};

const addTransactions = function (transactions) {
  sectionTransactionContainer.innerHTML = "";

  transactions.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const withBorder = i === transactions.length - 1 ? "with_border" : "";

    const html = `
      <div class="transaction_container ${withBorder}">
        <div class="transaction_info type_${type}">
          <p id="--movement">${i + 1} ${type}</p>
        </div>
        <p id="--movement_date">${dateFormatWoH}</p>
        <div class="transaction_amount">
          <p id="--movement_amount">${mov}</p>
        </div>
      </div>
    `;

    sectionTransactionContainer.insertAdjacentHTML("afterbegin", html);
  });
};

const createUserNames = function (accnts) {
  accnts.forEach((mov, i) => {
    const userName = mov.owner
      .split(" ")
      .map((name) => name[0])
      .join("");

    accounts[i].userName = userName;
  });
};

const setTime = function () {
  const now = new Date();
  const day = `${now.getDate()}`.padStart(2, 0);
  const month = `${now.getMonth()}`.padStart(2, 0);
  const year = now.getFullYear();
  const hour = `${now.getHours()}`.padStart(2, 0);
  const minute = `${now.getMinutes()}`.padStart(2, 0);
  const second = `${now.getSeconds()}`.padStart(2, 0);

  dateFormatWH = `${day}/${month}/${year}, ${hour}:${minute}:${second}`;
  dateFormatWoH = `${day}/${month}/${year}`;
};

const implementTime = function () {
  setTime();
  date.textContent = dateFormatWH;
};

const showTime = function () {
  implementTime();
  setInterval(function () {
    implementTime();
  }, 1000);
};

const setTimer = function () {
  const minute = String(Math.trunc(time / 60)).padStart(2, 0);
  const second = String(Math.trunc(time % 60)).padStart(2, 0);
  timerElement.textContent = `${minute}:${second}`;
};

const showTimer = function () {
  time = 300;
  setTimer();

  timer = setInterval(function () {
    time--;
    setTimer();
    if (time === 0) {
      exitStyle();
      clearingInputs();
      clearInterval(timer);
    }
  }, 1000);
};

const calcBalance = function (transactions) {
  balance = transactions.reduce((acc, curr) => acc + curr);
  currentBalance.textContent = `${balance} TL`;
};

const calcDeposit = function (transactions) {
  const deposit = transactions
    .filter((mov) => mov > 0)
    .reduce((acc, curr) => acc + curr);
  inBalance.textContent = `${deposit}₺`;
};

const calcWithdrawal = function (transactions) {
  const withdrawal = transactions
    .filter((mov) => mov < 0)
    .reduce((acc, curr) => acc + curr);
  outBalance.textContent = `${withdrawal}₺`;
};

const calcInterest = function (account) {
  const intrst = (balance * account.insterestRate) / 100;
  interest.textContent = `${Math.floor(intrst).toFixed(2)}₺`;
};

const calcAll = function () {
  addTransactions(currentAccount.transactions);
  calcBalance(currentAccount.transactions);
  calcDeposit(currentAccount.transactions);
  calcWithdrawal(currentAccount.transactions);
  calcInterest(currentAccount);
};

const exitPage = function () {
  logInSection.style.display = "none";
  clearingInputs();

  const html = `<button class="exit" style = "border: none;">Exit</button>`;
  logInSection.insertAdjacentHTML("afterend", html);
  exitButton = document.getElementsByClassName("exit");
  exitButton[0].addEventListener("click", function () {
    exitStyle();
  });
};

const exitStyle = function () {
  showPage.style.visibility = "hidden";
  logInSection.style.display = "";
  exitButton[0].style.display = "none";
  greetingMessage.textContent = `Log in to get started`;
  addTransactions(currentAccount.transactions);
  clearInterval(timer);
};

const clearingInputs = function () {
  inputUserName.value = "";
  inputUserPin.value = "";
  transferToAccount.value = "";
  transferAmount.value = "";
  requestLoan.value = "";
  closeUserName.value = "";
  closePin.value = "";
};

createUserNames(accounts);

const logInUser = function (userName, pin) {
  showTime();
  showTimer();

  accounts.find((acc) => {
    acc.userName === userName ? (currentAccount = acc) : "";
  });

  if (currentAccount?.pin === Number(pin)) {
    greetingMessage.textContent = `Welcome Back, ${currentAccount.owner}`;
    showPage.style.visibility = "visible";
    calcAll();
    exitPage();
  }
};

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  const userName = inputUserName.value.toUpperCase();
  const pin = inputUserPin.value;

  logInUser(userName, pin);
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const transferUseName = transferToAccount.value.toUpperCase();
  const transferedMoney = transferAmount.value;

  const transferedAccount = accounts.find((acc) =>
    acc.userName === transferUseName ? acc : ""
  );

  if (
    currentAccount.userName !== transferUseName &&
    Number(transferedMoney) > 0
  ) {
    currentAccount.transactions.push(-Math.abs(transferedMoney));
    transferedAccount.transactions.push(Math.abs(transferedMoney));
    calcAll();
  }

  clearingInputs();
});

btnRequest.addEventListener("click", function (e) {
  e.preventDefault();

  const loanAmount = requestLoan.value;
  const canTakeLoan = currentAccount.transactions.some(
    (mov) => mov > loanAmount * 0.1
  );
  if (canTakeLoan) {
    currentAccount.transactions.push(Math.abs(loanAmount));
    calcAll();
  }

  clearingInputs();
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  const userName = closeUserName.value.toUpperCase();
  const userPin = closePin.value;

  if (
    currentAccount.userName === userName &&
    currentAccount.pin === Number(userPin)
  ) {
    arrayItemRemove(accounts, currentAccount);
    exitStyle();
    currentAccount = "";
    clearingInputs();
  }
});

sortElement.addEventListener("click", function (e) {
  e.preventDefault();

  const tempTransactions = [...currentAccount.transactions];

  if (checkSorting) {
    tempTransactions.sort((x, y) => x - y);
    arrowIcon.classList.remove("fa-sharp", "fa-solid", "fa-arrow-down");
    arrowIcon.classList.add("fa-sharp", "fa-solid", "fa-arrow-up");
    checkSorting = !checkSorting;
  } else {
    tempTransactions.sort((x, y) => y - x);
    arrowIcon.classList.remove("fa-sharp", "fa-solid", "fa-arrow-up");
    arrowIcon.classList.add("fa-sharp", "fa-solid", "fa-arrow-down");
    checkSorting = !checkSorting;
  }

  addTransactions(tempTransactions);
});
