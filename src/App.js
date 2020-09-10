import React from "react";
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
  EuiFieldSearch,
  EuiFlexItem,
  EuiButtonIcon,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
} from "@elastic/eui";

import { KIBANA_METRICS } from "./utils/raw_data";

const dateFormatter = timeFormatter(niceTimeFormatByDay(1));

function App() {
  const [isClearable] = React.useState(true);
  const [value, setValue] = React.useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

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
                size="l"
                iconType="logoGithub"
                onClick={() => window.alert("Button clicked")}
              />
            </EuiFlexItem>
          </EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiPageContent>
          <EuiPageContentHeader>
            <EuiFieldSearch
              placeholder="Search this"
              value={value}
              onChange={(e) => onChange(e)}
              isClearable={isClearable}
              fullWidth={true}
              aria-label="Use aria labels when no actual label is in use"
            />
          </EuiPageContentHeader>
          <EuiPageContentBody className="chart-body">
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
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
}

export default App;
