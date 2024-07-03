<script>
  import { fade } from "svelte/transition";
</script>

<div class="container" in:fade={{ duration: 250 }}>
  <div class="text">
    <p>Please select a toggle to see chart.</p>
  </div>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    max-height: 400px;
    width: 100%;
  }

  .text {
    background: var(--color-gray-shade-light);
    padding: 8px 25px;
    margin: 0px;
    text-align: center;
  }
  p {
    margin: 0px;
  }
</style>
