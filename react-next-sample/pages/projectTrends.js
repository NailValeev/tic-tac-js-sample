import Layout from '../components/MyLayout.js'
import Chart from 'react-google-charts'
const APIConsumer = require('tic-tac-js-sdk')
const consumer = new APIConsumer(process.env.API_TOKEN)

const ProjectTrends = (props) => (
  <Layout>
    <h2>Project trends, billed hours 2018</h2>
    <h3 className="errorMsg">{props.errors[0]}</h3>
    <Chart
      width={'1000px'}
      height={'600px'}
      chartType='LineChart'
      loader={<div>Loading Chart</div>}
      data={props.trends}
      options={{
        // Use the same chart area width as the control for axis alignment.
        chartArea: { height: '80%', width: '90%' },
        hAxis: { slantedText: false },
        vAxis: { viewWindow: { min: 0, max: 1000 } },
        legend: { position: 'none' },
        title: 'Total billable hours, 2018 January - 2018 December',
      }}
      chartPackages={['corechart', 'controls']}
      controls={[
        {
          controlType: 'ChartRangeFilter',
          options: {
            filterColumnIndex: 0,
            ui: {
              chartType: 'LineChart',
              chartOptions: {
                chartArea: { width: '90%', height: '50%' },
                hAxis: { baselineColor: 'none' }
              }
            }
          },
          controlPosition: 'bottom',
          controlWrapperParams: {
            state: {
              range: { start: 3, end: 9 }
            }
          }
        }
      ]}
    />
  </Layout>
)

ProjectTrends.getInitialProps = async function () {
  /**
   * Gets the total reported time from period specified by given parameter set
   *
   * @param {string[]} period specified by start / end dates
   * @return {number} total reported time from period specified by given parameter set
   */

  let getTotal = async function (period) {
    let sum = 0
    try {
      const response = await consumer.getProjectReports(String(period[0]), String(period[1]))
      const data = response.TimeSumPerProject.row
      data.map(project => { sum += Number(project.time) })
      return sum
    } catch (error) {
      return null
    }
  }
  try {
    let periods = [
      ['2018-01-01', '2018-01-31'],
      ['2018-02-01', '2018-02-28'],
      ['2018-03-01', '2018-03-31'],
      ['2018-04-01', '2018-04-30'],
      ['2018-05-01', '2018-05-31'],
      ['2018-06-01', '2018-06-30'],
      ['2018-07-01', '2018-07-31'],
      ['2018-08-01', '2018-08-31'],
      ['2018-09-01', '2018-09-30'],
      ['2018-10-01', '2018-10-31'],
      ['2018-11-01', '2018-11-30'],
      ['2018-12-01', '2018-12-31']
    ]

    let promises = []

    // Collect promises.
    periods.forEach(async period => {
      promises.push(getTotal(period))
    })

    // Wait for the promises to resolve (or reject) to total sums.
    const totals = await Promise.all(promises)

    const trends = [['Date', 'Billed time total']]
    totals.map((total, index) => trends.push([(index + 1), Number(total)]))

    return { trends: trends, errors: [''] }
  } catch (error) {
    console.error(error)
    return { trends: [], errors : ['Something goes wrong. ' + error]}
  }
}

export default ProjectTrends
