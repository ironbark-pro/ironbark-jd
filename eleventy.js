module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("public");
  
  // Watch for changes
  eleventyConfig.addWatchTarget("jobs/**/*.md");
  
  // Create collection from jobs
  eleventyConfig.addCollection("jobs", function(collectionApi) {
    return collectionApi.getFilteredByGlob("jobs/*.md").sort((a, b) => {
      return b.date - a.date; // Sort by date, newest first
    });
  });

  return {
    dir: {
    input: ".",      output: "_site",
      includes: "_includes",
      layouts: "layouts"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
