import { useState } from 'react';
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Select from 'react-select';
import * as _ from 'lodash';
import { FilterData } from '../hook/filterdataHook';
import { ChartDataKey } from '../../constants/chartDatakey';
import { upperCase } from 'lodash';

export const IntesityBar = ({ dataKeyValue }) => {
  const [selectedFilter, setSelectedFilter] = useState();
  const { dbdata, filterData } = FilterData(selectedFilter);

  const groupByCountry = _.groupBy(dbdata, dataKeyValue.dataKey);

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
    }),
  };
  const averageFilterData = _.map(
    _.groupBy(filterData, ChartDataKey.COUNTRY),
    (o, index) => {
      return {
        country: index,
        intensity: _.meanBy(o, ChartDataKey.INTENSITY).toFixed(2),
        relevance: _.meanBy(o, ChartDataKey.RELEVANCE).toFixed(2),
        likelihood: _.meanBy(o, ChartDataKey.LIKELIHOOD).toFixed(2),
      };
    }
  );
  return (
    <div width="100%" height={10}>
      <div className=" -1 ml-5 d-flex flex-row justify-content-center">
        <div className="m-1 p-1">
          <b>{upperCase(dataKeyValue.dataKey)} Graph</b>
        </div>
        <div className="m-1 ">
          <Select
            styles={styles}
            placeholder={`Select the ${dataKeyValue.dataKey} `}
            options={options}
            onChange={(e) => handlerFilterSelect(dataKeyValue.dataKey, e.value)}
          />
        </div>
      </div>
      <ResponsiveContainer width="100%" height={340}>
        <BarChart width={300} height={300} data={averageFilterData}>
          <XAxis dataKey={ChartDataKey.COUNTRY} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={ChartDataKey.INTENSITY} fill="#0E4C92" />
          <Bar dataKey={ChartDataKey.RELEVANCE} fill="#598BAF	" />
          <Bar dataKey={ChartDataKey.LIKELIHOOD} fill="#95C8D8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
