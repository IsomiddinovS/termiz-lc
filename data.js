// ============================================================
// TERMIZ MTU — MA'LUMOTLAR
// ============================================================

// Temir yo'l stansiyalari (Mezon 1 uchun — COG)
const STANSIYALAR = [
    { id: 1, nom: "G'alaba", lat: 37.252996, lon: 67.389353, yuk: 0 },
    { id: 2, nom: "Jarqo'rg'on", lat: 37.500986, lon: 67.404431, yuk: 0 },
    { id: 3, nom: "Qumqo'rg'on", lat: 37.838248, lon: 67.590897, yuk: 0 },
    { id: 4, nom: "Darband", lat: 38.152622, lon: 67.005627, yuk: 0 },
    { id: 5, nom: "Sariosiyo", lat: 38.367523, lon: 68.009133, yuk: 0 },
    { id: 6, nom: "Denov", lat: 38.271919, lon: 67.906294, yuk: 0 },
    { id: 7, nom: "Quduqli", lat: 38.4601, lon: 68.13805, yuk: 0 },
];

// Avtomobil logistika markazi
const TEMIZ_CARGO = {
    nom: "Temiz CARGO",
    lat: 37.2541249,
    lon: 67.4234009,
};

// ============================================================
// MEZON 2 — KELTIRILGAN XARAJATLAR (Zj) NORMATIVLARI
// O'zbekiston respublika normativlari va bozor ko'rsatkichlari
// ============================================================
const NORMATIVLAR = {
    // Kapital qo'yilmalar samaradorlik normativi (TY sohasi)
    En: 0.12,

    // 1 km infratuzilma qurish tannarxi (ming so'm/km)
    Cinf_km: 850000,

    // Amortizatsiya normativi (yillik, ulush)
    amort: 0.03,

    // Yillik ekspluatatsiya xarajati (stansiyani saqlash), ming so'm/yil
    Estac: 120000,

    // Transport tarifi (so'm/tonna-km)
    tarif_tkm: 900,
};

// Nomzod joylar (Mezon 2 uchun — Zj hisoblash)
const NOMZODLAR = [
    {
        id: "N1",
        nom: "Jarqo'rg'on (mavjud TY st.)",
        lat: 37.500986,
        lon: 67.404431,
        ty_masofa_km: 0.5,
        maydon: 1,
    },
    {
        id: "N2",
        nom: "Qumqo'rg'on (mavjud TY st.)",
        lat: 37.838248,
        lon: 67.590897,
        ty_masofa_km: 0.3,
        maydon: 1,
    },
    {
        id: "N3",
        nom: "G'alaba (mavjud TY st.)",
        lat: 37.252996,
        lon: 67.389353,
        ty_masofa_km: 0.4,
        maydon: 1,
    },
];