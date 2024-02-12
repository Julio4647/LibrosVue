<template>
    


    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
  
      <b-navbar-brand>Libreria</b-navbar-brand>
  
      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-text to="/">Libros</b-nav-text>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </template>
  
  <script>
  export default {
  name: 'NavBar'
  }
  </script>
  
  