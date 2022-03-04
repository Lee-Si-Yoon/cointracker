import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import styled from "styled-components";

const ChartContainer = styled.div`
  padding: 30px 0 0 0;
  background-color: ${(props) => props.theme.cardBgColor};
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.05), 3px 3px 3px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  border: 1px solid white;
  p {
    text-align: right;
    padding: 0 15px 0 0;
    color: ${(props) => props.theme.accentColor};
  }
`;

type IParam = {
  coinId: string | undefined;
};
interface IHistoricalData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart() {
  const { coinId } = useOutletContext<IParam>();
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ChartContainer>
          <p>2weeks</p>
          <ApexChart
            type="candlestick"
            series={[
              {
                data: data?.map((price) => {
                  return {
                    x: price.time_close.slice(2, 10),
                    y: [
                      price.open.toFixed(2),
                      price.high.toFixed(2),
                      price.low.toFixed(2),
                      price.close.toFixed(2),
                    ],
                  };
                }),
              },
            ]}
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
              },
              chart: {
                background: "transparent",
                toolbar: {
                  show: false,
                },
              },
              grid: {
                show: false,
              },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: true },
                labels: { show: false },
              },
              yaxis: { show: false },
            }}
          ></ApexChart>
        </ChartContainer>
      )}
    </div>
  );
}

export default Chart;
