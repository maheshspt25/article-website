import React from 'react';
import { Info } from 'lucide-react';

export default function AffiliateDisclosure() {
  return (
    <div className="bg-amber-50/80 border border-amber-200/80 rounded-lg p-3 my-4 text-xs text-amber-900 flex items-start gap-2">
      <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
      <div>
        <span className="font-bold">Affiliate Disclosure: </span>
        InfoMitra may earn a small referral commission if you make a purchase through product comparison links on this page, at no additional cost to you.
      </div>
    </div>
  );
}
