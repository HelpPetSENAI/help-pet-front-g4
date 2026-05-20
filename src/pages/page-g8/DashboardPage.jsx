import BarChart from "../../components/BarChart";
import DashBoardCard from "../../components/DashboardCard";
import HealthCheck from "../../components/HealthCheck";
import { DashboardSectionStyle } from "./DashboardSectionStyle";


export default function Dashboard(){
    return (
        <DashboardSectionStyle >
            <DashBoardCard colSpan={3} rowSpan={4} title={'Gráfico de barra'} 
            description={'Quantidades de  requisições e respostas desta semana'} content={<BarChart />}/>
            <DashBoardCard colSpan={1} rowSpan={1} title={'Health Check'} 
            content={<HealthCheck serviceName={'API gateway'} />}/>
            <DashBoardCard colSpan={1} rowSpan={1} title={'Health Check'} 
            content={<HealthCheck serviceName={'Autenticação'}/>}/>
            <DashBoardCard colSpan={1} rowSpan={1} title={'Health Check'} 
            content={<HealthCheck serviceName={'Pets'}/>}/>
            <DashBoardCard colSpan={1} rowSpan={1} title={'Health Check'} 
            content={<HealthCheck serviceName={'Adoção'}/>}/>
            <DashBoardCard colSpan={1} rowSpan={1} title={'Health Check'} 
            content={<HealthCheck serviceName={'Conversas'}/>}/>
            <DashBoardCard colSpan={1} rowSpan={1} title={'Health Check'} 
            content={<HealthCheck serviceName={'Notificações'}/>}/>
        </DashboardSectionStyle>
    )
}