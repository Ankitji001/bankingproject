// Sample user data (in real app, use database for user management)
let users = [
    { username: 'user', password: 'password', balance: 1000, transactions: [
      { type: 'deposit', amount: 1000, timestamp: new Date() },
      { type: 'withdraw', amount: 200, timestamp: new Date() }
    ] }
  ];
  
  let currentUser = null; // Variable to track logged-in user
  
  const loginForm = document.getElementById('loginForm');
  const loginFormFields = document.getElementById('loginFormFields');
  const signupForm = document.getElementById('signupForm');
  const signupFormFields = document.getElementById('signupFormFields');
  const dashboard = document.getElementById('dashboard');
  const balanceAmount = document.getElementById('balanceAmount');
  const transactionsList = document.getElementById('transactionsList');
  const transactionForm = document.getElementById('transactionForm');
  const amountInput = document.getElementById('amount');
  const depositBtn = document.getElementById('depositBtn');
  const withdrawBtn = document.getElementById('withdrawBtn');
  
  // Function to find a user by username and password
  function findUser(username, password) {
    return users.find(user => user.username === username && user.password === password);
  }
  
  // Event listener for login form submission
  loginFormFields.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const user = findUser(username, password);
    if (!user) {
      alert('Invalid username or password. Please try again.');
      return;
    }
    
    currentUser = user;
    loginForm.style.display = 'none';
    signupForm.style.display = 'none';
    dashboard.style.display = 'block';
    updateUI();
  });
  
  // Event listener for signup form submission
  signupFormFields.addEventListener('submit', function(event) {
    event.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    
    // Check if username already exists
    if (users.some(user => user.username === newUsername)) {
      alert('Username already exists. Please choose a different username.');
      return;
    }
    
    // Create new user
    const newUser = {
      username: newUsername,
      password: newPassword,
      balance: 0,
      transactions: []
    };
    users.push(newUser);
    
    // Simulate login after signup
    currentUser = newUser;
    loginForm.style.display = 'none';
    signupForm.style.display = 'none';
    dashboard.style.display = 'block';
    updateUI();
  });
  
  // Display initial balance and transaction history
  function updateUI() {
    balanceAmount.textContent = currentUser.balance.toFixed(2);
    displayTransactions();
  }
  
  // Display transaction history
  function displayTransactions() {
    transactionsList.innerHTML = '';
    currentUser.transactions.forEach(transaction => {
      const li = document.createElement('li');
      const sign = transaction.type === 'deposit' ? '+' : '-';
      li.textContent = `${transaction.type.toUpperCase()} ${sign}$${transaction.amount.toFixed(2)} (${transaction.timestamp.toLocaleString()})`;
      transactionsList.appendChild(li);
    });
  }
  
  // Handle deposit and withdraw transactions
  function handleTransaction(event) {
    event.preventDefault();
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    const transactionType = event.target.id === 'depositBtn' ? 'deposit' : 'withdraw';
    
    // Update user's balance and add transaction
    if (transactionType === 'deposit') {
      currentUser.balance += amount;
    } else {
      if (amount > currentUser.balance) {
        alert('Insufficient balance.');
        return;
      }
      currentUser.balance -= amount;
    }
    
    currentUser.transactions.push({
      type: transactionType,
      amount: amount,
      timestamp: new Date()
    });
    
    amountInput.value = '';
    updateUI();
  }
  
  // Event listeners for transaction form buttons
  transactionForm.addEventListener('submit', handleTransaction);
  depositBtn.addEventListener('click', handleTransaction);
  withdrawBtn.addEventListener('click', handleTransaction);
  