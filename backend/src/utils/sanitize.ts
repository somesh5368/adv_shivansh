import sanitizeHtml from 'sanitize-html';

export function sanitizeRichText(dirtyHtml: string): string {
  if (!dirtyHtml) return '';
  return sanitizeHtml(dirtyHtml, {
    allowedTags: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'blockquote', 'p', 'a', 'ul', 'ol', 'nl', 'li',
      'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br',
      'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td',
      'pre', 'span'
    ],
    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel'],
      span: ['class'],
      p: ['class'],
      table: ['class'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    transformTags: {
      a: (tagName, attribs) => {
        // Enforce secure external links
        if (attribs.href && (attribs.href.startsWith('http://') || attribs.href.startsWith('https://'))) {
          attribs.target = '_blank';
          attribs.rel = 'noopener noreferrer nofollow';
        }
        return {
          tagName: 'a',
          attribs,
        };
      },
    },
  });
}

