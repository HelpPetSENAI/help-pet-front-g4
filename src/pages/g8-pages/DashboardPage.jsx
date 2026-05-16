import BarChart from "../../components/BarChart";
import DashBoardCard from "../../components/DashboardCard";
import HealthCheck from "../../components/HealthCheck";
import { DashboardSectionStyle } from "./DashboardSectionStyle";


export default function Dashboard(){
    return (
        <DashboardSectionStyle >
            <DashBoardCard colSpan={3} rowSpan={4} title={'Gráfico de barra'} description={'Quantidades de  requisições e respostas divididas por dias da semana'} content={<BarChart />}/>
            <DashBoardCard colSpan={1} rowSpan={1} title={'Health Check'} content={<HealthCheck />}/>
            <DashBoardCard colSpan={1} rowSpan={1} title={'Esse é um título'} description={'Essa é a descrição'}/>
        </DashboardSectionStyle>
    )
}