<script>
  async function loadLayout(part, target) {
    try {
      const res = await fetch(`/src/layouts/${part}.html`);
      const html = await res.text();
      document.querySelector(target).innerHTML = html;
    } catch (err) {
      console.error('Error loading layout:', part, err);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    // вставляем header и footer
    const headerContainer = document.createElement('div');
    headerContainer.id = "header";
    document.body.prepend(headerContainer);

    const footerContainer = document.createElement('div');
    footerContainer.id = "footer";
    document.body.appendChild(footerContainer);

    loadLayout('header', '#header');
    loadLayout('footer', '#footer');
  });
</script>
