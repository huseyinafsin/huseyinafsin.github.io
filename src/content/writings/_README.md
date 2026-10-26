# Yazılar

Bu klasördeki `.md` dosyaları `scripts/build-writings.js` tarafından işlenir ve
`/writings` sayfasında listelenir.

- Yeni yazı: `YYYY-AA-GG-baslik.md` (örn. `2026-11-02-dotnette-caching.md`)
- Başlangıç şablonu: `_sablon.md`
- Ayrıntılı kullanım: `_KULLANIM.md`
- `_` ile başlayan dosyalar yayınlanmaz.
- Görseller: `public/writings/` klasörü, referans `/writings/resim.png`

`npm start` ve `npm run build` çalışırken liste otomatik yenilenir.
