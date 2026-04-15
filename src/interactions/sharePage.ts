function sharePage(): void {
  const url = window.location.href;

  const copyToClipboard = (): void => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url);
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = url;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };

  if (typeof navigator.share === 'function') {
    navigator.share({ url }).catch((err: DOMException) => {
      // User dismissed the share sheet — don't fall back.
      if (err && err.name === 'AbortError') return;
      // Permissions-Policy block, missing user gesture, etc. — fall back.
      copyToClipboard();
    });
    return;
  }

  copyToClipboard();
}
