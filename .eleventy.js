module.exports = function(eleventyConfig) {
  
  // ============================================
  // PASSTHROUGH: Копируем статические файлы
  // ============================================
  
  // Админка → _site/admin
  eleventyConfig.addPassthroughCopy({ "public/admin": "admin" });
  
  // Assets → _site/assets
  eleventyConfig.addPassthroughCopy({ "public/assets": "assets" });
  
  // Redirects → _site/_redirects
  eleventyConfig.addPassthroughCopy({ "public/_redirects": "_redirects" });
  
  // Главная страница → _site/index.html (КРИТИЧНО!)
  eleventyConfig.addPassthroughCopy({ "public/index.html": "index.html" });
  
  // ============================================
  // IGNORES: Исключаем из обработки
  // ============================================
  
  eleventyConfig.ignores.add("node_modules/**");
  eleventyConfig.ignores.add(".git/**");
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("public/**");  // Весь public игнорируем (копируем явно)
  
  // ============================================
  // КОЛЛЕКЦИЯ JOBS
  // ============================================
  
  eleventyConfig.addCollection("jobs", function(collectionApi) {
    return collectionApi.getFilteredByGlob("jobs/*.md")
      .sort((a, b) => {
        // Корректная сортировка по дате (новые первыми)
        const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
        const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
        return dateB - dateA;
      });
  });

  // ============================================
  // КАСТОМНЫЕ ФИЛЬТРЫ
  // ============================================
  
  // Фильтр для форматирования дат в Nunjucks
  eleventyConfig.addFilter("formatDate", function(date, format) {
    if (!date) return "";
    const d = new Date(date);
    
    // ISO формат: 2025-11-30
    if (format === "iso") {
      return d.toISOString().split('T')[0];
    }
    
    // Длинный формат: November 30, 2025
    if (format === "long") {
      return d.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    
    // Формат по умолчанию
    return d.toLocaleDateString('en-US');
  });

  // ============================================
  // КОНФИГУРАЦИЯ
  // ============================================
  
  return {
    dir: {
      input: ".",                    // Корень репо
      output: "_site",               // Результат сборки
      includes: "src/_includes",     // Путь к includes
      layouts: "src/layouts",        // Путь к layouts
      data: "src/_data"              // Путь к data (если будет)
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"]
  };
};
