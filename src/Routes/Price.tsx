import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinTickers } from "../api";
import styled from "styled-components";

const TablePrice = styled.table`
  font-size: 18px;
  td {
    padding: 8px 18px;
  }
`;
const TableContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.cardBgColor};
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.05), 3px 3px 3px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  border: 1px solid white;
`;

type IParam = {
  coinId: string | undefined;
};
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Price() {
  const { coinId } = useOutletContext<IParam>();
  const { isLoading, data } = useQuery<PriceData>(["tickers", coinId], () =>
    fetchCoinTickers(coinId)
  );
  const priceData = data?.quotes.USD;
  //
  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <TableContainer>
          <TablePrice>
            <tr>
              <td>ath_price :</td>
              <td>${priceData?.ath_price?.toFixed(2)}</td>
            </tr>
            <tr>
              <td>ath_date :</td>
              <td>{priceData?.ath_date.split("T")[0]}</td>
            </tr>
            <tr>
              <td>market_cap :</td>
              <td>{priceData?.market_cap}</td>
            </tr>
            <tr>
              <td>ath_volume_24h :</td>
              <td>{priceData?.volume_24h.toFixed(2)}</td>
            </tr>
          </TablePrice>
        </TableContainer>
      )}
    </>
  );
}

export default Price;
