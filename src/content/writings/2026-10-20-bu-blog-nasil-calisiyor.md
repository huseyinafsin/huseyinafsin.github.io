---
title: "Bu blog nasıl çalışıyor?"
date: "2026-10-20"
summary: "Sunucusuz, veritabanısız ve panel olmadan markdown dosyalarıyla yazı yayınlayan bu sitenin arkasındaki basit yapı."
tags: ["React", "Markdown", "Statik Site"]
draft: false
---

# Bu blog nasıl çalışıyor?

Bu site React ile yazılmış statik bir uygulama. Amaç basit: **yeni bir yazı
eklemek için kod yazmak zorunda kalmamak**.

## Yazılar markdown dosyası

Her yazı `src/content/writings/` klasöründe ayrı bir dosya:

```text
src/content/writings/
  2026-10-26-ilk-yazi.md
  2026-10-20-bu-blog-nasil-calisiyor.md
  _sablon.md
```

Dosya adındaki tarih ve başlık yeterli. İsterseniz dosyanın başına front matter
ekleyerek özet, etiket ve kapak görseli tanımlayabiliyorsunuz.

```yaml
---
title: "Bu blog nasıl çalışıyor?"
date: "2026-10-20"
summary: "Kısa bir özet."
tags: ["React", "Markdown"]
---
```

## Derleme adımı

`npm start` ve `npm run build` komutlarından önce küçük bir Node betiği
çalışıyor. Bu betik markdown dosyalarını okuyup uygulamanın kullandığı JSON
listesini üretiyor. Ardından React bu listeyi normal bir veri kaynağı gibi
kullanıyor.

```js
const post = getWritingBySlug(slug);
```

Yani yeni yazı eklemek için yapılan tek şey bir dosya oluşturmak. Liste, yazı
sayfası, önceki/sonraki bağlantıları ve okuma süresi otomatik hesaplanıyor.

## Neden veritabanı yok?

Bir yazıyı yayınlamak için ihtiyaç duyduğum şeyler şunlar:

1. Metni saklayacak bir yer
2. Sürüm geçmişi
3. Hızlı ve güvenli bir yayın

Git ve statik hosting bu üçünü bedavaya sağlıyor. Veritabanı, kimlik doğrulama
ve yönetim paneli gibi katmanlar bu ölçekte sadece bakım yükü olurdu.

## Sonuç

Basit bir betik, biraz React ve markdown. Hepsi bu. Geri kalan zaman yazmaya
kalıyor.
