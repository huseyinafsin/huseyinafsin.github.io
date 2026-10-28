import { REPO_LINES, COMPANY_LINES, BANTER } from "./lines";
import { MASCOTS, MASCOT_BY_ID } from "./mascots";

function shuffle(list) {
  const copy = list.slice();
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const random = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[random]] = [copy[random], copy[index]];
  }
  return copy;
}

function fill(template, repo) {
  return template
    .replace(/\{\{repo\}\}/g, repo.name)
    .replace(/\{\{lang\}\}/g, repo.lang || "bilinmeyen dil")
    .replace(/\{\{stars\}\}/g, String(repo.stars))
    .replace(/\{\{desc\}\}/g, repo.desc || "");
}

/**
 * Konuşma sırasını yönetir: her maskotun havuzunu karıştırır, aynı cümleyi
 * kısa sürede tekrar söylemez ve repoya özel satırlarda açıklama şartını
 * kontrol eder.
 */
export default class RoastEngine {
  constructor() {
    this.queues = {};
    this.recent = [];
    this.banterQueue = shuffle(BANTER);
  }

  remember(text) {
    this.recent.push(text);
    if (this.recent.length > 30) this.recent.shift();
  }

  isRecent(text) {
    return this.recent.includes(text);
  }

  /** Bir maskot için sıradaki cümleyi seçer. */
  speak(mascotId, repo, options = {}) {
    const mascot = MASCOT_BY_ID[mascotId];
    if (!mascot) return null;

    const forced = options.kind;
    const roll = Math.random();
    let kind = forced || (roll < 0.52 ? "repo" : roll < 0.84 ? "company" : "banter");

    if (kind === "banter") {
      const partner = this.pickPartner(mascotId);
      if (!partner) {
        kind = "repo";
      } else {
        this.remember(partner.text);
        return { mascotId, kind, text: partner.text, target: partner.to };
      }
    }

    if (kind === "company") {
      return this.fromPool(mascotId, "company", COMPANY_LINES[mascotId]);
    }

    if (!repo) {
      return this.fromPool(mascotId, "company", COMPANY_LINES[mascotId]);
    }

    return this.fromPool(mascotId, "repo", REPO_LINES[mascotId], repo);
  }

  pickPartner(mascotId) {
    for (let attempt = 0; attempt < 12; attempt += 1) {
      if (this.banterQueue.length === 0) {
        this.banterQueue = shuffle(BANTER);
      }
      const item = this.banterQueue.pop();
      if (item.from === mascotId) return item;
    }
    return null;
  }

  fromPool(mascotId, kind, pool, repo) {
    if (!pool || pool.length === 0) return null;

    const key = `${mascotId}:${kind}`;
    if (!this.queues[key] || this.queues[key].length === 0) {
      this.queues[key] = shuffle(pool);
    }

    const queue = this.queues[key];
    for (let attempt = 0; attempt < pool.length; attempt += 1) {
      const template = queue.shift();
      if (!template) continue;

      if (template.includes("{{desc}}") && (!repo || !repo.desc)) {
        continue;
      }

      const text = repo ? fill(template, repo) : template;
      if (this.isRecent(text)) continue;

      this.remember(text);
      return { mascotId, kind, text };
    }

    // Havuz tükendiyse son çare rastgele bir satır.
    const fallback = fill(pool[0], repo || { name: "bu repo", lang: "", stars: 0, desc: "" });
    this.remember(fallback);
    return { mascotId, kind, text: fallback };
  }

  /** Açılışta her maskot kendini tanıtsın. */
  intro(mascotId) {
    const mascot = MASCOT_BY_ID[mascotId];
    const lines = mascot ? mascot.lines : [];
    if (!lines.length) return null;
    const text = lines[Math.floor(Math.random() * lines.length)];
    this.remember(text);
    return { mascotId, kind: "intro", text };
  }
}

export { MASCOTS };
