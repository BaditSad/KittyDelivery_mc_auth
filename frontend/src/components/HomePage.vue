<script src="../scripts/HomePage.js"></script>
<style src="../stylesheets/styles.css" scoped></style>

<template>
  <header>
    <img src="../assets/ban.png" />
  </header>
  <div class="container">
    <main>
      <form class="form">
        <h1>Connexion avec votre compte Kitty</h1>
        <label>
          <input type="text" placeholder="Adresse email" />
        </label>
        <label>
          <input type="password" placeholder="Mot de passe" />
        </label>
        <router-link :to="{ RegisterPage : '/RegisterPage' }">
        <button class="button-login" type="button">
          <i class="icon ion-md-lock"></i> S'inscrire
        </button>
        </router-link>
      </form>
      <p class="signup">S'inscrire</p>
    </main>
  </div>
</template>
