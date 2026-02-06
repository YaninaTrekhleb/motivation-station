import { useRef, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';

export function ShareCard({ quote, isOpen, onClose }) {
  const cardRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen || !quote) return null;

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false
      });

      const link = document.createElement('a');
      link.download = 'motivation-quote.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to generate image:', error);
      alert('Failed to generate image. Please try again.');
    }

    setIsGenerating(false);
  };

  const handleCopy = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false
      });

      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          alert('Image copied to clipboard!');
        }
      });
    } catch (error) {
      console.error('Failed to copy image:', error);
      alert('Failed to copy. Try downloading instead.');
    }

    setIsGenerating(false);
  };

  return (
    <div className="share-overlay" onClick={onClose}>
      <div className="share-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        <div ref={cardRef} className="share-card-preview">
          <div className="share-card-content">
            <p className="share-quote">"{quote.text}"</p>
            <p className="share-watermark">motivation-station</p>
          </div>
        </div>

        <div className="share-actions">
          <button
            className="btn-primary"
            onClick={handleDownload}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Download PNG'}
          </button>
          <button
            className="btn-secondary"
            onClick={handleCopy}
            disabled={isGenerating}
          >
            Copy to clipboard
          </button>
        </div>
      </div>
    </div>
  );
}
