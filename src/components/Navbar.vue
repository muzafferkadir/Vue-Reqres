<template>
  <div class="navbar">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li style="float:right"><router-link to="/">Logout</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>
<style scoped>ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.08), 0 3px 6px 0 rgba(0, 0, 0, 0.12);
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 1rem 3rem;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: #111;
}
.navbar{
  margin-bottom: 1rem;
}
</style>
