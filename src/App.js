import React, { useState } from "react";
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

const options = [
  {
    label: 'Titan',
    'data-test-subj': 'titanOption',
  },
  {
    label: 'Enceladus',
  },
  {
    label: 'Mimas',
  },
  {
    label: 'Dione',
  },
  {
    label: 'Iapetus',
  },
  {
    label: 'Phoebe',
  },
  {
    label: 'Rhea',
  },
  {
    label:
      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
  },
  {
    label: 'Tethys',
  },
  {
    label: 'Hyperion',
  },
];

function App() {
  const [selectedOptions, setSelected] = useState([options[2]]);
  const [formElements, setFormElements] = useState({
    loading: false
  });

  const onChange = selectedOptions => {
    // We should only get back either 0 or 1 options.
    setSelected(selectedOptions);
    setFormElements(formElements => ({...formElements, loading: true}));
    setTimeout(() => {
      setFormElements(formElements => ({...formElements, loading: false}));
    }, 2000);
  };

  React.useEffect(() => {
    setFormElements(formElements => ({...formElements, loading: true}));
    setTimeout(() => {
      setFormElements(formElements => ({...formElements, loading: false}));
    }, 2000);
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
              />
            </EuiFlexItem>
          </EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiPageContent>
          <EuiPageContentHeader>
            <EuiComboBox
              placeholder="Select a single option"
              fullWidth="true"
              singleSelection={{ asPlainText: true }}
              options={options}
              selectedOptions={selectedOptions}
              onChange={onChange}
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
