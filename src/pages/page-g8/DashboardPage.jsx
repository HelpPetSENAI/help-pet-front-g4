import { useEffect, useState } from "react";
import BarChart from "../../components/BarChart";
import DashBoardCard from "../../components/DashboardCard";
import HealthCheck from "../../components/HealthCheck";
import { DashboardSectionStyle } from "./DashboardSectionStyle";

/**
 * Mapeamento dos serviços reais do projeto:
 * - gateway: o próprio API Gateway (porta 8080)
 * - helppet: microsserviço G8 - HelpPet (porta 8081)
 * 
 * Os outros (G1-G5) estão configurados no Gateway mas não existem ainda,
 * então serão exibidos como NOT_CONFIGURED automaticamente pelo health endpoint.
 */
const SERVICE_CARDS = [
    { key: 'gateway',           title: 'API Gateway',      description: 'Status do gateway central' },
    { key: 'g1_auth_users',     title: 'G8 / G1 - Auth',   description: 'Microsserviço de pets e usuários' },
    { key: 'g2_pets',           title: 'G2 - Pets',        description: 'Cadastro e consulta de pets' },
    { key: 'g3_adoption',       title: 'G3 - Adoption',    description: 'Fluxos de adoção' },
    { key: 'g4_chat',           title: 'G4 - Chat',        description: 'Mensagens e conversas' },
    { key: 'g5_notifications',  title: 'G5 - Notificações',description: 'Envio de notificações' },
];

export default function Dashboard() {
    const [healthData, setHealthData] = useState(null);
    const [lastCheck, setLastCheck] = useState(null);

    useEffect(() => {
        const fetchHealth = async () => {
            if (document.visibilityState === 'hidden') return;
            try {
                const response = await fetch('/api/health');
                const data = await response.json().catch(() => null);
                if (data) {
                    setHealthData(data);
                } else if (!response.ok) {
                    throw new Error(`Status ${response.status}`);
                }
            } catch {
                setHealthData(prev => prev ?? { gateway_status: 'DOWN', services: {} });
            } finally {
                setLastCheck(new Date().toLocaleTimeString('pt-br'));
            }
        };

        fetchHealth();
        const interval = setInterval(fetchHealth, 10000);
        const onVisible = () => { if (document.visibilityState === 'visible') fetchHealth(); };
        document.addEventListener('visibilitychange', onVisible);
        return () => {
            clearInterval(interval);
            document.removeEventListener('visibilitychange', onVisible);
        };
    }, []);

    /**
     * Resolve o status de cada serviço a partir da resposta do /api/health
     */
    const getStatus = (key) => {
        if (!healthData) return undefined; // carregando
        if (key === 'gateway') return healthData.gateway_status;
        return healthData.services?.[key] || 'NOT_CONFIGURED';
    };

    return (
        <DashboardSectionStyle>
            {/* Card principal: gráfico de métricas semanais */}
            <DashBoardCard
                colSpan={3}
                rowSpan={4}
                title={'Gráfico de barra'}
                description={'Quantidade de requisições e respostas divididas por dia da semana'}
                content={<BarChart />}
            />

            {/* Cards de health check dos serviços reais */}
            {SERVICE_CARDS.map((service) => (
                <DashBoardCard
                    key={service.key}
                    colSpan={1}
                    rowSpan={1}
                    title={service.title}
                    description={service.description}
                    content={
                        <HealthCheck
                            title={service.title}
                            status={getStatus(service.key)}
                            lastCheck={lastCheck}
                        />
                    }
                />
            ))}
        </DashboardSectionStyle>
    );
}