async function renderShareCanvas(element: HTMLElement): Promise<HTMLCanvasElement> {
  const { default: html2canvas } = await import("html2canvas");
  return html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });
}

export async function captureElement(
  elementId: string,
  filename = "kosh-result.png"
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const canvas = await renderShareCanvas(element);

    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch (err) {
    console.error("Share card generation failed:", err);
  }
}

export async function shareNative(
  elementId: string,
  text: string
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const canvas = await renderShareCanvas(element);

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], "kosh-result.png", { type: "image/png" });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          text,
          url: "https://kosh.app",
        });
      } else {
        // Fallback: download
        const link = document.createElement("a");
        link.download = "kosh-result.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
    }, "image/png");
  } catch (err) {
    console.error("Share failed:", err);
  }
}
