<template>
  <div class="product-skeleton">
    <div class="image-skeleton"></div>
    <div class="content-skeleton">
      <div class="title-skeleton"></div>
      <div class="price-skeleton"></div>
      <div class="button-skeleton"></div>
    </div>
  </div>
</template>

<style scoped>
.product-skeleton {
  background: var(--bg-secondary);
  border-radius: 8px;
  padding: 1rem;
  height: 100%;
}

.image-skeleton,
.title-skeleton,
.price-skeleton,
.button-skeleton {
  background: linear-gradient(
    90deg,
    var(--color-border) 0%,
    var(--color-border-hover) 50%,
    var(--color-border) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.image-skeleton {
  width: 100%;
  height: 200px;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.title-skeleton {
  height: 24px;
  width: 80%;
  margin-bottom: 0.5rem;
}

.price-skeleton {
  height: 20px;
  width: 40%;
  margin-bottom: 1rem;
}

.button-skeleton {
  height: 40px;
  width: 100%;
  border-radius: 20px;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
