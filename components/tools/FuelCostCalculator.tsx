'use client';

import React, { useState } from 'react';
import { Fuel, IndianRupee, Navigation, Gauge } from 'lucide-react';

export default function FuelCostCalculator() {
  const [distanceKm, setDistanceKm] = useState<number>(350); // e.g. Bengaluru to Mysuru & back
  const [mileageKmpl, setMileageKmpl] = useState<number>(18); // 18 km/L default
  const [fuelPrice, setFuelPrice] = useState<number>(102); // ₹102/L default petrol

  const requiredLiters = mileageKmpl > 0 ? distanceKm / mileageKmpl : 0;
  const totalCost = requiredLiters * fuelPrice;
  const costPerKm = distanceKm > 0 ? totalCost / distanceKm : 0;

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 flex items-center gap-2">
            <Fuel className="w-6 h-6 text-amber-600" /> Fuel Cost &amp; Trip Expense Calculator
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            Calculate total trip fuel cost, required fuel liters, and per-kilometer running cost for cars, bikes, and EVs.
          </p>
        </div>
      </div>

      {/* Main Results Display */}
      <div className="bg-gradient-to-r from-amber-900 via-yellow-900 to-slate-900 text-white p-6 rounded-2xl shadow-md grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="space-y-1">
          <span className="text-xs text-amber-300 font-bold uppercase tracking-wider">Total Fuel Cost</span>
          <div className="text-4xl font-black text-white">
            ₹{Math.round(totalCost).toLocaleString('en-IN')}
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-amber-300 font-bold uppercase tracking-wider">Required Fuel</span>
          <div className="text-3xl font-extrabold text-amber-300">
            {requiredLiters.toFixed(1)} Liters
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-amber-300 font-bold uppercase tracking-wider">Cost per Kilometer</span>
          <div className="text-3xl font-extrabold text-slate-200">
            ₹{costPerKm.toFixed(2)} / km
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-zinc-50 border border-zinc-200 rounded-2xl p-5">
        <div className="space-y-1.5">
          <label className="block text-xs font-extrabold uppercase text-zinc-700">Trip Distance (KM)</label>
          <input
            type="number"
            value={distanceKm}
            onChange={(e) => setDistanceKm(parseFloat(e.target.value) || 0)}
            className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2 text-sm font-extrabold text-zinc-900 focus:outline-none focus:border-amber-600"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-extrabold uppercase text-zinc-700">Vehicle Mileage (KM / Liter)</label>
          <input
            type="number"
            step="0.5"
            value={mileageKmpl}
            onChange={(e) => setMileageKmpl(parseFloat(e.target.value) || 1)}
            className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2 text-sm font-extrabold text-zinc-900 focus:outline-none focus:border-amber-600"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-extrabold uppercase text-zinc-700">Fuel Price (₹ per Liter)</label>
          <input
            type="number"
            step="0.5"
            value={fuelPrice}
            onChange={(e) => setFuelPrice(parseFloat(e.target.value) || 0)}
            className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2 text-sm font-extrabold text-zinc-900 focus:outline-none focus:border-amber-600"
          />
        </div>
      </div>
    </div>
  );
}
