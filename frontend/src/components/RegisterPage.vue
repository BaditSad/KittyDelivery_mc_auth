<script src="../scripts/RegisterPage.js"></script>
<style src="../stylesheets/styles.css" scoped></style>

<template>
  <header>
    <img src="../assets/ban.png" />
  </header>
  <div class="container">
    <main>
      <form class="form">
        <h1>Création de votre compte Kitty ! &#129395;</h1>
        <label class="text">
          <input class="text" type="text" placeholder="Adresse email" />
        </label>
        <label class="text">
          <input class="text" type="password" placeholder="Mot de passe" />
        </label>
        <label class="text">
          <input class="text" type="password" placeholder="Vérification du mot de passe" />
        </label>
        <div class="radio-group">
          <label class="radio">
            <input type="radio" name="option" value="1" /> Client
          </label>
          <label class="radio">
            <input type="radio" name="option" value="2" /> Livreur
          </label>
          <label class="radio">
            <input type="radio" name="option" value="3" /> Restaurateur
          </label>
        </div>
        <button class="button-login" type="button">
          <i class="icon ion-md-lock"></i> S'inscrire
        </button>
      </form>
      <router-link to="/">
        <p class="signup">Déjà un compte ?</p>
      </router-link>
    </main>
  </div>
</template>
