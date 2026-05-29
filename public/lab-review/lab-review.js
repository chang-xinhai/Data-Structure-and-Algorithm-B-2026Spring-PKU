document.addEventListener('DOMContentLoaded', () => {
  if (window.renderMathInElement) {
    window.renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '\\[', right: '\\]', display: true },
        { left: '\\(', right: '\\)', display: false }
      ],
      throwOnError: false
    });
  }

  document.querySelectorAll('.tab').forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.target;
      document.querySelectorAll('.tab').forEach((item) => item.classList.toggle('active', item === button));
      document.querySelectorAll('.tab-panel').forEach((panel) => panel.classList.toggle('active', panel.id === target));
    });
  });


  document.querySelectorAll('.pattern-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.pattern-card');
      const willOpen = !card.classList.contains('open');
      card.classList.toggle('open', willOpen);
      button.setAttribute('aria-expanded', String(willOpen));
    });
  });

  document.querySelectorAll('pre').forEach((pre) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'code-copy';
    button.textContent = '复制';
    button.addEventListener('click', async () => {
      const text = pre.querySelector('code')?.innerText || pre.innerText;
      try {
        await navigator.clipboard.writeText(text);
        button.textContent = '已复制';
        button.classList.add('copied');
        window.setTimeout(() => {
          button.textContent = '复制';
          button.classList.remove('copied');
        }, 1200);
      } catch {
        button.textContent = '复制失败';
      }
    });
    pre.appendChild(button);
  });
});
