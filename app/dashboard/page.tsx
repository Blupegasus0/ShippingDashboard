import * as echarts from 'echarts';
import BarChart from '../../components/BarChart.tsx'
import LineChart from '../../components/LineChart.tsx'
import PieChart from '../../components/PieChart.tsx'

export default function Page() {
    // Barchar for received count per carrier per day
    //
    // Pie chart, shipment volume by air vs sea
    //
    // Line Chard, warehouse capacity over the year

    return (
        <div>
            <h1> This is the dashboard</h1>
            <BarChart />
            <PieChart />
            <LineChart />
        </div>
    );
}


