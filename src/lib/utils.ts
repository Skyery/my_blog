export function formatDate(date: string, local = 'zh-tw'): string {
    return new Date(date).toLocaleDateString(local, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function copyToClipboard(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (navigator?.clipboard) {
            const cb = navigator.clipboard;

            cb.writeText(text).then(resolve).catch(reject);
        } else {
            try {
                const body = document.querySelector('body');

                const textarea = document.createElement('textarea');
                body?.appendChild(textarea);

                textarea.value = text;
                textarea.select();
                document.execCommand('copy');

                body?.removeChild(textarea);

                resolve(void 0);
            } catch (e) {
                reject(e);
            }
        }
    });
};

export function removeDuplicateNewLine(text: string): string {
    if (!text) return text;

    return text
        .replace(/(\r\n\r\n)/gm, `\r\n`)
        .replace(/(\n\n)/gm, `\n`)
        .replace(/(\r\r)/gm, `\r`);
};