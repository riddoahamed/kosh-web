import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Download, Check } from "lucide-react";
import { captureElement, shareNative } from "@/lib/shareCard";

interface Props {
  targetId: string;
  shareText?: string;
  filename?: string;
}

export function ShareButton({
  targetId,
  shareText = "I just checked my financial level on Kosh! Try it: kosh.app/check",
  filename = "kosh-result.png",
}: Props) {
  const [shared, setShared] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleShare = async () => {
    setIsGenerating(true);
    try {
      await shareNative(targetId, shareText);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await captureElement(targetId, filename);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex gap-3">
      <Button
        onClick={handleShare}
        disabled={isGenerating}
        variant="outline"
        className="flex-1 gap-2"
      >
        {shared ? (
          <>
            <Check className="h-4 w-4" />
            Shared!
          </>
        ) : (
          <>
            <Share2 className="h-4 w-4" />
            Share result
          </>
        )}
      </Button>
      <Button
        onClick={handleDownload}
        disabled={isGenerating}
        variant="ghost"
        size="icon"
        title="Download image"
      >
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
}
