# Yazı Stüdyosu

Site üzerinde `/panel` adresinden açılan yazı editörü. Kod yazmadan markdown
yazı üretir, görsel/video/kod ekler ve paylaşım görselleri hazırlar.

## Neler yapabilirsiniz?

- Başlık, tarih, özet, etiket, kapak ve özel adres alanlarını doldurmak
- Markdown yazmak veya **Önizleme** sekmesinde sonucu görmek
- Araç çubuğundan kalın/italik/liste/alıntı/bağlantı/tablo eklemek
- **Görsel**: bağlantı ile eklemek veya bilgisayardan dosya yüklemek
- **Video**: YouTube, Vimeo ya da doğrudan `.mp4`/`.webm` bağlantısı eklemek
- **Kod bloğu**: dil seçip kodu yapıştırmak (sitede kopyalanabilir görünür)
- Sağ panelde kart önizlemesini ve kontrol listesini görmek
- Instagram (kare / 9:16 hikâye) ve WhatsApp bağlantı kartı için **PNG paylaşım görseli** üretmek
- `Kopyala`, `.md indir` veya `GitHub'da oluştur` ile yazıyı yayına hazırlamak

Taslak, tarayıcınızda (`localStorage`) otomatik saklanır. Sekmeyi kapatsanız
bile geri geldiğinizde yazı yerinde durur.

## Yayınlama akışı

1. `/panel` sayfasında yazıyı tamamlayın.
2. **.md indir** ile dosyayı indirin (veya **Kopyala** deyip içeriği elle kaydedin).
3. Dosyayı `src/content/writings/` klasörüne koyun.
4. Terminalde:

```bash
npm run deploy
```

Alternatif olarak **GitHub'da oluştur** butonu, boş dosyayı doğru klasör ve
isimle GitHub üzerinde açar; içeriği yapıştırıp commit edebilirsiniz. `blog`
dalına yapılan push otomatik olarak yayınlanır.

## Yazı içinde medya kullanımı

Stüdyo aşağıdaki markdown'ı üretir:

```markdown
![Açıklama](https://.../gorsel.png)

!video[Video açıklaması](https://www.youtube.com/watch?v=XXXXXXX)

```csharp
Console.WriteLine("merhaba");
```
```

- `!video[...](...)` YouTube, Vimeo ve doğrudan video dosyalarını gömer.
- Çıplak bir video bağlantısı tek başına satırda durursa da gömülür.
- Görseller `public/writings/` klasörüne konup `/writings/ad.png` şeklinde
  referans verilebilir.

## Paylaşım görselleri

Her yazının altındaki **Görsel oluştur** butonu (ve stüdyodaki sağ panel) üç
boyutta PNG üretir:

| Boyut | Kullanım |
| --- | --- |
| 1080 × 1080 | Instagram kare gönderi |
| 1080 × 1920 | Instagram / WhatsApp hikâye |
| 1200 × 630 | Bağlantı (Open Graph) kartı |

Görsel, yazının başlığına göre deterministik bir gradyan kullanır; aynı yazı
için her zaman aynı renk çıkar. Kapak görseli eklerseniz kart görseli o rengi
korumaya devam eder, yazı sayfası ise kapak görselini gösterir.

## Not

Stüdyo tamamen tarayıcıda çalışır; sunucuya dosya yüklemez. Yüklediğiniz küçük
görseller (500 KB altı) yazıya base64 olarak gömülür. Daha büyük görseller için
dosyayı `public/writings/` klasörüne kopyalayıp yolu yazın.
