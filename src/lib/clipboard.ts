/**
 * Bulletproof cross-platform copy to clipboard helper.
 * Works across iOS Safari, Android Chrome, in-app WebViews, and desktop browsers.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  // 1. Try modern Clipboard API first
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('navigator.clipboard failed, attempting fallback...', err);
    }
  }

  // 2. Robust fallback using temporary textarea
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '0';
    textarea.style.width = '2em';
    textarea.style.height = '2em';
    textarea.style.padding = '0';
    textarea.style.border = 'none';
    textarea.style.outline = 'none';
    textarea.style.boxShadow = 'none';
    textarea.style.background = 'transparent';
    textarea.setAttribute('readonly', '');
    document.body.appendChild(textarea);

    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
      const range = document.createRange();
      range.selectNodeContents(textarea);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
      textarea.setSelectionRange(0, 999999);
    } else {
      textarea.focus();
      textarea.select();
    }

    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);
    return successful;
  } catch (err) {
    console.error('Fallback copyToClipboard failed:', err);
    return false;
  }
}
