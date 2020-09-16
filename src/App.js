import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import url from "./config";

import {
  Axis,
  Chart,
  CurveType,
  LineSeries,
  Position,
  ScaleType,
  Settings,
} from "@elastic/charts";

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiComboBox,
  EuiFlexItem,
  EuiButtonIcon,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiLoadingChart,
  EuiTitle,
} from "@elastic/eui";

function App() {
  const [formElements, setFormElements] = useState({
    loading: false,
  });
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedRegion, setSelectedRegion] = useState();
  const [regionList, setRegionList] = useState();
  const [countryList, setCountryList] = useState();
  const [graphData, setGraphData] = useState({});
  const [country, setCountry] = useState(false);
  const [regions, setRegions] = useState(false);

  const onRegionChange = (region) => {
    async function fetchData() {
      setFormElements((formElements) => ({ ...formElements, loading: true }));
      if (undefined !== region && undefined !== region[0]) {
        const response = await axios.get(
          url.apiUrl +
            "graphhandler?country=" +
            selectedCountry[0].label +
            "&region=" +
            region[0].label
        );
        setGraphData(response);
      }
      setFormElements((formElements) => ({ ...formElements, loading: false }));
    }
    fetchData();
    setSelectedRegion(region);
  };

  const onCountryChange = (country) => {
    async function fetchData() {
      setRegions(true);
      setSelectedRegion();
      let regionsList = [];
      if (undefined !== country && undefined !== country[0]) {
        var response = await axios.get(
          url.apiUrl + "regionhandler?country=" + country[0].label
        );
        response.data.subregions.forEach((ele) => {
          regionsList.push({
            label: ele,
          });
        });
      }
      setRegionList(regionsList);
      setRegions(false);
    }
    fetchData();
    setSelectedCountry(country);
  };

  React.useEffect(() => {
    async function fetchData() {
      setFormElements((formElements) => ({ ...formElements, loading: true }));
      setCountry(true);
      const response = await axios.get(url.apiUrl + "countryHandler");
      let countryList = [];
      response.data.forEach((ele) => {
        countryList.push({
          label: ele,
        });
      });
      setCountryList(countryList);
      const graphData = await axios.get(
        url.apiUrl + "graphhandler?country=india&region=all"
      );
      setGraphData(graphData);
      setCountry(false);
      setFormElements((formElements) => ({ ...formElements, loading: false }));
    }
    fetchData();
  }, []);

  return (
    <EuiPage>
      <EuiPageBody component="div">
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <h1>MobilityUI</h1>
            </EuiTitle>
          </EuiPageHeaderSection>
          <EuiPageHeaderSection>
            <EuiFlexItem grow={false}>
              <EuiButtonIcon
                iconSize="xl"
                iconType="logoGithub"
                onClick={() =>
                  window.open("https://github.com/neo7337/MobilityApp")
                }
                aria-label="homepage"
              />
            </EuiFlexItem>
          </EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiPageContent>
          <EuiPageContentHeader>
            <EuiComboBox
              placeholder="Select Country"
              fullWidth={true}
              singleSelection={{ asPlainText: true }}
              options={countryList}
              selectedOptions={selectedCountry}
              onChange={onCountryChange}
              isLoading={country}
            />
          </EuiPageContentHeader>
          <EuiPageContentHeader>
            <EuiComboBox
              placeholder="Select Subregion"
              fullWidth={true}
              singleSelection={{ asPlainText: true }}
              options={regionList}
              selectedOptions={selectedRegion}
              onChange={onRegionChange}
              isLoading={regions}
            />
          </EuiPageContentHeader>
          {formElements.loading && (
            <EuiPageContentBody className="loading-chart">
              <EuiLoadingChart size="xl" />
            </EuiPageContentBody>
          )}
          {!formElements.loading && (
            <EuiPageContentBody className="chart-body">
              <Chart>
                <Settings
                  showLegend
                  showLegendExtra
                  legendPosition={Position.Right}
                />
                <Axis id="bottom" position={Position.Bottom} />
                <Axis
                  id="left"
                  title={
                    undefined !== graphData.data &&
                    graphData.data.subregion +
                      " (" +
                      graphData.data.country +
                      ")"
                  }
                  position={Position.Left}
                  tickFormat={(d) => `${Number(d).toFixed(0)}%`}
                />

                <LineSeries
                  id="driving"
                  xScaleType={ScaleType.Time}
                  yScaleType={ScaleType.Linear}
                  xAccessor={0}
                  yAccessors={[1]}
                  data={
                    undefined !== graphData.data &&
                    graphData.data.data.map((d) => {
                      return [d.date, d.driving];
                    })
                  }
                  curve={CurveType.CURVE_MONOTONE_X}
                />

                <LineSeries
                  id="walking"
                  xScaleType={ScaleType.Time}
                  yScaleType={ScaleType.Linear}
                  xAccessor={0}
                  yAccessors={[1]}
                  data={
                    undefined !== graphData.data &&
                    graphData.data.data.map((d) => {
                      return [d.date, d.walking];
                    })
                  }
                  curve={CurveType.CURVE_MONOTONE_X}
                />
              </Chart>
            </EuiPageContentBody>
          )}
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
}

export default App;
