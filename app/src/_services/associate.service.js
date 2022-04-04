export const associateService = {
  getAllAssociates,
};

/**
 * @returns {Promise<any>}
 */
function getAllAssociates() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const API_URL = process.env.REACT_APP_API_URL;

  console.log(process.env);

  const url = new URL(`${API_URL}/external/associate/`);
  url.searchParams.append('apikey', process.env.REACT_APP_API_KEY);
  url.searchParams.append(
    'projection',
    'name,imei,latitude,longitude,engineStatus,heading'
  );

  return fetch(`${url.toString()}&&$filter=(pState eq 1)`, requestOptions)
    .then((res) => res.json())
    .then((res) => {
      return res?.data;
    });
}
