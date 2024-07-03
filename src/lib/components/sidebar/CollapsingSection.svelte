<script>
  import { logClickToGA } from "@urbaninstitute/dataviz-components";

  //if open is true
  //  content displays
  //  icon is a minus
  //if open is false
  //  no content visible
  //  icon is a plus
  export let open = false;
  export let headingContent = "";

  let contentSelf;

  function toggleOpen(e) {
    open = !open;
    if (!open) {
      contentSelf.style.maxHeight = "";
    } else {
      contentSelf.style.maxHeight = contentSelf.scrollHeight + "px";
    }
    logClickToGA(e.target, "collapsing_section--" + headingContent.replace(" ", "_") + "__" + open);
  }
</script>

<button class="heading {open ? 'open' : ''}" on:click={toggleOpen}>
  <h5>
    {@html headingContent}
  </h5>
  <img class="icon" src={open ? "./icon-minus.svg" : "./icon-plus.svg"} alt="" />
</button>
<div class="divider">
  <div class="yellow-half" />
  <div class="gray-half" />
</div>
<div class="content" bind:this={contentSelf}>
  <slot />
</div>

<style>
  .heading {
    margin-top: 20px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    width: 100%;
    height: 40px;
    background-color: transparent;
    border: none;
  }
  .heading > h5 {
    flex: 1 0 auto;
    margin: 10px 0px;
    text-align: left;
  }
  .icon {
    flex: 0 1 auto;
    height: 20px;
    width: 20px;
    background-size: contain;
  }
  .divider {
    display: flex;
    height: 5px;
    width: 100%;
    align-items: center;
  }
  .yellow-half {
    flex: 0 1 50%;
    height: 5px;
    background-color: var(--color-yellow);
  }
  .gray-half {
    flex: 0 1 50%;
    height: 1px;
    background-color: var(--color-gray);
  }
  .content {
    transition: max-height 300ms ease-in-out;
    max-height: 0px;
    overflow: hidden;
  }
</style>
