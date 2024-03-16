export default function formatDate(date: string, local = 'zh-tw') {
    return new Date(date).toLocaleDateString(local, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}