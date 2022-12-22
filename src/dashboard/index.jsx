import { useEffect, useState } from 'react';
import { ChartDataKey } from '../constants/chartDatakey';
import { filterConstatns } from '../constants/filterConstants';
import { IntesityBar } from './component/intensityBar';
import { LikelihoodSource } from './component/likelihoodSource';

export const Dashboard = () => {
  console.log('*******************************');
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch('get-data')
      .then((response) => response.json())
      .then((data) => console.log(data));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);
  return (
    <>
      {/* <h1>
        <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#Dashboard">
          DASHBOARD
        </a>
      </h1>

      <nav class="navbar navbar-dark fixed-top bg-primary flex-md-nowrap p-0 shadow"></nav>

      <div className="container border text-center">
        <div className="row m-2">
          <div className="col shadow border-right- m-2 ">
            <IntesityBar
              dataKeyValue={{
                dataKey: ChartDataKey.TOPIC,
                filterOptions: filterConstatns.COUNTRY,
              }}
            />
          </div>
          <div className="col shadow  m-2">
            <IntesityBar
              dataKeyValue={{
                dataKey: ChartDataKey.COUNTRY,
                filterOptions: filterConstatns.COUNTRY,
              }}
            />
          </div>
        </div>
        <hr />
        <div className="row m-2">
          <div className="col shadow  m-2">
            <IntesityBar
              dataKeyValue={{
                dataKey: ChartDataKey.SECTOR,
                filterOptions: filterConstatns.COUNTRY,
              }}
            />
          </div>
          <div className="col shadow  m-2">
            <IntesityBar
              dataKeyValue={{
                dataKey: ChartDataKey.PESTLE,
                filterOptions: filterConstatns.COUNTRY,
              }}
            />
          </div>
        </div>
        <hr />
        <div className="row m-2">
          <div className="col shadow  m-2">
            <IntesityBar
              dataKeyValue={{
                dataKey: ChartDataKey.REGION,
                filterOptions: filterConstatns.COUNTRY,
              }}
            />
          </div>
          <div className="col shadow  m-2">
            <LikelihoodSource />
          </div>
        </div>
      </div> */}
    </>
  );
};
