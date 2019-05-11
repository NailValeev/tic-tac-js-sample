import Layout from '../components/MyLayout.js'
import Chart from 'react-google-charts'
const APIConsumer = require('tic-tac-js-sdk')
const sdk = new APIConsumer(process.env.API_TOKEN)

const UserStatistics = (props) => (
  <Layout>
    <h2>User statistics: labor effectiveness</h2>
    <p><b>Resource Utilization</b> = time spent on useful tasks / total amount of time available to work</p>
    <p><b>Billable Utilization</b> = time spent on billable tasks / total amount of time available to work</p>
    <h3 className="errorMsg">{props.errors[0]}</h3>
    <Chart
      width={'1000px'}
      height={'400px'}
      chartType='BarChart'
      loader={<div>Loading Chart</div>}
      data={props.utils}
      options={{
        title: 'Utilizations Alpha & Beta',
        chartArea: { width: '50%' },
        hAxis: {
          title: 'Utilizations, %',
          minValue: 0
        },
        vAxis: {
          title: 'Employee'
        }
      }
      }
    />

    <Chart
      width={'1000px'}
      height={'400px'}
      chartType='BarChart'
      loader={<div>Loading Chart</div>}
      data={props.total}
      options={{
        title: 'Billed time & expences',
        chartArea: { width: '50%' },
        hAxis: {
          title: 'SEK',
          minValue: 0
        },
        vAxis: {
          title: 'Employee'
        }
      }
      }
    />

    <Chart
      width={'1000px'}
      height={'400px'}
      chartType='PieChart'
      loader={<div>Loading Chart</div>}
      data={props.pie}
      options={{
        title: 'Total billable hours by employee',
        // Just add this option
        is3D: true
      }}
    />

    <Chart
      width={'1000px'}
      height={'400px'}
      chartType='Table'
      loader={<div>Loading Chart</div>}
      data={props.delta}
      formatters={[
        {
          type: 'ArrowFormat',
          column: 3
        }
      ]}
      options={{
        allowHtml: true,
        showRowNumber: true
      }}
    />
  </Layout>
)

UserStatistics.getInitialProps = async function () {
  try {
    const fetchedDataOld = await sdk.getUtilizations('2017-07-01', '2017-12-31')
    const ttdataOld = fetchedDataOld.ticTacUtilizations

    const fetchedData = await sdk.getUtilizations('2018-01-01', '2018-06-30')
    const ttdata = fetchedData.ticTacUtilizations

    const data1 = []
    const data2 = []
    const data3 = []
    const data4 = []

    let totalAmountOld = 0
    let totalAmount = 0

    let totalExpencesOld = 0
    let totalExpences = 0

    let totalHoursOld = 0
    let totalHours = 0

    let billableHoursOld = 0
    let billableHours = 0

    let uAlphaOld = 0
    let uAlpha = 0

    let uBetaOld = 0
    let uBeta = 0

    let stringData = JSON.stringify(ttdata)

    console.log('Data from API: ' + stringData)

    data1.push(['Type', 'Utilization Alpha', 'Utilization Beta'])
    data2.push(['Type', 'Amount', 'Expences'])
    data3.push(['Type', 'Billable hours'])

    ttdataOld.map(util => {
      totalAmountOld += Number(util.amount)
      totalExpencesOld += Number(util.cost)
      totalHoursOld += Number(util.totalSum)
      billableHoursOld += Number(util.billable)
      uAlphaOld += Number(util.utilizationAlpha)
      uBetaOld += Number(util.utilizationBeta)
    })

    ttdata.map(util => {
      data1.push([util.employee, +util.utilizationAlpha, +util.utilizationBeta])
      data2.push([util.employee, +util.amount, +util.cost])
      data3.push([util.employee, +util.billable])
      totalAmount += Number(util.amount)
      totalExpences += Number(util.cost)
      totalHours += Number(util.totalSum)
      billableHours += Number(util.billable)
      uAlpha += Number(util.utilizationAlpha)
      uBeta += Number(util.utilizationBeta)
    })

    let deltaAmount = totalAmount - totalAmountOld
    let deltaExpences = totalExpences - totalExpencesOld
    let deltaHours = totalHours - totalHoursOld
    let deltaBillable = billableHours - billableHoursOld
    let deltaUA = uAlpha / ttdata.length - uAlphaOld / ttdataOld.length
    let deltaUB = uBeta / ttdata.length - uBetaOld / ttdataOld.length

    data4.push(['Overall labor effectiveness category', '2017-07-01 - 2017-12-31', '2018-01-01 - 2018-06-30', 'Change'])
    data4.push(['Amount total', totalAmountOld, totalAmount, { v: deltaAmount, f: deltaAmount.toFixed(2) + ' SEK' }])
    data4.push(['Expences total', totalExpencesOld, totalExpences, { v: deltaExpences, f: deltaExpences.toFixed(2) + ' SEK' }])
    data4.push(['Hours reported total', totalHoursOld, totalHours, { v: deltaHours, f: deltaHours.toFixed(2) + ' hrs' }])
    data4.push(['Billable hours reported', billableHoursOld, billableHours, { v: deltaBillable, f: deltaBillable.toFixed(2) + ' hrs' }])
    data4.push(['Utilizations Alpha', (uAlphaOld / ttdataOld.length).toFixed(2), (uAlpha / ttdata.length).toFixed(2), { v: deltaUA, f: deltaUA.toFixed(2) + ' %' }])
    data4.push(['Utilizations Beta', (uBetaOld / ttdataOld.length).toFixed(2), (uBeta / ttdata.length).toFixed(2), { v: deltaUB, f: deltaUB.toFixed(2) + ' %' }])

    return { utils: data1, total: data2, pie: data3, delta: data4, errors : [''] }
  } catch (error) {
    console.log('ERROR:\n')
    console.error(error)
    return { utils: [], total: [], pie: [], delta: [], errors : ['Something goes wrong. ' + error] }
  }
}

export default UserStatistics
