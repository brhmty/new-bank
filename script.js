"use strict";

const showPage = document.querySelector("main");

const sectionTransactionContainer = document.querySelector(
  ".section_container.left"
);

const greetingMessage = document.querySelector("#--greeting");

const currentBalance = document.querySelector("#--total_money");

const inBalance = document.querySelector("#--in");
const outBalance = document.querySelector("#--out");
const interest = document.querySelector("#--interest");

const inputUserName = document.querySelector("#--user");
const inputUserPin = document.querySelector("#--pin");
const btnLogin = document.querySelector("#--log_in");

let balance;

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
let currentAccount;

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
        <p id="--movement_date">1${i}.03.2053</p>
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

createUserNames(accounts);

const verifyingUser = function (userName, pin) {
  accounts.find((acc) => {
    acc.userName === userName ? (currentAccount = acc) : "";
  });

  if (currentAccount?.pin === Number(pin)) {
    greetingMessage.textContent = `Tekrar Hoşgeldiniz, ${currentAccount.owner}`;
  }

  showPage.style.visibility = "visible";
  addTransactions(currentAccount.transactions);
  calcBalance(currentAccount.transactions);
  calcDeposit(currentAccount.transactions);
  calcWithdrawal(currentAccount.transactions);
  calcInterest(currentAccount);
};

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  const userName = inputUserName.value.toUpperCase();
  const pin = inputUserPin.value;

  verifyingUser(userName, pin);
});
