function downloadImage() {
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    let originalViewportContent;

    if (viewportMeta) {
        originalViewportContent = viewportMeta.getAttribute('content');
        viewportMeta.setAttribute("content", "width=800"); // ここ大事１

        html2canvas(document.getElementById('tableContainer')).then(canvas => {
            viewportMeta.setAttribute("content", originalViewportContent); // ここ大事２

            const link = document.createElement('a');
            link.download = 'diff-capture.png';
            link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            document.body.appendChild(link); // DOMに追加
            link.click();
            document.body.removeChild(link); // メモリリーク対策でDOMから削除
        });
    }
}