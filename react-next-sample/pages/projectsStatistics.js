import Layout from '../components/MyLayout.js'
import Chart from 'react-google-charts'
const APIConsumer = require('tic-tac-js-sdk')
const sdk = new APIConsumer(process.env.API_TOKEN)

const ProjectsStatistics = (props) => (
  <Layout>
    <h2>Projects statistics</h2>
    <h3 className="errorMsg">{props.errors[0]}</h3>
    <Chart
      width={'1000px'}
      height={'500px'}
      chartType='PieChart'
      loader={<div>Loading Chart</div>}
      diffdata={props.stats}
      options={{
        title: 'Total billable hours difference: 2018 january vs 2018 february',
        pieSliceText: 'none'
      }}
    />

    <Chart
      width={'1000px'}
      height={'300px'}
      chartType='Table'
      loader={<div>Loading Chart</div>}
      data={props.deltas}
      formatters={[
        {
          type: 'ArrowFormat',
          column: 3
        }
      ]}
      options={{
        title: 'Total billable hours difference: 2018 january vs 2018 february',
        allowHtml: true,
        showRowNumber: true
      }}
    />
  </Layout>
)

ProjectsStatistics.getInitialProps = async function () {
  try {
    const fetchedDataOld = await sdk.getProjectReports('2018-01-01', '2018-01-31')
    const ttdataOld = fetchedDataOld.TimeSumPerProject.row

    const fetchedData = await sdk.getProjectReports('2018-02-01', '2018-02-28')
    const ttdata = fetchedData.TimeSumPerProject.row

    let stringData = JSON.stringify(ttdata)
    console.log('Data from API: ' + stringData)

    // create list of all projects and maps with reported hours
    let allProjects = []
    const oldMap = new Map()
    const newMap = new Map()

    ttdataOld.map(row => {
      oldMap.set(String(row.project), Number(row.time))
      allProjects.push(String(row.project))
    })

    for (var i = 0; i < ttdata.length; i++) {
      if (!allProjects.includes(String(ttdata[i].project))) {
        allProjects.push(String(ttdata[i].project))
      }
      newMap.set(String(ttdata[i].project), Number(ttdata[i].time))
    }

    const statistics = { old: [['Project', 'Hours reported']], new: [['Project', 'Hours reported']] }
    const deltas = [['Project', '2018 january', '2018 february', 'Change']]

    allProjects.map(project => {
      let str = String(project)
      let hoursOld = oldMap.get(project) || 0
      let hours = newMap.get(project) || 0
      statistics.old.push([str, hoursOld])
      statistics.new.push([str, hours])
      deltas.push([str, hoursOld, hours, { v: (hours - hoursOld), f: (hours - hoursOld).toFixed(2) + ' hrs' }])
    })

    return { stats: statistics, deltas: deltas, errors: [''] }
  } catch (error) {
    console.error(error)
    return { stats: [], deltas: [], errors : ['Something goes wrong. ' + error]}
  }
}

export default ProjectsStatistics
