import { writable, get, derived } from "svelte/store";
import { urbanColors } from "@urbaninstitute/dataviz-components/utils";
import { goto } from "$app/navigation";

// data coming from file
export let allData = writable(null);

//lookup table for fips codes (values) to full names (labels)
export let geographies = writable(null);

//same format as one record from metric data: datapoints per metric per year for the US
export let national_data = writable(null);

//bool denoting whether data is done mounting (used in charts)
export let data_loaded = writable(false);

//holds just geoids, set by dropdown
export let first_geo = writable("999999");
export let second_geo = writable("999999");
export let third_geo = writable("999999");

//holds all data for important geoids
//updates with updateGeo function
export let geo_data = writable(new Array(3));

//for SidebarMostRecentData, what geoid is currently active
export let selected_position = writable(-1);

//controls searchPopup visibility
export let areWeSearching = writable(false);
//controls which position gets set by searchPopup
export let searchingPosition = writable(0);

//position grabs color. used in sidebarMostRecentData, tooltip, regionSelector
export let color_palette = [
  urbanColors.blue,
  urbanColors.yellow,
  urbanColors.green,
  urbanColors.black
];

//change range_of_data[1] when updating tool!
//used in getMetricData for line charts
//which needs to align to one record per year in order for all regions
let range_of_data = [2011, 2023];
let list_of_years = Array.from(
  { length: range_of_data[1] - range_of_data[0] + 1 },
  (value, index) => range_of_data[0] + index
);

// formats data for our active geographies for the requested metric
// into the format layercake needs
export function getMetricData(met, our_geo_data, us_line = false) {
  let dataToUse = our_geo_data.map((d) => d);
  if (us_line) {
    dataToUse.push(get(national_data));
  }

  let metric_data = new Map();

  //start with pre-loaded years so NA dashes show for on-load US
  for (let year of list_of_years) {
    let y = year.toString();
    metric_data.set(y, { year: y });
  }

  dataToUse.forEach((one_region, position) => {
    if (one_region) {
      let data_one = one_region.find((d) => d.metric == met);
      if (!data_one && met == "closes_merges") return;
      let { fips, full_name, metric, ...year_data } = data_one;
      let year_data_arr = Object.entries(year_data);
      for (let [year, metric_value] of year_data_arr) {
        if (metric_value != "NA" && !Number.isNaN(metric_value)) {
          if (metric_data.has(year)) {
            metric_data.get(year)["region_" + position] = metric_value;
          } else {
            let temp_obj = { year: year };
            temp_obj["region_" + position] = metric_value;
            metric_data.set(temp_obj.year, temp_obj);
          }
        }
      }
    }
  });
  return Array.from(metric_data.values()).sort((a, b) => parseInt(a.year) - parseInt(b.year));
}

//takes full name of geography, returns fips code.
//used in searchPopup for setting new geoid from dropdown
export function getFIPSfromName(name) {
  if (get(geographies).all.findIndex((d) => d.label == name) >= 0) {
    return get(geographies).all.find((d) => d.label == name).value;
  } else {
    return "999999";
  }
}

//takes position, returns full name.
//used in tooltip and analytics pushes
export function getNamefromPosition(pos) {
  if (pos == 3 || pos == -1) {
    return "US";
  }
  let myFIPS = pos == 0 ? get(first_geo) : pos == 1 ? get(second_geo) : get(third_geo);
  if (get(geographies).all.findIndex((d) => d.value == myFIPS) >= 0) {
    return get(geographies).all.find((d) => d.value == myFIPS).label;
  } else {
    return "";
  }
}

//takes new geoid, changed on dropdown, and also updates its data
export function updateGeo(ord, new_geoid) {
  switch (ord) {
    case 0:
      first_geo.set(new_geoid);
      break;
    case 1:
      second_geo.set(new_geoid);
      break;
    case 2:
      third_geo.set(new_geoid);
      break;
    default:
      first_geo.set(new_geoid);
      break;
  }
  if (new_geoid == "999999") {
    get(geo_data).splice(ord, 1, undefined);
  } else {
    get(geo_data).splice(
      ord,
      1,
      get(allData).filter((d) => d.fips == new_geoid)
    );
  }
  geo_data.set(get(geo_data));
}

//when geoids change, use this to set URL, then geoids update from onNavigate in page+
export function updateURL() {
  let params = {};
  if (get(first_geo) != "999999") {
    params["r0"] = get(first_geo);
  }
  if (get(second_geo) != "999999") {
    params["r1"] = get(second_geo);
  }
  if (get(third_geo) != "999999") {
    params["r2"] = get(third_geo);
  }
  let loc = new URLSearchParams(params).toString();

  var newurl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    "?" +
    loc +
    "#chart-area";
  goto(newurl);
}
