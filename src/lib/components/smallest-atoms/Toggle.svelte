<script>
  /**
   * Whether the toggle is active or not
   * @type {boolean}
   **/
  export let active = false;

  /**
   * Label for the toggle
   * @type {string}
   **/
  export let label = "Enim id qui labore labore";

  /**
   * Position of the label relative to the toggle
   * @type {"left" | "right"}
   **/
  export let labelPosition = "left";

  /**
   * Whether the toggle is disabled or not
   * @type {boolean}
   **/
  export let disabled = false;

  /**
   * Surfaces onClick function
   **/
  export let onClick = () => (active = !active);
</script>

<button
  class="container {labelPosition}"
  {disabled}
  role="switch"
  aria-checked={active}
  on:click={onClick}
  style:direction={labelPosition === "right" ? "rtl" : "ltr"}
>
  <p class="label {labelPosition}">{@html label}</p>
  <span class="toggle" aria-hidden="true">
    <span class="circle" />
  </span>
</button>

<style>
  .container {
    appearance: none;
    background: none;
    border: none;
    color: var(--color-black);
    display: inline-flex;
    gap: 0.75rem;
    justify-content: start;
    align-items: center;
    cursor: pointer;
  }

  /* lower opacity if disabled */
  .container:disabled {
    opacity: 0.5;
    cursor: initial;
  }

  /* label text */
  .label {
    display: inline-block;
    font-weight: 400;
    font-size: 20px;
    line-height: 1;
    text-align: left;
    margin: 12px 0px;
  }

  .toggle {
    display: inline-block;
    min-width: 36px;
    height: 20px;
    border-radius: 10px;
    background-color: var(--color-gray-shade-dark);
    border: 1px solid var(--color-gray-shade-dark);
    position: relative;
    transition:
      background-color 250ms ease,
      border 250ms ease;
  }

  .toggle .circle {
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 7px;
    background-color: var(--color-white);
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(2px, 2px);
    transition: transform 250ms ease;
  }

  button[aria-checked="true"] .toggle {
    background-color: var(--color-blue);
    border: 1px solid var(--color-blue);
  }

  button[aria-checked="true"] .circle {
    background-color: var(--color-white);
    left: none;
    transform: translate(17px, 2px);
  }

  @media (prefers-reduced-motion: reduce) {
    .toggle,
    .toggle .circle {
      transition-duration: 0ms;
    }
  }
</style>
