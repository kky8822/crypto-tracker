import { useQuery } from "react-query";
import { fetchCoinMonthHistory, fetchCoinYearHistory } from "../api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

interface IChart {
  coinId: string;
}

interface IOHLCV {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface IDaily {
  market_cap: number;
  price: number;
  timestamp: string;
  volume_24h: number;
}

interface IChartBox {
  isDark: boolean;
  isLoading: boolean;
  data: IDaily[] | undefined;
}

function ChartBox({ isDark, isLoading, data }: IChartBox) {
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => price.price) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 5,
            },
            yaxis: { show: false },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
              type: "datetime",
              categories: data?.map((price) => price.timestamp) ?? [],
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#4cd137"],
                stops: [0, 100],
              },
            },
            colors: ["#00a8ff"],
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(3)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

function ChartMonth({ coinId }: IChart) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IDaily[]>(["ohlcv_month", coinId], () =>
    fetchCoinMonthHistory(coinId)
  );

  console.log("month", data);

  return ChartBox({ isDark, isLoading, data });
}

function ChartYear({ coinId }: IChart) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IDaily[]>(["ohlcv_year", coinId], () =>
    fetchCoinYearHistory(coinId)
  );

  console.log("year", data);

  return ChartBox({ isDark, isLoading, data });
}

function Chart({ coinId }: IChart) {
  return (
    <>
      <ChartMonth coinId={coinId} />
      <ChartYear coinId={coinId} />
    </>
  );
}

export default Chart;
