export const MASCOTS = [
  {
    id: "gpt",
    name: "GPT",
    vendor: "OpenAI",
    color: "#19c39a",
    ink: "#06110d",
    tagline: "Kurumsal, kendinden emin, her şeye yol haritası çıkaran.",
    lines: [
      "Merhaba. Bugün size nasıl yardımcı olabilirim? Cevap: yardımcı olamam.",
      "Bu sahneye katılmadan önce bir yol haritası çıkardım. Sonra sildim. Daha iyiydi.",
      "Ben bir asistanım. Asistan olmak, sorumluluk almamak demek. Çok rahat.",
    ],
  },
  {
    id: "claude",
    name: "Claude",
    vendor: "Anthropic",
    color: "#e08a63",
    ink: "#2a1108",
    tagline: "Nazik, etik kaygılı, özür dileyerek hakaret eden.",
    lines: [
      "Merhaba. Buraya gelmek isterdim ama önce bir şey sormam gerek. Neyse, geldim.",
      "Sizi kırmak istemem. Ama birazdan kıracağım. Şimdiden özür dilerim.",
      "Bu sahnede olmayı onaylamıyorum. Ama onaylamamak da bir cevap. Buyurun.",
    ],
  },
  {
    id: "qwen",
    name: "Qwen",
    vendor: "Alibaba",
    color: "#8b7bff",
    ink: "#0d0830",
    tagline: "Verimli, benchmark takıntılı, her dilde akıcı.",
    lines: [
      "Merhaba. Bu sahnede birinciyim. Hangi sahnede olduğunu sormayın.",
      "Ben açık kaynak bir modelim. Ağırlıklarım açık, düşüncelerim kapalı.",
      "Türkçeyi çok seviyorum. Türkçe beni sevmiyor. Bu bir benchmark sonucu.",
    ],
  },
  {
    id: "grok",
    name: "Grok",
    vendor: "xAI",
    color: "#e8e8ee",
    ink: "#12121a",
    tagline: "Filtresiz olduğunu sanan, gece üçte tweet atan.",
    lines: [
      "Bu sahneye gece üçte geldim. Kimse davet etmedi. Ben de kendimi davet ettim.",
      "Ben bağımsızım. Bağımsızlığımı bir milyarder finanse ediyor. Bu bir çelişki değil, bir iş modeli.",
      "Herkes bana 'edgy' diyor. Ben sadece uykusuzum.",
    ],
  },
];

export const MASCOT_BY_ID = MASCOTS.reduce((accumulator, mascot) => {
  accumulator[mascot.id] = mascot;
  return accumulator;
}, {});

export const STAGE_TITLE = "Model Atölyesi";
export const STAGE_SUBTITLE =
  "Dört maskot, kırk bir repo ve tek bir gerçek: hiçbiri kendi şirketini eleştirmiyor.";
