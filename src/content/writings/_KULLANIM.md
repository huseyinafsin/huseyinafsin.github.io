# Yazılar Nasıl Eklenir?

Yazılar `src/content/writings/` klasöründe tutulur. Her yazı **tek bir markdown
dosyasıdır**. Başka hiçbir yeri düzenlemenize gerek yok.

## 1. Yeni dosya oluşturun

Dosya adı şu formatta olsun:

```
YYYY-AA-GG-baslik.md
```

Örnek: `2026-11-02-dotnette-caching.md`

> Dosya adı URL'yi belirler: `/writings/dotnette-caching`
> İsterseniz front matter içine `slug: ozel-adres` yazarak değiştirebilirsiniz.

> `_` ile başlayan dosyalar (`_sablon.md`, `_KULLANIM.md`) yayınlanmaz.
> Yeni yazı için `_sablon.md` dosyasını kopyalayıp adını değiştirmeniz yeterli.

## 2. Üst bilgiyi (front matter) doldurun

Dosyanın en başında iki `---` satırı arasına yazılır:

```yaml
---
title: "Yazının Başlığı"
date: "2026-11-02"
summary: "Listede görünecek 1-2 cümlelik özet"
tags: ["C#", "Performans"]
cover: "/writings/kapak.png"
draft: false
---
```

| Alan | Zorunlu | Açıklama |
| --- | --- | --- |
| `title` | Hayır | Boşsa dosyadaki ilk `# başlık` kullanılır. |
| `date` | Hayır | Boşsa dosya adındaki tarih kullanılır. |
| `summary` | Hayır | Boşsa yazının ilk paragrafından üretilir. |
| `tags` | Hayır | Listede etiket olarak gösterilir. |
| `cover` | Hayır | Kartta görünecek kapak görseli. |
| `draft` | Hayır | `true` ise yazı sitede yayınlanmaz. |

## 3. Yazıyı yazın

Front matter'ın altına normal markdown ile yazın. Desteklenenler:

- Başlıklar: `#`, `##`, `###`
- **Kalın**, *italik*, ~~üstü çizili~~, `inline kod`
- Listeler (madde ve numaralı)
- ``` ``` kod blokları ``` ``` (dil etiketiyle)
- `>` alıntı
- `[bağlantı](https://...)`
- `![açıklama](/writings/resim.png)` görsel
- `---` ayırıcı

## 4. Görsel ekleme

Görselleri `public/writings/` klasörüne koyun ve `/writings/dosya-adi.png`
şeklinde referans verin.

## 5. Yayınlama

```bash
npm start        # geliştirme (yazılar otomatik işlenir)
npm run build    # üretim derlemesi (yazılar otomatik işlenir)
```

`npm start` açıkken yeni bir `.md` dosyası eklerseniz sunucuyu bir kez
durdurup yeniden başlatın; mevcut yazılarda yaptığınız değişiklikler otomatik
yenilenir.

Üretilen `src/content/writings.generated.json` dosyasını elle düzenlemeyin,
derleme sırasında yeniden oluşturulur.
