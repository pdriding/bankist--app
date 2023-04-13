'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
let currentUser = {};

const account1 = {
  owner: 'js',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'jd',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// ---------------Display Users Details------------
const displayDetails = function (user) {
  // Display Screen
  document.querySelector('.app').style.opacity = 1;

  // Display Current Balance
  const currentBalance = user.movements.reduce((acc, cur) => acc + cur);
  user.currentBalance = currentBalance;
  labelBalance.textContent = currentBalance;

  // Calculate and Display Summary
  labelSumIn.textContent = user.movements
    .filter(input => input > 0)
    .reduce((acc, cur) => acc + cur);

  labelSumOut.textContent = user.movements
    .filter(input => input < 0)
    .reduce((acc, cur) => acc + cur);

  labelSumInterest.textContent =
    (labelSumIn.textContent / 100) * user.interestRate;

  // Display Movements
  user.movements.forEach(mov => {
    const html = `<div class="movements__row">
    <div class="movements__type ${
      mov > 0 ? 'movements__type--deposit' : 'movements__type--withdrawal'
    }">2 deposit</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${mov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });

  // Start logout timer
};

// --------------EVENT HANDLERS-------------------

// -----KEEP IT OPEN-------------
// displayDetails(accounts[0]);

// LOGIIN
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  const user = accounts.find(
    account => account.owner === inputLoginUsername.value
  );
  if (user.pin === Number(inputLoginPin.value)) {
    displayDetails(user);
  }
  currentUser = user;
});

// TRANSFER MONEY
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recipient = accounts.find(
    account => account.owner === inputTransferTo.value
  );

  if (recipient && recipient !== currentUser) {
    // Update amounts
    currentUser.movements.push(-amount);
    recipient.movements.push(amount);

    // Update Summary
    displayDetails(currentUser);
  }
});

// REQUEST LOAN
