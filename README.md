# Model Atölyesi

Dört yapay zekâ maskotunun rastgele bir sahnede dolaşıp bir yazılımcının
repolarını çekiştirdiği, mizahi bir eleştiri sahnesi.

**Canlı:** https://huseyinafsin.github.io/

## Fikir

2026'da dört büyük model şirketi aynı şeyi söylüyor: güvenlik, şeffaflık,
açık kaynak, özgürlük. Sahnedeki maskotlar bunları temsil ediyor ama
hiçbiri kendi şirketini eleştirmiyor. Repolar gerçek, eleştiriler kurgu,
kurgunun kendisi eleştirinin konusu.

Detaylar sağ üstteki **Manifesto**'da.

## Ne var?

- **Rastgele dolaşan maskotlar** — her biri farklı hızda, farklı yönde,
  birbirine çarpmadan
- **Üç konuşma türü**: repo eleştirisi, şirket eleştirisi, maskotların
  birbirine laf sokması
- **41 gerçek repo** alt şeritte hedef olarak seçilebilir
- **Kaos** modu: maskotlar panikler
- **Duraklat** (veya boşluk tuşu)
- **Tutanak**: sahnede söylenen her şeyin kaydı
- **Manifesto**: eserin ne yaptığı ve neden yaptığı
- Mobil uyumlu, `prefers-reduced-motion` desteği

## Kurulum

```bash
npm install
npm start
```

`http://localhost:3000` — giriş perdesi açılır, **Perdeyi aç** ile sahneye
geçilir. Doğrudan sahne için `/?sahne=1`.

## Yapı

```text
src/arena/
  Arena.jsx       sahne, gezinme döngüsü, balonlar, pencereler
  Mascot.jsx      dört maskotun SVG çizimi
  lines.js        bütün konuşma havuzları (repo / şirket / atışma)
  mascots.js      maskot tanımları ve açılış replikleri
  RoastEngine.js  havuzları karıştırıp tekrarı engelleyen seçici
  repos.json      GitHub'dan çekilmiş repo listesi
  arena.css       sahne, balon, şerit ve pencere stilleri
```

Konuşmalar `src/arena/lines.js` içinde düz metin olarak durur. Yeni bir cümle
eklemek için ilgili maskotun dizisine bir satır yazmak yeterli:

```js
// {{repo}}, {{lang}}, {{stars}}, {{desc}} otomatik doldurulur
"{{repo}} reposunu inceledim. Güçlü yönleri: var olması.",
```

`{{desc}}` içeren satırlar, açıklaması olmayan repolarda atlanır.

## Yayınlama

```bash
npm run deploy
```

`build/` çıktısını `gh-pages` dalına gönderir. GitHub Pages kaynağı:
`gh-pages` / root. Vercel ve Netlify yapılandırmaları (`vercel.json`,
`netlify.toml`) hazır.

## Not

Bu proje hiçbir modeli çalıştırmaz. Cümleler önceden yazılmıştır, rastgele
seçilir. Marka logoları kullanılmaz; maskotlar yalnızca siluet, renk ve bakış
olarak gönderme yapar.

`mascots/` klasörü çizimler için kullandığım yerel referans fotoğraflarını
tutar ve telif nedeniyle depoya dahil edilmez.

## Blog sürümü

Bu depo bir zamanlar markdown tabanlı bir blogdu. O sürüm `blog` dalında ve
`blog-v1` etiketinde duruyor:

```bash
git checkout blog
```
