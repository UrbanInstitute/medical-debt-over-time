<script>
  //import { logClickToGA } from "$utils/analytics";
  //import { onDestroy } from "svelte";

  export let text = "";
  //export let popupID = "any"
  export let placementBelow = true;
  export let width = 229;

  let popup;
  let icon;
  let open = false;

  // onDestroy(() => {
  //     if (document) document.removeEventListener("click", isEventInPopup);
  // })

  function isEventInPopup(e) {
    if (!open) {
      //it trickles down and calls on first click always, so just handle it here
      //logClickToGA(e.target,"popup_click--open_"+popupID)
      open = true;
      return;
    }
    if (popup && !popup.contains(e.target)) {
      open = false;
      //logClickToGA(e.target,"popup_click--close_"+popupID)
      if (document) document.removeEventListener("click", isEventInPopup);
    }
  }

  function handleIconClick(e) {
    if (!open) {
      if (document) document.addEventListener("click", isEventInPopup);
    }
  }
</script>

<div class="popup-group">
  <button
    class="info"
    aria-label="show popup"
    tabindex="0"
    on:click={handleIconClick}
    bind:this={icon}
  >
    <span class="info-label">{open ? "X" : "i"}</span>
  </button>
  {#if open}
    <div
      class="popup {placementBelow ? 'bottom' : 'corner'}"
      style="width:{width}px;"
      bind:this={popup}
    >
      <span class="popup-text">{@html text}</span>
    </div>
  {/if}
</div>

<style>
  .popup-group {
    position: relative;
    display: inline-block;
  }

  .info {
    cursor: pointer;
    width: 20px;
    height: 20px;
    position: relative;
    margin-left: 7px;
    border-radius: 50%;
    border-width: 0px;
    display: inline-block;
    color: white;
    background-color: black;
    font-size: 13px;
    line-height: 1;
    font-weight: 900;
    text-align: center;
    vertical-align: text-top;
    user-select: none;
  }
  .info-label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .popup {
    line-height: var(--line-height-tight);
    position: absolute;
    padding: 10px;
    width: 220px;
    text-transform: none;
    background-color: var(--color-gray-shade-lightest);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    z-index: 4;
  }
  .bottom {
    left: -110px;
    top: 30px;
  }
  .corner {
    top: 45px;
    right: -11px;
    width: 220px;
  }
  .popup-text {
    flex: 0 1 auto;
    font-size: 14px;
    line-height: var(--line-height-tight);
    font-weight: var(--font-weight-light);
  }
</style>
