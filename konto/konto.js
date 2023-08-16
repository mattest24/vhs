// Function to update user details on the page
function updateUserDetails(userData) {
  const userNameElement = document.getElementById('userName');
  const userAddressElement = document.getElementById('userAddress');
  const userCityElement = document.getElementById('userCity');
  
  console.log(userData); // Dodaj ten console.log
  
  if (userData.length > 0) {
    const user = userData[0];
    userNameElement.textContent = user.name;
    userAddressElement.textContent = user.address;
    userCityElement.textContent = user.city;
  } else {
    console.log("No user data available.");
  }
}

// Function to check if the user is logged in
const isLoggedIn = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};

// Function to get the user ID
const getUserId = () => {
  return localStorage.getItem("userId");
};

// Function to get user data
async function getUserData(userId) {
  const response = await fetch(`https://vhs2023-d7mb.onrender.com/userdata/${userId}`);
  const userData = await response.json();
  return userData;
}

// Usage of the functions within an async function
async function displayUserData() {
  if (isLoggedIn()) {
    const userId = getUserId();
    const userData = await getUserData(userId);
    updateUserDetails(userData);
  } else {
    console.log("User is not logged in.");
  }
}

// Call the async function to display user data
displayUserData();

// Funkcja do obsługi wysyłania formularza (dane adresowe)
async function handleAddressFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const zip_code = document.getElementById("zipCode").value;

  try {
    const response = await fetch(`https://vhs2023-d7mb.onrender.com/save-address/${getUserId()}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, address, city, zip_code }),
    });

    if (response.ok) {
      // Dane adresowe zapisane pomyślnie
      const loginStatus = document.getElementById("login-status");
      loginStatus.textContent = "Dane adresowe zapisane pomyślnie";
    } else {
      // Nie udało się zapisać danych adresowych
      const loginStatus = document.getElementById("login-status");
      loginStatus.textContent = "Nie udało się zapisać danych adresowych";
    }
  } catch (error) {
    console.error(error);
    const loginStatus = document.getElementById("login-status");
    loginStatus.textContent =
      "Wystąpił błąd podczas zapisywania danych adresowych. Spróbuj ponownie później.";
  }
}

// Pobranie referencji do formularza
const addressForm = document.getElementById('address-form');

// Dodanie nasłuchiwacza na zdarzenie "submit"
addressForm.addEventListener('submit', handleAddressFormSubmit);




// Funkcja do obsługi wylogowania
const handleLogout = () => {
  // Usuń userId z local storage
  localStorage.removeItem("userId");

  // Ustaw isLoggedIn na false w local storage
  localStorage.setItem("isLoggedIn", "false");

  // Ukryj przycisk wylogowania
  hideLogoutButton();

  // Odśwież stronę automatycznie
  location.reload();
};

// Nasłuchuj kliknięcia na przycisku wylogowania
const logoutButton = document.getElementById("logout-button");
logoutButton.addEventListener("click", handleLogout);

// Funkcja ukrycia przycisku wyloguj
function hideLogoutButton() {
  const logoutButton = document.getElementById("logout-button");
  if (!isLoggedIn()) {
    logoutButton.style.display = "none";
  } else {
    logoutButton.style.display = "block";
  }
}

// Sprawdź, czy użytkownik jest zalogowany przy załadowaniu strony
window.addEventListener("load", () => {
  if (isLoggedIn()) {
    // User is logged in
    const loginStatus = document.getElementById("login-status");
    loginStatus.textContent = `Zalogowany jako użytkownik o ID: ${getUserId()}`;

    // Show the logout button
    hideLogoutButton();
  } else {
    // User is not logged in
    const loginStatus = document.getElementById("login-status");
    loginStatus.textContent = "Nie jesteś zalogowany";
    hideLogoutButton();
    hideOrdersButton(); 
  }
});

// Funkcja ukrycia przycisku Zamówienia
function hideOrdersButton() {
  const logoutButton = document.getElementById("ordersButton");
  if (!isLoggedIn()) {
    logoutButton.style.display = "none";
  } else {
    logoutButton.style.display = "block";
  }
}