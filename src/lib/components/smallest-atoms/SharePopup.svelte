<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";

  export let mobile = false;
  export let onClose = () => {};

  $: top = mobile ? -2 : 25;
  $: buttonHeight = mobile ? 44 : 35;

  let urlText = window.location;
  let copyButtonText = "Copy Link";
  let popup;
  let copybtn;
  let first = true;

  let copyThatLink = () => {
    navigator.clipboard.writeText(urlText.toString());
    copyButtonText = "Link Copied";
    onClose();
  };

  function isEventInPopup(e) {
    if (first) {
      first = false;
    } else if (popup && !popup.contains(e.target)) {
      if (document) document.removeEventListener("click", isEventInPopup);
      onClose();
    }
  }

  onMount(() => {
    if (document) document.addEventListener("click", isEventInPopup);
    copybtn.focus();
  });
</script>

<div
  class="container"
  style="top: {top}px;"
  in:fade={{ duration: 250 }}
  out:fade={{ duration: 250 }}
>
  <div class="module" bind:this={popup}>
    <div class="url-field">
      <div class="url-text">{urlText}</div>
      <div class="url-fade" />
    </div>

    <button
      class="copy-url"
      style="height: {buttonHeight}px;"
      on:click={copyThatLink}
      bind:this={copybtn}>{copyButtonText}</button
    >
  </div>
</div>

<style>
  .container {
    position: absolute;
    width: 100%;
    padding: 8px 7px;
    background-color: transparent;
  }
  .module {
    max-width: 403px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: baseline;
    gap: 0px;
    background-color: white;
    outline: 8px solid var(--color-gray-shade-lightest);
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.16);
  }
  .url-field {
    flex: 1 1 auto;
    position: relative;
    padding: 0 10px;
    /* height: 100%; */
    overflow: hidden;
    white-space: nowrap;
    /* text-overflow: clip; */
  }
  .url-text {
    line-height: 150%;
    font-size: 14px;
  }
  .url-fade {
    position: absolute;
    pointer-events: none;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: linear-gradient(
      270deg,
      white,
      rgb(255, 255, 255, 0) 30px,
      rgb(255, 255, 255, 0) 0px
    );
  }
  .copy-url {
    flex: 1 1 auto;
    width: 100px;
    min-width: fit-content;
    background-color: var(--color-blue);
    color: white;
    padding: 0 5px;
    border: none;
    height: 25px;
    cursor: pointer;
  }
</style>
