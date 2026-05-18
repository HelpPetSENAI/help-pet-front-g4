const DEFAULT_PET_IMAGE =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='220' viewBox='0 0 320 220'%3E%3Crect width='320' height='220' rx='24' fill='%23C8EFCA'/%3E%3Ctext x='160' y='104' text-anchor='middle' font-size='64'%3E%F0%9F%90%BE%3C/text%3E%3Ctext x='160' y='148' text-anchor='middle' font-family='Arial' font-size='20' fill='%23061407'%3EHelp Pet%3C/text%3E%3C/svg%3E";

const sizeMap = {
    small: "pequeno",
    medium: "médio",
    large: "grande",
    pequeno: "pequeno",
    médio: "médio",
    medio: "médio",
    grande: "grande",
};

const genderMap = {
    male: "macho",
    female: "fêmea",
    macho: "macho",
    fêmea: "fêmea",
    femea: "fêmea",
};

const speciesLabelMap = {
    dog: "Cachorro",
    cat: "Gato",
};

const normalizeText = (value) => String(value ?? "").trim();

const getPhotoUrl = (donation) => {
    const photos = donation?.photos || donation?.donationPhotos || donation?.photoUrls;

    if (Array.isArray(photos) && photos.length > 0) {
        const firstPhoto = photos[0];

        if (typeof firstPhoto === "string") return firstPhoto;
        return firstPhoto?.photo_url || firstPhoto?.photoUrl || firstPhoto?.url;
    }

    return donation?.url || donation?.photo_url || donation?.photoUrl || DEFAULT_PET_IMAGE;
};

export const formatAge = (ageMonths) => {
    if (ageMonths === null || ageMonths === undefined || ageMonths === "") {
        return "Idade não informada";
    }

    const months = Number(ageMonths);

    if (Number.isNaN(months)) return "Idade não informada";
    if (months < 1) return "Menos de 1 mês";
    if (months === 1) return "1 mês";
    if (months < 12) return `${months} meses`;

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    const yearText = years === 1 ? "1 ano" : `${years} anos`;
    const monthText = remainingMonths === 1 ? "1 mês" : `${remainingMonths} meses`;

    return remainingMonths > 0 ? `${yearText} e ${monthText}` : yearText;
};

export const normalizeDonation = (donation) => {
    const rawAgeMonths = donation?.age_months ?? donation?.ageMonths;
    const ageMonths =
        rawAgeMonths === null || rawAgeMonths === undefined || rawAgeMonths === ""
            ? null
            : Number(rawAgeMonths);

    const species = normalizeText(donation?.species || donation?.type).toLowerCase();
    const size = normalizeText(donation?.size || donation?.porte).toLowerCase();
    const gender = normalizeText(donation?.gender || donation?.sexo).toLowerCase();
    const photo = getPhotoUrl(donation);
    const description = normalizeText(donation?.description);

    return {
        ...donation,
        id: donation?.id,
        name: normalizeText(donation?.name) || "Pet sem nome",
        type: species,
        typeLabel: speciesLabelMap[species] || "Pet",
        species,
        breed: normalizeText(donation?.breed),
        raca: normalizeText(donation?.breed) || "SRD",
        ageMonths,
        age: formatAge(donation?.age_months ?? donation?.ageMonths),
        photo,
        image: photo,
        url: photo,
        size,
        porte: sizeMap[size] || size || "não informado",
        weight: donation?.weight,
        peso: donation?.weight,
        gender,
        sexo: genderMap[gender] || gender || "não informado",
        description: description || "Sem descrição cadastrada.",
        temperamento: description ? [description] : ["Disponível para adoção"],
        cep: normalizeText(donation?.cep || donation?.zipCode || donation?.postalCode),
        isAvailable: donation?.is_available ?? donation?.isAvailable ?? true,
        lat:
            donation?.lat || donation?.latitude
                ? Number(donation.lat || donation.latitude)
                : null,
        lng:
            donation?.lng || donation?.longitude
                ? Number(donation.lng || donation.longitude)
                : null,
        vacinado: donation?.vacinado ?? donation?.vaccinated ?? null,
        castrado: donation?.castrado ?? donation?.neutered ?? null,
    };
};
