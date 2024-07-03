import { writable, readable, derived } from "svelte/store";

//are we showing US data on all charts?
export const showingUSLine = writable(false);

//are we showing amount or share on main chart?
export const isMainChartMagnitude = writable(false);

//gets variable name related to the above bool for line chart
export let main_metric = derived(isMainChartMagnitude, ($isMainChartMagnitude) => {
  return $isMainChartMagnitude ? "amount_debt_all" : "share_debt_all";
});

//which metrics are selected by toggle (must uncheck one to check new)
export let selected_minor_metrics = writable(["hospital_density", "closes_merges"]);

//all meta data for each metric
//includes metric var name, its chart title, its sentence-case label, latest year of data (not used), and its format
export let metric_meta_data = readable([
  {
    metric: "share_debt_all",
    chart_title: "Share with Medical Debt in Collections",
    label: "Share with medical<br>debt in collections",
    no_breaks_label: "Share with medical debt in collections",
    latest_year: 2023,
    format: new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 1 })
  },
  {
    metric: "amount_debt_all",
    chart_title: "Median Medical Debt in Collections",
    label: "Median medical<br>debt in collections",
    no_breaks_label: "Median medical debt in collections",
    latest_year: 2023,
    format: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    })
  },
  {
    metric: "uninsured",
    chart_title: "Uninsured",
    label: "Uninsured",
    no_breaks_label: "Uninsured",
    latest_year: 2022,
    format: new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 1 })
  },
  {
    metric: "hh_income",
    chart_title: "Average Household Income",
    label: "Average<br>household income",
    no_breaks_label: "Average household income",
    latest_year: 2022,
    format: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    })
  },
  {
    metric: "share_disabled",
    chart_title: "Disabled Adults",
    label: "Disabled adults",
    no_breaks_label: "Disabled adults",
    latest_year: 2022,
    format: new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 1 })
  },
  {
    metric: "closes_merges",
    chart_title: "Hospital Closures and Mergers",
    label: "Hospital closures<br>and mergers",
    no_breaks_label: "Hospital closures and mergers",
    latest_year: 2020,
    format: new Intl.NumberFormat("en-US")
  },
  {
    metric: "hospital_density",
    chart_title: "Hospital Market Concentration",
    label: "Hospital market<br>concentration (HHI)",
    no_breaks_label: "Hospital market concentration (HHI)",
    latest_year: 2022,
    format: new Intl.NumberFormat("en-US", { maximumSignificantDigits: 3 })
  },
  {
    metric: "share_debt_poc",
    label: "",
    latest_year: 2023,
    format: new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 1 })
  },
  {
    metric: "share_debt_white",
    label: "",
    latest_year: 2023,
    format: new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 1 })
  },
  {
    metric: "amount_debt_poc",
    label: "",
    latest_year: 2023,
    format: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    })
  },
  {
    metric: "amount_debt_white",
    label: "",
    latest_year: 2023,
    format: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    })
  }
]);

//for dropdown in sidebarMostRecentData.
//controls what year of data is shown in sidebar
export const yearsLabelsObj = [
  { value: "2011", label: "2011 data" },
  { value: "2012", label: "2012 data" },
  { value: "2013", label: "2013 data" },
  { value: "2014", label: "2014 data" },
  { value: "2015", label: "2015 data" },
  { value: "2016", label: "2016 data" },
  { value: "2017", label: "2017 data" },
  { value: "2018", label: "2018 data" },
  { value: "2019", label: "2019 data" },
  { value: "2020", label: "2020 data" },
  { value: "2021", label: "2021 data" },
  { value: "2022", label: "2022 data" },
  { value: "2023", label: "2023 data" }
].reverse();

//what year is currently in use? set by chart dot click as well as dropdown
export let selected_year = writable("2022");
