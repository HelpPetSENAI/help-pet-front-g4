import { StyledHealthCheck, StyledStatus, StyledStatusWrapper } from "./style"
import iconSucess from '../../assets/icons/icon-sucess.svg'
import iconFail from '../../assets/icons/icon-fail.svg'

export default function HealthCheck({fetchUrl, serviceName, lastUpdate}) {
    const isSucessful = false

    // const response = await fetch('{fetchUrl}');
    
    // const healthData = response.json

    // if(healthData.overall_status === 'UP') {
    //     isSucessful = true
    // } else {
    //     isSucessful = false
    // }


    return (
        <StyledHealthCheck $isSucessful={isSucessful}>
            {isSucessful
                ? <StyledStatusWrapper>
                    <img src={iconSucess} alt="" />

                    <h4>{serviceName}</h4>

                    <StyledStatus $isSucessful={isSucessful}>up</StyledStatus>
                </StyledStatusWrapper>

                : <StyledStatusWrapper>
                    <img src={iconFail} alt="" />

                    <h4>{serviceName}</h4>

                    <StyledStatus $isSucessful={isSucessful}>down</StyledStatus>
                </StyledStatusWrapper>
            }
            <p>Última verificação:  {lastUpdate}</p>
        </StyledHealthCheck>
    )
}