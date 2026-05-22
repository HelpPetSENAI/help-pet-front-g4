import { StyledHealthCheck, StyledStatus, StyledStatusWrapper } from "./style"
import iconSucess from '../../assets/icons/icon-sucess.svg'
import iconFail from '../../assets/icons/icon-fail.svg'

/**
 * Componente de status de serviço.
 * 
 * Props:
 * - title: nome do serviço a exibir (ex: "API Gateway", "G8 - HelpPet")
 * - status: "UP" | "DOWN" | "DEGRADED" | "NOT_CONFIGURED" | undefined (undefined = carregando)
 * - lastCheck: string com horário da última verificação
 */
export default function HealthCheck({ title = 'Serviço', status, lastCheck }) {
    const isSucessful = status === 'UP';
    const isLoading = status === undefined || status === null;

    const displayStatus = isLoading
        ? 'verificando...'
        : isSucessful
            ? 'up'
            : status === 'NOT_CONFIGURED'
                ? 'n/a'
                : 'down';

    const displayTime = lastCheck ?? '—';

    return (
        <StyledHealthCheck $isSucessful={isSucessful}>
            <StyledStatusWrapper>
                <img src={isSucessful ? iconSucess : iconFail} alt="" />

                <h4>{title}</h4>

                <StyledStatus $isSucessful={isSucessful} $isLoading={isLoading}>
                    {displayStatus}
                </StyledStatus>
            </StyledStatusWrapper>

            <p>Última verificação: {displayTime}</p>
        </StyledHealthCheck>
    )
}