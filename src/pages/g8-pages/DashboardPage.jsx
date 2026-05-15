import DashBoardCard from "../../components/DashboardCard";
import HealthCheck from "../../components/HealthCheck";
import { DashboardSectionStyle } from "./DashboardSectionStyle";


export default function Dashboard(){
    return (
        <DashboardSectionStyle >
            <DashBoardCard colSpan={3} rowSpan={4} title={'Esse é um título'} description={'Essa é a descrição'}/>
            <DashBoardCard colSpan={1} rowSpan={2} title={'Esse é um título'} description={'Essa é a descrição'} content={<HealthCheck />}/>
            <DashBoardCard colSpan={1} rowSpan={2} title={'Esse é um título'} description={'Essa é a descrição'}/>
            <DashBoardCard colSpan={1} rowSpan={1} title={'Esse é um título'} description={'Essa é a descrição'}/>
            <DashBoardCard colSpan={1} rowSpan={1} title={'Esse é um título'} description={'Essa é a descrição'}/>
            <DashBoardCard colSpan={1} rowSpan={1} title={'Esse é um título'} description={'Essa é a descrição'}/>
            <DashBoardCard colSpan={1} rowSpan={1} title={'Esse é um título'} description={'Essa é a descrição'}/>
        </DashboardSectionStyle>
    )
}