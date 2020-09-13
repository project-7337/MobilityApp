import React, { useState } from "react";
import axios from "axios";
import "./App.css";

import {
  Axis,
  Chart,
  CurveType,
  LineSeries,
  niceTimeFormatByDay,
  Position,
  ScaleType,
  Settings,
  timeFormatter,
} from "@elastic/charts"

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
  EuiButtonEmpty,
  EuiTitle,
} from "@elastic/eui";

import { KIBANA_METRICS } from "./utils/raw_data";

const dateFormatter = timeFormatter(niceTimeFormatByDay(1));

function App() {
  const [formElements, setFormElements] = useState({
    loading: false
  });
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedRegion, setSelectedRegion] = useState();
  const [regionList, setRegionList] = useState();
  const [countryList, setCountryList] = useState();
  const [country, setCountry] = useState(false);
  const [regions, setRegions] = useState(false);

  const onRegionChange = region => {
    setSelectedRegion(region);
    setFormElements(formElements => ({...formElements, loading: true}));
    setTimeout(() => {
      setFormElements(formElements => ({...formElements, loading: false}));
    }, 2000);
  };

  const onCountryChange = country => {
    async function fetchData() {
      setRegions(true);
      let regionsList = [];
      if(undefined !== country && undefined !== country[0]) {
        var response = await axios.get(process.env.REACT_APP_RegionURL+"RegionHandler?country="+country[0].label);
        response.data.subregions.forEach((ele) => {
          regionsList.push({
            label: ele
          });
        });
      }
      setRegionList(regionsList);
      setRegions(false);
    }
    fetchData();
    setSelectedCountry(country);
  }

  React.useEffect(() => {
    async function fetchData() {
      setCountry(true);
      const response = await axios.get(process.env.REACT_APP_CountryURL+"countryHandler");
      let countryList = [];
      response.data.forEach((ele) => {
        countryList.push({
          label: ele
        });
      });
      setCountryList(countryList);
      setCountry(false);
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
                onClick={() => window.open('https://github.com/neo7337/MobilityApp')}
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
          { formElements.loading && <EuiPageContentBody>
            <EuiButtonEmpty
              onClick={() => window.alert('Button clicked')}
              isLoading
              iconSide="right">
              Loading
            </EuiButtonEmpty>
          </EuiPageContentBody>}
          { !formElements.loading && <EuiPageContentBody className="chart-body">
            <Chart>
              <Settings showLegend showLegendExtra legendPosition={Position.Right} />
              <Axis id="bottom" position={Position.Bottom} showOverlappingTicks tickFormat={dateFormatter} />
              <Axis
                id="left"
                title={KIBANA_METRICS.metrics.kibana_os_load[0].metric.title}
                position={Position.Left}
                tickFormat={(d) => `${Number(d).toFixed(0)}%`}
              />

              <LineSeries
                id="monotone x"
                xScaleType={ScaleType.Time}
                yScaleType={ScaleType.Linear}
                xAccessor={0}
                yAccessors={[1]}
                data={KIBANA_METRICS.metrics.kibana_os_load[0].data}
                curve={CurveType.CURVE_MONOTONE_X}
              />
              <LineSeries
                id="basis"
                xScaleType={ScaleType.Time}
                yScaleType={ScaleType.Linear}
                xAccessor={0}
                yAccessors={[1]}
                data={KIBANA_METRICS.metrics.kibana_os_load[0].data}
                curve={CurveType.CURVE_BASIS}
              />
              <LineSeries
                id="cardinal"
                xScaleType={ScaleType.Time}
                yScaleType={ScaleType.Linear}
                xAccessor={0}
                yAccessors={[1]}
                data={KIBANA_METRICS.metrics.kibana_os_load[0].data}
                curve={CurveType.CURVE_CARDINAL}
              />
              <LineSeries
                id="catmull rom"
                xScaleType={ScaleType.Time}
                yScaleType={ScaleType.Linear}
                xAccessor={0}
                yAccessors={[1]}
                data={KIBANA_METRICS.metrics.kibana_os_load[0].data}
                curve={CurveType.CURVE_CATMULL_ROM}
              />
              <LineSeries
                id="natural"
                xScaleType={ScaleType.Time}
                yScaleType={ScaleType.Linear}
                xAccessor={0}
                yAccessors={[1]}
                data={KIBANA_METRICS.metrics.kibana_os_load[0].data}
                curve={CurveType.CURVE_NATURAL}
              />
              <LineSeries
                id="linear"
                xScaleType={ScaleType.Time}
                yScaleType={ScaleType.Linear}
                xAccessor={0}
                yAccessors={[1]}
                data={KIBANA_METRICS.metrics.kibana_os_load[0].data}
                curve={CurveType.LINEAR}
              />
            </Chart>
          </EuiPageContentBody>}
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
}

export default App;
