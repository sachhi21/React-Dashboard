import Select from 'react-select';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { filterConstatns } from '../../constants/filterConstants';
import { FilterData } from '../hook/filterdataHook';
import * as _ from 'lodash';
import { ChartDataKey } from '../../constants/chartDatakey';
import { useState } from 'react';

export const LikelihoodSource = () => {
  const [selectedFilter, setSelectedFilter] = useState();
  const { dbdata, filterData } = FilterData(selectedFilter);
  const groupByCountry = _.groupBy(dbdata, filterConstatns.COUNTRY);

  const options = _.map(_.keys(groupByCountry), (country) => ({
    value: country,
    label: country,
  }));
  const handlerFilterSelect = (key, value) => {
    setSelectedFilter({ key: key, value: value });
  };
  const styles = {
    container: (base) => ({
      ...base,
      flex: 1,
      widht: '100%',
    }),
  };
  const averageFilterData = _.map(
    _.groupBy(filterData, ChartDataKey.END_YEAR),
    (o, index) => {
      return {
        end_year: index,
        intensity: _.meanBy(o, ChartDataKey.INTENSITY).toFixed(2),
        relevance: _.meanBy(o, ChartDataKey.RELEVANCE).toFixed(2),
        likelihood: _.meanBy(o, ChartDataKey.LIKELIHOOD).toFixed(2),
      };
    }
  );
  return (
    <>
      <div width="100%">
        <div className=" -1 ml-5 d-flex flex-row justify-content-center">
          <div className="m-1 p-1">
            <b>COUNTRY Vs. END YEAR Graph</b>
          </div>
          <div className="m-1">
            <Select
              styles={styles}
              placeholder="Select the Country"
              options={options}
              onChange={(e) =>
                handlerFilterSelect(filterConstatns.COUNTRY, e.value)
              }
            />
          </div>
        </div>

        <ResponsiveContainer width="100%" height={340}>
          <LineChart
            width={300}
            height={500}
            data={averageFilterData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <Legend />
            <XAxis dataKey={ChartDataKey.END_YEAR} />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={ChartDataKey.INTENSITY}
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey={ChartDataKey.RELEVANCE}
              stroke="red"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey={ChartDataKey.LIKELIHOOD}
              activeDot={{ r: 8 }}
              stroke="#82ca9d"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
