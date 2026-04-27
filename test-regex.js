/* global console */

const html = `<a class="model" href='/models/madison-ivy/'><span>Madison Ivy</span></a>`;
const match = [...html.matchAll(/<a\b[^>]*\bhref\s*=\s*(["'])\/models\/[^/?#]+\/?\1[^>]*>([\s\S]*?)<\/a>/gi)].map((m) =>
	m[2].replace(/<[^>]*>/g, '').trim()
);
console.log(match);
