import DashBoardCard from "../../components/DashboardCard";
import { DashboardSectionStyle } from "./DashboardSectionStyle";


export default function Dashboard(){
    return (
        <DashboardSectionStyle >
            <DashBoardCard colSpan={3} rowSpan={2} title={'Esse é um título'} description={'Essa é a descrição'}/>
        </DashboardSectionStyle>
    )
}