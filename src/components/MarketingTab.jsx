import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Calendar, Share2, Star } from 'lucide-react';

export function MarketingTab() {
  // Google Business Profile review link
  const reviewLink = "https://g.page/r/CSxMBX-NLBXTEBM/review";

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Marketing Hub</h2>

      <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
        <div className="inline-block bg-indigo-50 p-4 rounded-xl mb-4">
          <Star className="text-indigo-600 w-8 h-8 mx-auto mb-2" />
          <h3 className="font-semibold">Review QR Code</h3>
        </div>
        <p className="text-sm text-gray-500 mb-6">Show this to customers to quickly get Google Reviews.</p>
        
        <div className="flex justify-center bg-white p-4 rounded-xl border border-gray-100 inline-block shadow-sm mb-4">
          <QRCodeSVG value={reviewLink} size={180} level="H" />
        </div>
        
        <div className="mt-2">
          <button className="flex items-center justify-center gap-2 w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors">
            <Share2 size={18} />
            Share Link
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="text-indigo-600" />
          <h3 className="font-semibold text-lg">Upcoming Events</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-4 border-b border-gray-100 pb-4">
            <div className="bg-indigo-50 text-indigo-600 rounded-lg p-2 text-center min-w-[3rem]">
              <div className="text-xs font-bold uppercase">Oct</div>
              <div className="text-lg font-bold">15</div>
            </div>
            <div>
              <h4 className="font-semibold">Local Match Day</h4>
              <p className="text-sm text-gray-500">Run "Match Day 10% Off" story template.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-gray-50 text-gray-600 rounded-lg p-2 text-center min-w-[3rem]">
              <div className="text-xs font-bold uppercase">Oct</div>
              <div className="text-lg font-bold">31</div>
            </div>
            <div>
              <h4 className="font-semibold">Pay Week Promo</h4>
              <p className="text-sm text-gray-500">Push premium beans and bulk orders.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
