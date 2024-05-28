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
        <label>
          <input type="text" placeholder="Adresse email" />
        </label>
        <label>
          <input type="password" placeholder="Mot de passe" />
        </label>
        <label>
          <input type="password" placeholder="Vérification du mot de passe" />
        </label>
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
