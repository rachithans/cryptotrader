import * as React from 'react'
import Chartjs from 'chart.js'
import { historyOptions } from '../services/ChartConfig';

const PriceChart = ({ data }) => {
  const chartRef = React.useRef()
  const { day, week, year } = data
  const [time, setTimeFormat] = React.useState("24h");

  const TimeFormat = () => {
    if (time === "24h") {
      return day
    }
    else if (time === "7d") {
      return week
    }
    else if (time === "1Y") {
      return year
    }
  };

  React.useEffect(() => {
    if (window.MyChart != undefined) {
      window.MyChart.destroy();
    }

    if (chartRef && chartRef.current) {
      window.MyChart = new Chartjs(chartRef.current, {
        type: 'line',
        data: {

          datasets: [
            {
              label: "Price",
              data: TimeFormat(),
              backgroundColor: "rgba(44, 130, 201, 1)",
              borderWidth: 1,

            },
          ],

        },
        options: {
          ...historyOptions,
        },
      });
    }
  });

  return (

    <div className="bg-white border mt-2 rounded p-3">
      <div>
        <canvas ref={chartRef} id="myChart" width={250} height={250}></canvas>
      </div>

      <button
        onClick={() => setTimeFormat("24h")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-4 rounded"
      >
        24h
      </button>
      <button
        onClick={() => setTimeFormat("7d")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-4 rounded"
      >
        7d
      </button>
      <button
        onClick={() => setTimeFormat("1Y")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-4 rounded"
      >
        1Y
      </button>
    </div>

  )
};

export default PriceChart

