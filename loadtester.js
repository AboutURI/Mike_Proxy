import http from 'k6/http';
import { check, sleep } from 'k6';
import { jUnit, textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export let options = {
  stages: [
    { duration: '30s', target: 1250 }
    // { duration: '30s', target: 4300 },
    // { duration: '30s', target: 4600 },
    // { duration: '30s', target: 4900 },
    // { duration: '30s', target: 5200 },
  ],
};

export default function () {
  // let res = http.get('http://localhost:6012/');
  // let res = http.get('http://admin:password@localhost:5984/sidebar/0')
  // let res = http.get('http://ec2-18-144-63-186.us-west-1.compute.amazonaws.com:6012')
  let res = http.get('http://ec2-13-57-225-97.us-west-1.compute.amazonaws.com:3004/sidebar?courseId=4736376')
  // console.log(JSON.stringify(res.body));
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}

// export function handleSummary(data) {
//   console.log('Preparing the end-of-test summary...');

//   // Send the results to some remote server or trigger a hook
//   // let resp = http.post('https://httpbin.test.k6.io/anything', JSON.stringify(data));
//   // if (resp.status != 200) {
//   //     console.error('Could not send summary, got status ' + resp.status);
//   // }

//   return {
//       'stdout': textSummary(data, { indent: ' ', enableColors: true}), // Show the text summary to stdout...
//       '/Users/michaelgallien/HackReactor/SDC/Sidebar_Proxy/udemy-proxy-carinij/junit.xml': jUnit(data), // but also transform it and save it as a JUnit XML...
//       '/Users/michaelgallien/HackReactor/SDC/Sidebar_Proxy/udemy-proxy-carinij/summary.json': JSON.stringify(data), // and a JSON with all the details...
//       'raw-data.json': JSON.stringify(data)
//       // And any other JS transformation of the data you can think of,
//       // you can write your own JS helpers to transform the summary data however you like!
//   }
// }