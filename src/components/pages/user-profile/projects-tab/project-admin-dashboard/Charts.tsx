/* eslint-disable no-unused-vars */
import { Center } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

export enum curveEnum {
  SMOOTH = 'smooth',
  STRAIGHT = 'straight',
  STEPLINE = 'stepline',
}

export enum xaxisType {
  CATEGORY = 'category',
  DATETIME = 'datetime',
  NUMERIC = 'numeric',
}

type propsType = {
  lastSixMonths: {
    xp: number;
    monthYear: string;
  }[];
  graphColor: string[];
};

type ChartDataType = {
  series: {
    name: string;
    data: number[][];
  }[];
  options: any; // replace 'any' with your options type
};

export const FundingChart = ({ data }: { data: any[] }) => {
  const [chartData, setChartData] = React.useState<ChartDataType>({
    series: [],
    options: {
      grid: { show: false },
      chart: {
        height: 100,
        width: 520,
        toolbar: {
          show: false,
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
          },
        },
      },
      stroke: {
        colors: ['#1CEB68'],
        curve: curveEnum.SMOOTH,
        width: 2,
      },
      fill: {
        colors: ['#1CEB68'],
        type: 'gradient',
        gradient: {
          shade: 'dark',
          shadeIntensity: 1,
          opacityFrom: 0,
          opacityTo: 0.3,
          stops: [0, 90, 100],
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        show: false,
        axisTicks: {
          show: false,
        },
        tooltip: {
          enabled: true,
        },
        crosshairs: {
          show: true,
        },
        labels: {
          show: false,
          datetimeUTC: true,
          datetimeFormatter: {
            year: 'yyyy',
            month: "MMM 'yy",
            day: 'dd MMM',
            hour: 'HH:mm',
          },
        },
        type: xaxisType.DATETIME,
      },
      yaxis: {
        show: false,
        labels: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
        theme: 'dark',
        custom: function ({ series, seriesIndex, dataPointIndex }: any) {
          return (
            '<div class="arrow_box">' +
            '<span style="background-color: white; color: black; padding: 10px;">' +
            'Donation: ' +
            series[seriesIndex][dataPointIndex] +
            '$' +
            '</span>' +
            '</div>'
          );
        },
        style: {
          fontSize: '12px',
          shadow: '0px',
        },
        x: {
          show: false,
          format: 'dd MMM yyyy',
        },
        y: {
          show: false,
          formatter: function (
            value: any,
            { series, seriesIndex, dataPointIndex, w }: any
          ) {
            return value;
          },
        },
        marker: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 1200,
          options: {
            chart: {
              width: '420px',
              height: '100%',
            },
          },
        },
        {
          breakpoint: 992,
          options: {
            chart: {
              height: '100%',
              width: '720px',
            },
          },
        },
        {
          breakpoint: 768,
          options: {
            chart: {
              height: '100%',
              width: '400px',
            },
          },
        },
        {
          breakpoint: 600,
          options: {
            chart: {
              height: '100%',
              width: '360px',
            },
          },
        },
        {
          breakpoint: 480,
          options: {
            chart: {
              height: '100%',
              width: '320px',
            },
          },
        },
      ],
    },
  });

  const generateDateRange = (start: Date, end: Date): Date[] => {
    let currentDate = start;
    const dates = [];

    while (currentDate <= end) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const distributeData = () => {
    const contributionsByDate = data.reduce((acc, curr) => {
      const date = new Date(curr.createdAt);
      const formattedDate = Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate()
      );

      if (acc[formattedDate]) {
        acc[formattedDate] += curr.currentTotal;
      } else {
        acc[formattedDate] = curr.currentTotal;
      }
      return acc;
    }, {});

    const sortedData = Object.entries(contributionsByDate).map(
      ([date, total]) => ({
        date: Number(date),
        total,
      })
    );

    sortedData.sort((a, b) => a.date - b.date);

    const endDate = new Date();
    endDate.setUTCHours(23, 59, 59, 999); // set the time to end of the day
    const startDate = new Date();
    startDate.setUTCDate(endDate.getUTCDate() - 15);
    const dateRange = generateDateRange(startDate, endDate);

    const dataMap = new Map();
    sortedData.forEach((item) =>
      dataMap.set(new Date(item.date).getTime(), item.total)
    );

    const finalData = dateRange.map((date) => {
      const time = date.getTime();
      return [time, dataMap.get(time) || 0];
    });
    console.log('final data - ', finalData);
    setChartData((prevState) => ({
      ...prevState,
      series: [{ name: 'Donations', data: finalData }],
    }));
  };

  useEffect(() => {
    if (data) {
      console.log('date data - ', data);
      distributeData();
    }
  }, [data]);

  return (
    <Center w={'full'}>
      {typeof window !== 'undefined' ? (
        <ReactApexChart
          type="area"
          width={'520px'}
          height="80rem"
          options={chartData.options}
          series={chartData.series}
        />
      ) : null}
    </Center>
  );
};

export const VisitorsChart = () => {
  const [chartData, setChartData] = React.useState({
    options: {
      grid: { show: false },
      chart: {
        stacked: true,
        sparkline: {
          enabled: true,
        },
        height: '100%',
        width: '100%',
        toolbar: {
          show: false,
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
          },
        },
      },
      tooltip: {
        theme: 'dark',
      },
      plotOptions: {
        bar: {
          borderRadius: 2.5,
          columnWidth: '90%',
          endingShape: 'rounded',
        },
      },
      xaxis: {
        show: false,
        axisTicks: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
        crosshairs: {
          show: false,
        },
        categories: [
          new Date('2023-03-01 00:00:01').getTime(),
          new Date('2023-03-02 00:00:01').getTime(),
          new Date('2023-03-03 00:00:01').getTime(),
          new Date('2023-03-04 00:00:01').getTime(),
          new Date('2023-03-05 00:00:01').getTime(),
          new Date('2023-03-06 00:00:01').getTime(),
          new Date('2023-03-07 00:00:01').getTime(),
          new Date('2023-03-08 00:00:01').getTime(),
          new Date('2023-03-09 00:00:01').getTime(),
          new Date('2023-03-10 00:00:01').getTime(),
          new Date('2023-03-11 00:00:01').getTime(),
          new Date('2023-03-12 00:00:01').getTime(),
          new Date('2023-03-13 00:00:01').getTime(),
          new Date('2023-03-14 00:00:01').getTime(),
          new Date('2023-03-15 00:00:01').getTime(),
        ],
        labels: {
          show: false,
          datetimeUTC: true,
          datetimeFormatter: {
            year: 'yyyy',
            month: "MMM 'yy",
            day: 'dd MMM',
            hour: 'HH:mm',
          },
        },
        type: xaxisType.DATETIME,
      },
      yaxis: {
        show: false,
        labels: {
          show: false,
        },
      },
      colors: ['#1CEB68', '#D6FFE5'],
      responsive: [
        {
          breakpoint: 1200,
          options: {
            chart: {
              width: '420px',
              height: '100%',
            },
          },
        },
        {
          breakpoint: 992,
          options: {
            chart: {
              height: '100%',
              width: '720px',
            },
          },
        },
        {
          breakpoint: 768,
          options: {
            chart: {
              height: '100%',
              width: '400px',
            },
          },
        },
        {
          breakpoint: 600,
          options: {
            chart: {
              height: '100%',
              width: '360px',
            },
          },
        },
        {
          breakpoint: 480,
          options: {
            chart: {
              height: '80%',
              width: '320px',
            },
          },
        },
      ],
    },

    series: [
      {
        name: 'Contributors',
        data: [13, 23, 26, 8, 13, 27, 6, 10, 6, 15, 6, 67, 22, 43, 10],
      },
      {
        name: 'Viewers',
        data: [44, 55, 41, 67, 22, 43, 0, 6, 9, 6, 6, 67, 22, 43, 1],
      },
    ],
  });

  return (
    <Center w={'full'}>
      {typeof window !== 'undefined' ? (
        <ReactApexChart
          type="bar"
          width={'560px'}
          height="80rem"
          options={chartData.options}
          series={chartData.series}
        />
      ) : null}
    </Center>
  );
};
