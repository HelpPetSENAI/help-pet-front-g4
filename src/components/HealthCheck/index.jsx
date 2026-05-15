import { StyledHealthCheck, StyledStatus, StyledStatusWrapper } from "./style"
import iconSucess from '../../assets/icons/icon-sucess.svg'
import iconFail from '../../assets/icons/icon-fail.svg'

export default function HealthCheck() {
    const isSucessful = false

    return (
        <StyledHealthCheck $isSucessful={isSucessful}>
            {isSucessful
                ? <StyledStatusWrapper>
                    <img src={iconSucess} alt="" />

                    <h4>API Gateway</h4>

                    <StyledStatus $isSucessful={isSucessful}>up</StyledStatus>
                </StyledStatusWrapper>

                : <StyledStatusWrapper>
                    <img src={iconFail} alt="" />

                    <h4>API Gateway</h4>

                    <StyledStatus $isSucessful={isSucessful}>down</StyledStatus>
                </StyledStatusWrapper>
            }
            <p>Última verificação:  15:03:06</p>
        </StyledHealthCheck>
    )
}