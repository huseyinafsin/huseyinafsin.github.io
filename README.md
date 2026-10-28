# Hüseyin Afşin · Yazılım Notları

Markdown dosyalarıyla yazı yayınlanan, React ile yazılmış statik kişisel blog.
Sunucu, veritabanı ve yönetim paneli yok.

**Site:** https://huseyinafsin.github.io/

## Özellikler

- Markdown tabanlı yazılar (front matter desteği)
- **Yazı stüdyosu (`/panel`)**: görsel, video ve kod ekleme, canlı önizleme, otomatik taslak
- **Paylaşım görseli üreteci**: Instagram kare/hikâye ve WhatsApp kartı için PNG
- Video gömme (YouTube, Vimeo, mp4) ve tablo desteği
- Kopyalanabilir kod blokları
- Etiket filtreleme ve yazılarda arama
- Açık/koyu tema (sistem tercihi + `localStorage`)
- Okuma ilerleme çubuğu, içindekiler, okuma süresi, önceki/sonraki yazı
- Otomatik `sitemap.xml` ve RSS (`feed.xml`) üretimi
- GitHub Pages için derin bağlantı desteği (`404.html` yönlendirmesi)
- Vercel / Netlify yapılandırmaları hazır

## Kurulum

```bash
npm install
npm start
```

`http://localhost:3000` adresinde açılır.

## Yazı ekleme

İki yol var:

**1. Stüdyo (önerilen):** `/panel` adresini açın, yazıyı yazın, görsel/video/kod
ekleyin, paylaşım görselini hazırlayın ve `.md` olarak indirin.

**2. Elle:** `src/content/writings/` içine `YYYY-AA-GG-baslik.md` adında dosya
oluşturun ve başına front matter ekleyin:

```yaml
---
title: "Yazı başlığı"
date: "2026-11-02"
summary: "Listede görünecek kısa özet"
tags: ["C#", "Performans"]
cover: ""
draft: false
---
```

Ardından yazıyı markdown ile yazın. Ayrıntılı kılavuz: [`src/content/writings/_KULLANIM.md`](src/content/writings/_KULLANIM.md)
Şablon: [`src/content/writings/_sablon.md`](src/content/writings/_sablon.md)

## Komutlar

| Komut | Açıklama |
| --- | --- |
| `npm start` | Geliştirme sunucusu |
| `npm run build` | Üretim derlemesi (`build/`) |
| `npm run writings` | Markdown listesini, sitemap ve RSS'i yeniler |
| `npm run deploy` | `build/` çıktısını `gh-pages` dalına yayınlar |
| `npm test` | Testler |

## Yapı

```text
public/                     statik dosyalar, 404 yönlendirmesi, favicon
scripts/build-writings.js   markdown -> JSON + sitemap + RSS
src/components/             markdown, kapak, paylaşım, içindekiler
src/content/writings/       yazılar (.md)
src/layouts/BlogLayout.jsx  üst menü ve alt bilgi
src/pages/                  yazı listesi, yazı detayı, hakkında, stüdyo, 404
src/theme.js                MUI tema (açık/koyu)
src/utils/                  yazı, metin, görsel ve paylaşım yardımcıları
```

## Yayınlama

`.github/workflows/node.js.yml` `blog` dalına yapılan push'larda siteyi derleyip
`gh-pages` dalına gönderir. GitHub Pages kaynağı: `gh-pages` / root.

Alternatif olarak Vercel veya Netlify üzerinden de yayınlanabilir; gerekli
yapılandırma dosyaları (`vercel.json`, `netlify.toml`) depoda mevcut.
