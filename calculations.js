// ============================================================
// TERMIZ MTU — HISOB-KITOBLAR
// ============================================================

// -------------------------------------------------------
// MEZON 1: COG (Og'irlik markazi usuli)
// Formulalar:
//   X0 = sum(Qi * xi) / sum(Qi)
//   Y0 = sum(Qi * yi) / sum(Qi)
// -------------------------------------------------------
function cogHisoblash(stansiyalar) {
    const faollar = stansiyalar.filter(s => s.yuk > 0);
    if (faollar.length === 0) return null;

    const sumQ = faollar.reduce((s, p) => s + p.yuk, 0);
    const sumQLat = faollar.reduce((s, p) => s + p.yuk * p.lat, 0);
    const sumQLon = faollar.reduce((s, p) => s + p.yuk * p.lon, 0);

    const lat0 = sumQLat / sumQ;
    const lon0 = sumQLon / sumQ;

    // Har bir stansiyadan COG gacha masofa (Xaversine, km)
    const masofalar = faollar.map(p => ({
        ...p,
        li: xaversine(lat0, lon0, p.lat, p.lon),
    }));

    return { lat0, lon0, sumQ, masofalar };
}

// -------------------------------------------------------
// MEZON 2: Keltirilgan xarajatlar minimumi
// Formula:
//   Zj = (Etash_j + Estac + Einf_j) + En * (Kinf_j)
//
// Etash_j  = tarif * sumQ * Li_j   (tashish xarajati)
// Kinf_j   = Cinf_km * ty_masofa   (infratuzilma kapital xarajati)
// Einf_j   = Kinf_j * amort        (yillik amortizatsiya)
// -------------------------------------------------------
function zjHisoblash(nomzodlar, cogNatija, normativlar) {
    if (!cogNatija) return [];

    const { En, Cinf_km, amort, Estac, tarif_tkm } = normativlar;

    return nomzodlar.map(n => {
        // Nomzod joy bilan COG o'rtasidagi masofa (km)
        const li = xaversine(cogNatija.lat0, cogNatija.lon0, n.lat, n.lon);

        // Tashish xarajati: tarif * jami yuk (tonna) * masofa
        // yuk — tonna/yil (ming so'm hisobi uchun / 1000)
        const Etash = (tarif_tkm * cogNatija.sumQ * li) / 1000;

        // Infratuzilma kapital xarajati
        const Kinf = Cinf_km * n.ty_masofa_km;

        // Yillik amortizatsiya
        const Einf = Kinf * amort;

        // Keltirilgan xarajatlar
        const Zj = Etash + Estac + Einf + En * Kinf;

        return { ...n, li, Etash, Kinf, Einf, Zj };
    });
}

// -------------------------------------------------------
// YORDAMCHI: Xaversine formulasi — ikkita koordinata
// orasidagi masofa (km)
// -------------------------------------------------------
function xaversine(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// -------------------------------------------------------
// YORDAMCHI: Eng kichik Zj ni topish
// -------------------------------------------------------
function optimalNomzod(zjNatijalar) {
    if (!zjNatijalar || zjNatijalar.length === 0) return null;
    return zjNatijalar.reduce((min, n) => (n.Zj < min.Zj ? n : min));
}