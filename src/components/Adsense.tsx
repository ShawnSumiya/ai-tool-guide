'use client';
import Script from 'next/script';
import { useEffect } from 'react';

type AdsenseProps = {
  slotId?: string;
  className?: string;
};

export default function Adsense({ slotId, className }: AdsenseProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (_) {}
  }, []);

  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const slot = slotId || process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID;

  if (!client || !slot) {
    return null;
  }

  return (
    <>
      <Script
        id="adsbygoogle-loader"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client="
        strategy="afterInteractive"
        onLoad={() => {
          // @ts-ignore
          (adsbygoogle = window.adsbygoogle || []).push({});
        }}
        crossOrigin="anonymous"
      />
      <ins
        className={`adsbygoogle ${className ?? ''}`}
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </>
  );
}
