<template>
  <div class="header">
    <div class="logo">LOGO</div>
    <div class="search-container">
      <input type="text" class="search" placeholder="Pesquisa">
      <font-awesome-icon icon="search" class="search-icon" />
    </div>
    <div>
      <font-awesome-icon class="icons" icon="heart" />
      <font-awesome-icon class="cart-icon icons" icon="shopping-cart" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
}
</script>