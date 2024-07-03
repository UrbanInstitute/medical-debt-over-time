<script>
  import "@urbaninstitute/dataviz-components/style";
  import { Meta, Navbar } from "@urbaninstitute/dataviz-components";
  import "../app.css";
  import { getAbsoluteUrl } from "$lib/utils/urls.js";
  import IntroductionBlock from "$components/top-level-blocks/IntroductionBlock.svelte";
  import MedicalDebtToolArea from "$components/top-level-blocks/MedicalDebtToolArea.svelte";
  import CheckOutMoreBlock from "$components/top-level-blocks/CheckOutMoreBlock.svelte";
  import {
    allData,
    data_loaded,
    geographies,
    getNamefromPosition,
    national_data,
    searchingPosition,
    selected_position,
    updateGeo
  } from "../stores/geographies";
  import { showingUSLine } from "../stores/line-chart-control";
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import { get } from "svelte/store";

  import { onNavigate } from "$app/navigation";
  import Footer from "$components/top-level-blocks/Footer.svelte";

  // import `pymChild` if this project will be embedded in another site with Pym.js
  // import { pymChild } from "$lib/utils/pym.js";

  console.log("👋 Welcome to DataViz@URBAN!");

  onMount(async () => {
    //grab data from file and manipulate it into geographies
    // CHANGE FILE NAME HERE WHEN THERE'S NEW DATA
    let data = await d3
      .csv("./county_state_nat_all_metrics_merge_062724.csv")
      .then((data) => {
        allData.set(data);

        let all = [];
        for (let datapoint of data) {
          //dedupe way of filtering
          if (!all.some((d) => d.value == datapoint.fips && d.label == datapoint.full_name)) {
            all.push({ value: datapoint.fips, label: datapoint.full_name });
          }
        }
        //console.log(all)

        let states = all
          .filter((d) => d.value.length == 2 && d.value != "00")
          .map(({ value, label }) => ({ value, label }));
        for (let state of states) {
          let counties = all
            .filter((d) => d.value.substring(0, 2) == state.value && d.value.length > 2)
            .map(({ value, label }) => ({ value, label }));
          state["counties"] = counties;
        }

        geographies.set({ all, states });
        national_data.set(get(allData).filter((d) => d.fips == "00"));
        showingUSLine.set(true);
      })
      .then(() => {
        //grab search params and grab those regions
        let myUrl = new URL(window.location.href);
        //going backwards so first item with data is selected for sidebar
        if (myUrl.searchParams.has("r2")) {
          updateGeo(2, myUrl.searchParams.get("r2"));
          selected_position.set(2);
        }
        if (myUrl.searchParams.has("r1")) {
          updateGeo(1, myUrl.searchParams.get("r1"));
          selected_position.set(1);
        }
        if (myUrl.searchParams.has("r0")) {
          updateGeo(0, myUrl.searchParams.get("r0"));
          selected_position.set(0);
        }
      })
      .then(() => {
        data_loaded.set(true);
      });
  });

  onNavigate(() => {
    //grab search params and grab those regions
    let myUrl = new URL(window.location.href);

    //going backwards so first item with data is selected for sidebar
    if (myUrl.searchParams.has("r2")) {
      updateGeo(2, myUrl.searchParams.get("r2"));
      selected_position.set(2);
    } else {
      updateGeo(2, "999999");
    }

    if (myUrl.searchParams.has("r1")) {
      updateGeo(1, myUrl.searchParams.get("r1"));
      selected_position.set(1);
    } else {
      updateGeo(1, "999999");
    }

    if (myUrl.searchParams.has("r0")) {
      updateGeo(0, myUrl.searchParams.get("r0"));
      selected_position.set(0);
    } else {
      updateGeo(0, "999999");
    }

    if ($searchingPosition != 0 && getNamefromPosition($searchingPosition) != "") {
      selected_position.set($searchingPosition);
    }
  });
</script>

<Meta
  title="The Changing Medical Debt Landscape in the United States"
  description="Medical debt is the most common form of debt in collections in the United States, but recent changes from the major credit bureaus have reduced the share of Americans with medical debt in collections reported in their credit files."
  publishDate="2024-07-10"
  socialImage={getAbsoluteUrl("social.png")}
/>

<Navbar title={"The Changing Medical Debt Landscape in the United States"} />
<IntroductionBlock />
<MedicalDebtToolArea />
<CheckOutMoreBlock />
<Footer />

<style>
</style>
