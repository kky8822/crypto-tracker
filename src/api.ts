const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinPrice(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinMonthHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 30 * 24 * 60 * 60;
  const interval = "1d";
  return fetch(
    // `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
    `${BASE_URL}/tickers/${coinId}/historical?start=${startDate}&end=${endDate}&interval=${interval}`
  ).then((response) => response.json());
}

export function fetchCoinYearHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 364 * 24 * 60 * 60;
  const interval = "7d";

  return fetch(
    // `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
    `${BASE_URL}/tickers/${coinId}/historical?start=${startDate}&end=${endDate}&interval=${interval}`
  ).then((response) => response.json());
}
