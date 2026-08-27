// .eleventy.js — Eleventy configuration for Law Care BD
// Node/npm is dev-only; output is plain static HTML/CSS/JS in dist/

module.exports = function (eleventyConfig) {

  // ── Passthrough: files copied verbatim into dist/ ─────────────────────
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/script.js");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/sitemap.xml");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  // Favicons — add these files to src/ once the client supplies them
  eleventyConfig.addPassthroughCopy("src/*.ico");
  eleventyConfig.addPassthroughCopy("src/*.png");

  // ── Watch targets for --serve live-reload ─────────────────────────────
  eleventyConfig.addWatchTarget("src/style.css");
  eleventyConfig.addWatchTarget("src/script.js");

  // ── Input / Output directories ────────────────────────────────────────
  return {
    dir: {
      input:    "src",
      output:   "dist",
      includes: "_includes",
      data:     "_data",
    },
    // Process .html files through Nunjucks so {% include %} / {{ }} works
    htmlTemplateEngine:     "njk",
    markdownTemplateEngine: "njk",
    templateFormats:        ["html", "njk", "md"],
  };
};
