'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
// Event handlers
let currentUser, timer;

const account1 = {
  owner: 'js',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'jd',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
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
const displayMovements = function (user, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? user.movements.slice().sort((a, b) => a - b)
    : user.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(user.movementsDates[i]);

    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();

    const displayDate = `${day}/${month}/${year}`;

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${mov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

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

  labelSumInterest.textContent = Math.trunc(
    (labelSumIn.textContent / 100) * user.interestRate
  );

  // Display Movements
  displayMovements(user);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, '0');
    const sec = String(time % 60).padStart(2, '0');
    // In each call print remaining time to interface
    labelTimer.textContent = `${min}:${sec}`;
    //When 0 seconds stop timer and log user out

    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
    }
    // Decrease time by 1s
    time--;
  };

  // Set time to 5 mins
  let time = 100;
  // Call timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

// --------------EVENT HANDLERS-------------------

// -----KEEP IT OPEN-------------
// displayDetails(accounts[0]);

// LOGIN

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentUser = accounts.find(
    account => account.owner === inputLoginUsername.value
  );
  if (currentUser?.pin === Number(inputLoginPin.value)) {
    displayDetails(currentUser);

    // Display Date

    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // `${day}/${month}/${year}, ${hour}:${min}`;

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentUser.locale,
      options
    ).format(now);
    // `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
  }
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

    // Add transfer date
    currentUser.movementsDates.push(new Date().toISOString());
    recipient.movementsDates.push(new Date().toISOString());

    // Update Summary
    displayDetails(currentUser);

    //Reset Timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

// REQUEST LOAN
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentUser.movements.some(mov => mov > (loanAmount / 100) * 10)
  ) {
    currentUser.movements.push(loanAmount);

    // Add Loan date
    currentUser.movementsDates.push(new Date().toISOString());

    // Update UI
    displayDetails(currentUser);

    //Reset Timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
  inputLoanAmount.value = '';
});

// CLOSE ACCOUNT
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentUser.owner &&
    Number(inputClosePin.value) === currentUser.pin
  ) {
    const index = accounts.findIndex(
      account => account.owner === inputCloseUsername.value
    );
    accounts.splice(index, 1);
    console.log(accounts);
  }

  // Logout
  document.querySelector('.app').style.opacity = 0;

  inputCloseUsername.value = inputClosePin.value = '';
});

// MOVEMENTS SORT

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentUser, !sorted);
  sorted = !sorted;
});
