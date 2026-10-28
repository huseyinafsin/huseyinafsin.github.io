---
title: "Markdown blog'a video, görsel ve kod eklemek"
date: "2026-10-27"
summary: "Yazılarıma artık video gömebiliyorum, kod bloklarını kopyalanabilir hale getirdim ve her yazı için Instagram/WhatsApp paylaşım görseli üretiyorum. Kısa bir tur."
tags: ["Markdown", "Video", "Tasarım"]
cover: ""
draft: false
---

# Markdown blog'a video, görsel ve kod eklemek

Bu yazı, yeni stüdyoda neleri denediğimi göstermek için bir deneme alanı.
Aşağıdaki örnekler gerçekten çalışıyor, sayfayı kaydırıp bakabilirsiniz.

## Video gömme

Tek satırla YouTube videosu eklenebiliyor. Altyazı da ekleyebilirsiniz.

!video[Kanaldan kısa bir video](https://www.youtube.com/watch?v=dQw4w9WgXcQ)

Vimeo ve doğrudan `.mp4` bağlantıları da destekleniyor.

## Görsel ve altyazı

![Kod yazarken çekilmiş bir kare](https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=1200&q=70)

## Kopyalanabilir kod

```csharp
public sealed class Yazı
{
    public string Başlık { get; init; } = string.Empty;
    public DateOnly Tarih { get; init; }
    public IReadOnlyList<string> Etiketler { get; init; } = [];
}
```

```typescript
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[çğıöşü]/g, (c) => ({ ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u" })[c] ?? c)
    .replace(/[^a-z0-9]+/g, "-");
```

## Tablo

| Öğe | Durum |
| --- | --- |
| Video | Çalışıyor |
| Görsel | Çalışıyor |
| Kod | Çalışıyor |
| Paylaşım görseli | Çalışıyor |

> Her yazının altında paylaşım çubuğu var; oradan tek tıkla görsel üretebilirsiniz.
