const form = document.getElementById('login-form');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const toggleLink = document.getElementById('toggle-link');
const toggleText = document.getElementById('toggle-text');
const message = document.getElementById('message');

let mode = 'login'; // ou 'signup'

toggleLink.addEventListener('click', (e) => {
  e.preventDefault();
  mode = mode === 'login' ? 'signup' : 'login';

  formTitle.textContent = mode === 'login' ? 'Connexion' : 'Créer un compte';
  submitBtn.textContent = mode === 'login' ? 'Se connecter' : 'Créer le compte';
  toggleText.innerHTML = mode === 'login'
    ? `Pas encore de compte ? <a href="#" id="toggle-link">Créer un compte</a>`
    : `Déjà inscrit ? <a href="#" id="toggle-link">Se connecter</a>`;

  // Important : reconnecter le lien après remplacement
  document.getElementById('toggle-link').addEventListener('click', (e) => {
    e.preventDefault();
    toggleLink.click(); // relance le switch
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    message.textContent = "Veuillez remplir tous les champs.";
    return;
  }

  // Ici, tu pourras connecter à Python plus tard avec fetch + Flask
  message.textContent = `Simulation ${mode} pour ${username}`;
});

fetch(`/${mode}`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username, password })
})
.then(res => res.json())
.then(data => {
  message.textContent = data.message;
})
.catch(err => {
  message.textContent = "Erreur lors de la connexion au serveur.";
});
