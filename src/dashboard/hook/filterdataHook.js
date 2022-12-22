import { useEffect, useState } from 'react';
import { axiosiInstance } from '../../axioInstance';
import { routes } from '../../constants/routeConstants';

export const FilterData = (selectedFilter) => {
  const [dbdata, setDbdata] = useState();
  const [filterData, setFilterData] = useState();

  useEffect(() => {
    const getData = async () => {
      const res = await axiosiInstance.get(routes.ALL_DATA_ROUTE);
      setDbdata(res.data);
    };
    const getFileterData = async () => {
      try {
        const res = await axiosiInstance.post(
          routes.FILTER_ROUTE,
          selectedFilter
        );
        setFilterData(res.data);
      } catch (err) {
        console.log('🚀 ~ file: index.jsx:36 ~ getFileterData ~ err', err);
      }
    };
    getData();
    getFileterData();
  }, [selectedFilter]);
  return { dbdata, filterData };
};
