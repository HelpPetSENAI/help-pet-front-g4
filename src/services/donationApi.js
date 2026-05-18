const API_BASE_URL = (
    import.meta.env.VITE_API_BASE_URL ||
    "https://help-pet-back-g2.azurewebsites.net"
).replace(/\/$/, "");

const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const shouldUseToken =
    API_TOKEN &&
    API_TOKEN.trim() !== "" &&
    API_TOKEN.trim() !== "COLE_SEU_TOKEN_AQUI";

const getHeaders = () => {
    const headers = {
        Accept: "application/json",
    };

    if (shouldUseToken) {
        const token = API_TOKEN.trim();
        headers.Authorization = token.toLowerCase().startsWith("bearer ")
            ? token
            : `Bearer ${token}`;
    }

    return headers;
};

const extractDonationList = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.content)) return data.content;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.donations)) return data.donations;
    if (Array.isArray(data?.items)) return data.items;

    return [];
};

export const getDonations = async () => {
    const response = await fetch(`${API_BASE_URL}/donations/viewAll`, {
        method: "GET",
        headers: getHeaders(),
    });

    if (!response.ok) {
        throw new Error(`Erro ao buscar doações: ${response.status}`);
    }

    const data = await response.json();
    return extractDonationList(data);
};
