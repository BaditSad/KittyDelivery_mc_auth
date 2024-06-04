<script src="../scripts/HomePage.js"></script>
<style src="../stylesheets/styles.css" scoped></style>

<template>
  <header>
    <img src="../assets/ban.png" />
  </header>
  <div class="container">
    <main>
      <form class="form">
        <h1>Connexion avec votre compte Kitty ! &#9995;</h1>
        <label class="text">
          <input class="text" type="text" placeholder="Adresse email" />
        </label>
        <label class="text">
          <input class="text" type="password" placeholder="Mot de passe" />
        </label>
        <button class="button-login" type="button">
          <i class="icon ion-md-lock"></i> Connexion
        </button>
      </form>
      <div class="signup-container">
        <router-link to="/register">
          <p class="signup">S'inscrire</p>
        </router-link>
      </div>
    </main>
  </div>
</template>
