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
    { id: 8, nom: "Termiz", lat: 37.251377, lon: 67.287246, yuk: 0 },
];

// ============================================================
// MEZON 2 — KELTIRILGAN XARAJATLAR (Zj) NORMATIVLARI
// O'zbekiston respublika normativlari va bozor ko'rsatkichlari
// ============================================================
const NORMATIVLAR = {
    // Amortizatsiya normativi (yillik, ulush)
    amort: 0.03,

    // Yillik ekspluatatsiya xarajati (stansiyani saqlash), ming so'm/yil
    Estac: 120000,
};

// Xalqaro aeroport
const AEROPORTLAR = [
    { id: "A1", nom: "Termiz xalqaro aeroporti", lat: 37.2875, lon: 67.3103 },
];

// Chegara punktlari
const CHEGARA_PUNKTLAR = [
    { id: "CP1", nom: "Hayraton (Afgʻoniston)", lat: 37.214708, lon: 67.419886 },
];

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
    {
        id: "N4",
        nom: "Termiz Cargo Center (avto LC)",
        lat: 37.2541249,
        lon: 67.4234009,
        ty_masofa_km: 12.0,
        maydon: 1,
        yuk: 0,
    },
    {
        id: "N5",
        nom: "Termiz logistik markazi (TY LC)",
        lat: 37.245481,
        lon: 67.265025,
        ty_masofa_km: 2.0,
        maydon: 1,
        yuk: 0,
    },
];