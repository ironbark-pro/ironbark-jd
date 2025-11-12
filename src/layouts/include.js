<script>
  async function loadLayout(part, target) {
    try {
      // Абсолютный путь относительно корня сайта
      const res = await fetch(`/src/layouts/${part}.html`);
      if (!res.ok) throw new Error(`${part}.html not found`);
      const html = await res.text();
      document.querySelector(target).innerHTML = html;
    } catch (err) {
      console.error(`Error loading layout "${part}":`, err);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Проверяем, нет ли уже header/footer на странице
    if (!document.querySelector('header')) {
      const headerContainer = document.createElement('div');
      headerContainer.id = "header";
      document.body.prepend(headerContainer);
      loadLayout('header', '#header');
    }

    if (!document.querySelector('footer')) {
      const footerContainer = document.createElement('div');
      footerContainer.id = "footer";
      document.body.appendChild(footerContainer);
      loadLayout('footer', '#footer');
    }
  });
</script>
