# The Changing Medical Debt Landscape

This apps project compares the changing debt burden for families across different states and counties in the US. There are line charts, toggles, and a share URL when region selections change.

## Project Details

The production URL is [https://apps.urban.org/features/medical-debt-over-time/](https://apps.urban.org/features/medical-debt-over-time/)

Design: Brittney Spinner

Dataviz and Development: Rachel Marconi

Writing: Wes Jenkins

## Data

The data file for this project comes directly from the research team pre-joined along Experion's FIPS denotations from 2022. These geoids do not include the newest CT planning areas, but they also don't include older Alaskan census areas that have since split.

There are seven metrics that we track. Some are directly from credit report databases, some are from hosital records, and some are ACS variables.

Use the `data_crunch_meddebt_may24_data.Rmd` file to reform data. Data comes to us with one record per geography per year with metrics as column data, and this file changes that so that we have one record per geography per metric with years as column data -- the format for one record per line on a chart.

Here are the translations for shortened metric names as used in the tool from cleaned columns from the research team:

| Tool variable name | Researcher cleaned column name                               | Years       | Source                                  | 
| ------------------ | ------------------------------------------------------------ | ----------- | --------------------------------------- |
| share_debt_all     | share_with_medical_debt_in_collections                       | 2011 - 2023 | Urban Institute credit bureau data      |
| amount_debt_all    | median_medical_debt_in_collections_in_2023                   | 2011 - 2023 | Urban Institute credit bureau data      |
| share_debt_white   | share_with_medical_debt_in_collections_majority_white        | 2011 - 2023 | Urban Institute credit bureau data      |
| amount_debt_white  | median_medical_debt_in_collections_in_2023_majority_white    | 2011 - 2023 | Urban Institute credit bureau data      |
| share_debt_poc     | share_with_medical_debt_in_collections_majority_of_color     | 2011 - 2023 | Urban Institute credit bureau data      |
| amount_debt_poc    | median_medical_debt_in_collections_in_2023_majority_of_color | 2011 - 2023 | Urban Institute credit bureau data      |
| hospital_density   | hospital_market_concentration_hhi                            | 2011 - 2022 | American Hospital Association           |
| closes_merges      | number_of_closures_and_mergers                               | 2011 - 2022 | CMS provider of service                 |
| uninsured          | share_of_the_population_with_no_health_insurance_coverage    | 2011 - 2022 | ACS: counties: 5-year, state+US, 1-year |
| share_disabled     | share_of_non_elderly_adults_with_a_reported_disability       | 2011 - 2022 | ACS: counties: 5-year, state+US, 1-year |
| hh_income          | average_household_income_in_2023                             | 2011 - 2022 | ACS: counties: 5-year, state+US, 1-year |

## Page Layout

The entry point to this project is `+page.svelte`. It holds only top level components: a navbar, the introduction block, the main tool area, the highlights block, and the footer.

### Components

Components are organized by purpose.

#### Top Level Blocks

`MedicalDebtToolArea` is the meatiest module. It holds the tool title, the `RegionSelector` and `SearchPopup` modules, a regions reset button. Then it holds the main chart, its toggles for amount and share, and its notes, followed by `CollapsingSection`s for the sidebar on mobile. Then it holds the other two minor charts, or `NoChart` blocks if not two metric toggles are set. The `Sidebar` module goes in last (flexes to the left) for tab order reasons.

The `IntroductionBlock` holds the intro text and a static state map of share of households with medical debt in collections, plus its legend -- and this map goes away on mobile to shorten vertical space.

The `CheckOutMore` block holds the four highlighted regions of interest with policy implications. On mobile, the four spots turn into a carousel.

The `Footer` holds Aout the Data and Project Credit sections.

#### Charts

`MultiLine` is adapted from the LayerCake version to add dots, hover capability, and `na` sections.

`Lollipop` is a new chart type based lightly on `MulitiLine`, except the lines go down to the x axis rather than across, connected.

`AxisX` and `AxisY` are also adapted to use Urban style chunks.

`AnnotationX` is new and displays a vertical, dotted, hoverable line, numbered at the top for a notes section (which lives in `MedicalDebtToolArea`).

Hover capabilities for `AnnotationX`, `MultiLine`, and `Lollipop` are controlled by their wrapper component, `LineChartBlock`.

`NoChart` is what is displayed when not two metrics are chosen via toggle.

#### Region Selection

There are three `RegionSelector` modules at the top of the tool area. Each one is closely tied to its position.

`SearchPopup` appears over top of these modules and knows which position it's tied to. Users can use either of three levels to pick a region: an overall search, a state dropdown, and a county dropdown which only populates when state is set. Regions are removed from the lists when they are already set on other `RegionSelector`s.

#### Sidebar

This layout changes with a mobile version. `Sidebar` itself shows on desktop, and includes `SidebarMostRecentData` at the top and `SidebarMetrics` at the bottom, plus the Show US toggle by itself in the middle. On mobile, the Show US toggle is absorbed with the main tool area Amount and Share toggles into `SidebarFilters`, and that is held with the other two sidebar modules in three `CollapsingSection`s on mobile, right after the main chart.

#### Smallest Atoms

`Popup` is used for the explainers for labels in the sidebar.

`Toggle` is adapted lightly from the `dataviz-components` version as full control of the active state is needed for groups.

### Stores

There are two stores used in this tool.

`geographies.js`: This store holds onto all data coming from the data file, plus geoids and colors that are selected. There are lookup functions and set/manipulate functions for data.

`line-chart-control.js`: This store holds booleans related to charts and active metrics, plus metric meta data.

## Updating

To update the tool, run new data through the Rmd script, then copy the output (with a new date) into the static folder. Update the data file name in `+page`. Update the two stores `list_of_years` and `yearsLabelsObj` for the year dropdown and data manipulation to give to `MultiLine` and `Lollipop`. Look through `LineChartBlock` for year-specific exclusions for axes labels and spacing. Make sure to change `xDomain` on the LayerCake element.
