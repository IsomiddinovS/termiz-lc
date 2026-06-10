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
//   Zj = Etash + Estac + Einf
//
// Etash  = COG dan nomzodga masofa (km)   (tashish xarajati o'rnida)
// Einf   = Estac * amort                  (yillik amortizatsiya)
// -------------------------------------------------------
function zjHisoblash(nomzodlar, cogNatija, normativlar) {
    if (!cogNatija) return [];

    const { amort, Estac } = normativlar;

    return nomzodlar.map(n => {
        // Nomzod joy bilan COG o'rtasidagi masofa (km)
        const li = xaversine(cogNatija.lat0, cogNatija.lon0, n.lat, n.lon);

        // Tashish xarajati (masofa asosida)
        const Etash = li;

        // Yillik amortizatsiya
        const Einf = Estac * amort;

        // Keltirilgan xarajatlar
        const Zj = Etash + Estac + Einf;

        return { ...n, li, Etash, Einf, Zj };
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

// -------------------------------------------------------
// NORMALIZATSIYA: kichik masofa / xarajat = yuqori ball
// Qaytaradi: 0-1 oralig'idagi massiv (1 = eng yaxshi)
// -------------------------------------------------------
function normalizatsiya(qiymatlar) {
    const min = Math.min(...qiymatlar);
    const max = Math.max(...qiymatlar);
    if (max === min) return qiymatlar.map(() => 1);
    return qiymatlar.map(v => 1 - (v - min) / (max - min));
}

// -------------------------------------------------------
// WSM (Weighted Sum Model) hisoblash
// Vaznlar: Zj=0.35, COG=0.25, chegara=0.25, aeroport=0.15
// -------------------------------------------------------
function wsmHisoblash(zjNatijalar, aeroportlar, chegaralar) {
    if (!zjNatijalar || zjNatijalar.length === 0) return [];

    // Har bir nomzod uchun aeroport va chegaraga eng yaqin masofa
    const kengaytirilgan = zjNatijalar.map(n => {
        const aeroport_km = Math.min(
            ...aeroportlar.map(a => xaversine(n.lat, n.lon, a.lat, a.lon))
        );
        const chegara_km = Math.min(
            ...chegaralar.map(c => xaversine(n.lat, n.lon, c.lat, c.lon))
        );
        return { ...n, aeroport_km, chegara_km };
    });

    // Har bir mezon bo'yicha normalizatsiya (kichik = yaxshi)
    const zjNorm      = normalizatsiya(kengaytirilgan.map(n => n.Zj));
    const cogNorm     = normalizatsiya(kengaytirilgan.map(n => n.li));
    const chegaraNorm = normalizatsiya(kengaytirilgan.map(n => n.chegara_km));
    const aeroportNorm= normalizatsiya(kengaytirilgan.map(n => n.aeroport_km));

    return kengaytirilgan.map((n, i) => ({
        ...n,
        zj_norm:       +zjNorm[i].toFixed(4),
        cog_norm:      +cogNorm[i].toFixed(4),
        chegara_norm:  +chegaraNorm[i].toFixed(4),
        aeroport_norm: +aeroportNorm[i].toFixed(4),
        wsm: +(
            0.35 * zjNorm[i] +
            0.25 * cogNorm[i] +
            0.25 * chegaraNorm[i] +
            0.15 * aeroportNorm[i]
        ).toFixed(4),
    }));
}

// -------------------------------------------------------
// YORDAMCHI: Eng yuqori WSM balli nomzodni topish
// -------------------------------------------------------
function optimalWsm(wsmNatijalar) {
    if (!wsmNatijalar || wsmNatijalar.length === 0) return null;
    return wsmNatijalar.reduce((max, n) => (n.wsm > max.wsm ? n : max));
}