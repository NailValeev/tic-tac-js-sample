import Layout from '../components/MyLayout.js'
import Chart from 'react-google-charts'
const APIConsumer = require('tic-tac-js-sdk')
const sdk = new APIConsumer(process.env.API_TOKEN)

const PlannedTimes = (props) => (
    <Layout>
      <h2>Time planning.</h2>
      <h3 className="errorMsg">{props.errors[0]}</h3>
      <Chart
        width={'1000px'}
        height={'400px'}
        chartType='Table'
        loader={<div>Loading Chart</div>}
        data={props.plans}
        chartPackages={['corechart', 'controls']}
        options={{
          allowHtml: true,
          showRowNumber: true,
          title: 'Times planning, 2019 January',
        }}
        controls={[
          {
            controlType: 'NumberRangeFilter',
            options: {
              filterColumnIndex: 4,
              minValue: 0,
              maxValue: 220,  
            }
          }
        ]}
      />
    </Layout>
  )
  PlannedTimes.getInitialProps = async function () {
    
    return sdk.getTimePlans('2019-01-01', '2019-01-31')
    .then( data => {
      const plans = [['Name', 'Project', 'Start', 'End', 'Duration']]
        const ttdata = data.ticTacTimeplans        
        ttdata.map((plan, index) => plans.push([ plan.userName, plan.projectName, plan.startDate, plan.endDate, Number(plan.duration)]))
        return { plans: plans, errors : ['']}
      })
      .catch (error =>{
        console.error(error)
        return { plans: [], errors : ['Something goes wrong. ' + error]}
      })
  }
  
  export default PlannedTimes
  
