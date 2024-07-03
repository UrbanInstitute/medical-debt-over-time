<script>
  import {
    areWeSearching,
    geographies,
    getFIPSfromName,
    updateGeo,
    updateURL,
    searchingPosition,
    getNamefromPosition,
    first_geo,
    second_geo,
    third_geo
  } from "../../../stores/geographies";
  import { fade } from "svelte/transition";
  import Typeahead from "svelte-typeahead";
  import { BasicDropdown, logClickToGA } from "@urbaninstitute/dataviz-components";
  import { onDestroy, onMount } from "svelte";

  let icon_close = "./icon-close.svg";

  onMount(() => {
    document.addEventListener("click", closeSearchPopup);
    document.querySelector("[name ='search']").focus();
  });

  onDestroy(() => {
    document.removeEventListener("click", closeSearchPopup);
  });

  let all_box_val = "",
    picked_state = null,
    counties_box_val = null;

  let final_geoid = "";

  let popup = null;
  let clickCounter = 0; //have to ignore first click

  function setGeoid(val) {
    if (!val || val == "" || val == "999999" || val == "00") return;
    areWeSearching.set(false);
    updateGeo($searchingPosition, val);
    updateURL();
    //handled by onNavigate
    //selected_position.set($searchingPosition)
  }

  function closeSearchPopup(e) {
    if (
      $areWeSearching &&
      popup &&
      !popup.contains(e.target) &&
      !(e.target.nodeName.toLowerCase() == "li") &&
      clickCounter > 0
    ) {
      areWeSearching.set(false);
      document.removeEventListener("click", closeSearchPopup);
    }
    clickCounter++;
  }

  let width = 100;
  $: mobile = width < 1000;

  $: topPerc = !mobile
    ? "50%"
    : $searchingPosition == 0
      ? "17%"
      : $searchingPosition == 1
        ? "50%"
        : "83%";
  $: leftPerc = mobile
    ? "50%"
    : $searchingPosition == 0
      ? "17%"
      : $searchingPosition == 1
        ? "50%"
        : "83%";
</script>

<svelte:window bind:innerWidth={width} />
<!--what goes in the popup-->
<div class="search-popup-background" transition:fade={{ duration: 300 }}>
  <div
    class="search-popup"
    style="top: calc({topPerc} - 140px); left: calc({leftPerc} - 180px);"
    bind:this={popup}
  >
    <button class="remove-me" on:click={() => areWeSearching.set(false)}>
      <img src={icon_close} width="15" alt="Close search popup." />
    </button>
    <!-- This component searches through everything -->
    <div class="search-container {final_geoid == getFIPSfromName(all_box_val) ? 'selected' : ''}">
      <Typeahead
        label="Search all counties and states."
        placeholder="Search all counties and states..."
        hideLabel
        data={$geographies.all.filter(
          (d) => ![first_geo, $second_geo, $third_geo].includes(d.value)
        )}
        extract={(item) => item.label}
        bind:value={all_box_val}
        on:select={(e) => {
          final_geoid = getFIPSfromName(all_box_val);
          logClickToGA(e.target, "use_search_popup--search_all");
        }}
      />
    </div>

    <!-- This component is just for states -->
    <div class="search-container {final_geoid == picked_state ? 'selected' : ''}">
      <BasicDropdown
        id="state-dropdown"
        data={$geographies.states}
        bind:value={picked_state}
        placeholder="Select a state..."
        inlineLabel="Select a state..."
        dropdownWidth={260}
        on:change={(e) => {
          final_geoid = picked_state;
          logClickToGA(e.target, "use_search_popup--state_dropdown");
        }}
      />
    </div>

    <!-- This component is disabled until a state is picked, and then it shows counties for that state -->
    <div class="search-container {final_geoid == counties_box_val ? 'selected' : ''}">
      <BasicDropdown
        id="county-dropdown"
        data={picked_state
          ? $geographies.states
              .filter((d) => d.value == picked_state)[0]
              .counties.filter((d) => ![first_geo, $second_geo, $third_geo].includes(d.value))
          : [{ value: "999999", label: "No state selection" }]}
        placeholder="Select a county..."
        inlineLabel="Select a county..."
        dropdownWidth={260}
        bind:value={counties_box_val}
        on:change={(e) => {
          final_geoid = counties_box_val;
          logClickToGA(e.target, "use_search_popup--county_dropdown");
        }}
      />
    </div>

    <!--This is our see data button-->
    <div class="search-button-container">
      <button
        class="go-btn"
        on:click={(e) => {
          setGeoid(final_geoid);
          logClickToGA(
            e.target,
            "region_selected--" + getNamefromPosition($searchingPosition).replace(" ", "_")
          );
        }}>Add</button
      >
    </div>
  </div>
</div>

<style>
  .search-popup-background {
    height: 100%;
    z-index: 10;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
  }

  .search-popup {
    background-color: var(--color-white);
    border: 1px solid var(--color-gray);
    padding: 42px 35px;
    height: 285px;
    width: 360px;
    transition: 300ms ease-in-out;
    position: relative;
    top: calc(50% - 140px);
    left: calc(50% - 180px);
  }

  .search-container {
    width: 100%;
    margin-top: 10px;
  }

  .search-button-container {
    width: 100%;
    display: flex;
    width: 100%;
    margin-top: 10px;
  }

  .selected {
    border: 3px solid var(--color-blue);
  }

  .go-btn {
    width: 165px;
    height: 40px;
    background-color: var(--color-blue);
    color: var(--color-white);
    margin: 0 auto;
    cursor: pointer;
    border: none;
  }

  .go-btn:hover {
    background-color: var(--color-blue-shade-darker);
  }

  :global(.dropdown-select),
  :global(.dropdown-container) {
    width: 100% !important;
  }
  :global([data-svelte-typeahead]) {
    width: 100%;
  }
  :global([data-svelte-typeahead] ul) {
    max-height: 250px;
    overflow-y: scroll;
  }
  :global([data-svelte-typeahead] mark) {
    background-color: var(--color-yellow);
  }
  :global(.dropdown-select) {
    max-height: 250px;
  }
  :global([data-svelte-typeahead] input) {
    color: var(--color-black);
  }

  .remove-me {
    position: absolute;
    cursor: pointer;
    z-index: 4;
    top: 15px;
    right: 15px;
    padding: 5px 7px;
    border: 1px solid transparent;
    background-color: transparent;
    transition: 300ms ease-in-out;
  }
  .remove-me:hover {
    border: 1px solid var(--color-gray);
  }
</style>
