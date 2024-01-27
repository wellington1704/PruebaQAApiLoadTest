import http from "k6/http";
import {check} from 'k6';
export const options = {
  scenarios: {
    minimun_load_scenario: {
      executor: "shared-iterations",
      vus: 100,
      iterations: 100,
      startTime: "0s",
    },
    medium_load_scenario: {
      executor: 'ramping-vus',
      startVUs: 100,
      stages: [
          { duration: '5m', target: 200 },
      ],
      startTime: "30s"
    },
    Maximum_load_scenario: {
      executor: 'ramping-vus',
      startVUs: 200,
      stages: [
          { duration: '2m', target: 200},
          {duration: '2m', target: 300},
          {duration: '1m30s', target: 400 },
      ],
      startTime: "5m30s"
      },
  },
};

export default function () {
  let response = http.get("https://sx-prueba-qa.azurewebsites.net/WeatherForecast");
  check(response, { 'status is 200': (r) => r.status === 200 });
}