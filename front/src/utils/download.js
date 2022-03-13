export default function download(text, filename) {
    const a = document.createElement('a');
    const blob = URL.createObjectURL(new Blob([text]));
    a.href = blob;
    a.download = filename;
    a.click();
    setTimeout(() => {
        URL.revokeObjectURL(blob);
    }, 30 * 1000);
}