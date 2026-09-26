'use client';

import React from 'react';

interface AdSlotProps {
  slotId?: string;
  position?: 'top-banner' | 'in-content' | 'bottom-banner' | 'sidebar';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  slotId = 'default-slot',
  position = 'in-content',
  className = '',
}) => {
  const isAdSenseConfigured = Boolean(process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID);

  // إذا لم يتم ربط معرف AdSense بعد، تظل المساحة فارغة وغير ظاهرة للزوار
  if (!isAdSenseConfigured) {
    return null;
  }

  const getPositionStyles = () => {
    switch (position) {
      case 'top-banner':
        return 'w-full max-w-4xl min-h-[90px] md:min-h-[100px] my-4';
      case 'bottom-banner':
        return 'w-full max-w-4xl min-h-[100px] md:min-h-[120px] my-6';
      case 'sidebar':
        return 'w-full min-h-[250px] my-4';
      case 'in-content':
      default:
        return 'w-full max-w-3xl min-h-[120px] md:min-h-[140px] my-8';
    }
  };

  return (
    <div
      className={`relative mx-auto flex flex-col items-center justify-center overflow-hidden transition-all ${getPositionStyles()} ${className}`}
      aria-label="إعلان"
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', textAlign: 'center' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
