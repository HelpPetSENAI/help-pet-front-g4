import { StyledDashboardCard } from './style'
// Utilizar props para estilizar props
export default function DashBoardCard({ colSpan, rowSpan, title, description, content }) {
    return (
        <StyledDashboardCard $colSpan={colSpan} $rowSpan={rowSpan}>
            <h3>{title}</h3>
            <p>{description}</p>
            {content}
        </StyledDashboardCard>
    )
} 