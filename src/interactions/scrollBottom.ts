function scrollBottom({ event }: { event: Event }): void {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

  