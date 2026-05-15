import { StyledHealthCheck, StyledStatus, StyledStatusWrapper } from "./style"
import iconSucess from '../../assets/icons/icon-sucess.svg'

export default function HealthCheck() {
    const isSucessful = true

    return (
        <StyledHealthCheck $isSucessful={isSucessful}>
            <h3>Health Check</h3>
            {isSucessful
                ? <StyledStatusWrapper>
                    <img src={iconSucess} alt="" />

                    <h4>API Gateway</h4>

                    <StyledStatus $isSucessful={isSucessful}>up</StyledStatus>
                </StyledStatusWrapper>

                : <p>deu erradão isso aí</p>
            }
            <p>Última verificação:  15:03:06</p>
        </StyledHealthCheck>
    )
}