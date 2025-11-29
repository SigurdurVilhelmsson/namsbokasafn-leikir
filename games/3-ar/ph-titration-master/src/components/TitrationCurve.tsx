import React, { useEffect, useRef } from 'react';
import { Titration } from '../types';

interface TitrationCurveProps {
  curveData: Array<{ volume: number; pH: number }>;
  currentVolume: number;
  currentPH: number;
  titration: Titration | null;
  showEquivalencePoints?: boolean;
  width?: number;
  height?: number;
}

/**
 * Titration Curve - Canvas-based pH vs Volume plot
 */
export const TitrationCurve: React.FC<TitrationCurveProps> = ({
  curveData,
  currentVolume,
  currentPH,
  titration,
  showEquivalencePoints = false,
  width = 600,
  height = 400
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set up margins and drawing area
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    // Draw background
    ctx.fillStyle = '#f9fafb';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;

    // Vertical grid lines (volume)
    for (let i = 0; i <= 60; i += 10) {
      const x = margin.left + (i / 60) * plotWidth;
      ctx.beginPath();
      ctx.moveTo(x, margin.top);
      ctx.lineTo(x, height - margin.bottom);
      ctx.stroke();
    }

    // Horizontal grid lines (pH)
    for (let i = 0; i <= 14; i += 2) {
      const y = height - margin.bottom - (i / 14) * plotHeight;
      ctx.beginPath();
      ctx.moveTo(margin.left, y);
      ctx.lineTo(width - margin.right, y);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, height - margin.bottom);
    ctx.lineTo(width - margin.right, height - margin.bottom);
    ctx.stroke();

    // Draw buffer regions if weak acid/base
    if (titration) {
      if (titration.type === 'weak-strong' && titration.pKa) {
        const pKa = titration.pKa;
        const pKaY = height - margin.bottom - (pKa / 14) * plotHeight;
        const bufferTop = height - margin.bottom - ((pKa + 1) / 14) * plotHeight;
        const bufferBottom = height - margin.bottom - ((pKa - 1) / 14) * plotHeight;

        // Buffer region shading
        ctx.fillStyle = 'rgba(251, 191, 36, 0.15)';
        ctx.fillRect(margin.left, bufferTop, plotWidth, bufferBottom - bufferTop);

        // pKa line
        ctx.strokeStyle = '#f59e0b';
        ctx.setLineDash([5, 5]);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(margin.left, pKaY);
        ctx.lineTo(width - margin.right, pKaY);
        ctx.stroke();
        ctx.setLineDash([]);

        // pKa label
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(`pKa = ${pKa.toFixed(2)}`, width - 100, pKaY - 5);
      } else if (titration.type === 'polyprotic-diprotic') {
        // Draw two buffer regions
        [titration.pKa1, titration.pKa2].forEach((pKa, idx) => {
          const pKaY = height - margin.bottom - (pKa / 14) * plotHeight;
          const bufferTop = height - margin.bottom - ((pKa + 1) / 14) * plotHeight;
          const bufferBottom = height - margin.bottom - ((pKa - 1) / 14) * plotHeight;

          ctx.fillStyle = idx === 0 ? 'rgba(251, 191, 36, 0.15)' : 'rgba(147, 197, 253, 0.15)';
          ctx.fillRect(margin.left, bufferTop, plotWidth, bufferBottom - bufferTop);

          ctx.strokeStyle = idx === 0 ? '#f59e0b' : '#3b82f6';
          ctx.setLineDash([5, 5]);
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(margin.left, pKaY);
          ctx.lineTo(width - margin.right, pKaY);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = idx === 0 ? '#f59e0b' : '#3b82f6';
          ctx.font = 'bold 11px sans-serif';
          ctx.fillText(`pKa${idx + 1} = ${pKa.toFixed(2)}`, width - 100, pKaY - 5);
        });
      } else if (titration.type === 'polyprotic-triprotic') {
        // Draw three buffer regions
        [titration.pKa1, titration.pKa2, titration.pKa3!].forEach((pKa, idx) => {
          const pKaY = height - margin.bottom - (pKa / 14) * plotHeight;
          const bufferTop = height - margin.bottom - ((pKa + 1) / 14) * plotHeight;
          const bufferBottom = height - margin.bottom - ((pKa - 1) / 14) * plotHeight;

          const colors = ['rgba(251, 191, 36, 0.15)', 'rgba(147, 197, 253, 0.15)', 'rgba(134, 239, 172, 0.15)'];
          ctx.fillStyle = colors[idx];
          ctx.fillRect(margin.left, bufferTop, plotWidth, bufferBottom - bufferTop);

          const lineColors = ['#f59e0b', '#3b82f6', '#22c55e'];
          ctx.strokeStyle = lineColors[idx];
          ctx.setLineDash([5, 5]);
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(margin.left, pKaY);
          ctx.lineTo(width - margin.right, pKaY);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = lineColors[idx];
          ctx.font = 'bold 11px sans-serif';
          ctx.fillText(`pKa${idx + 1} = ${pKa.toFixed(2)}`, width - 100, pKaY - 5);
        });
      }
    }

    // Draw titration curve
    if (curveData.length > 1) {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3;
      ctx.beginPath();

      curveData.forEach((point, index) => {
        const x = margin.left + (point.volume / 60) * plotWidth;
        const y = height - margin.bottom - (point.pH / 14) * plotHeight;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();
    }

    // Draw current point
    if (currentVolume > 0) {
      const x = margin.left + (currentVolume / 60) * plotWidth;
      const y = height - margin.bottom - (currentPH / 14) * plotHeight;

      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Draw equivalence point markers
    if (showEquivalencePoints && titration) {
      if ('equivalenceVolume' in titration && titration.equivalenceVolume) {
        const eqX = margin.left + (titration.equivalenceVolume / 60) * plotWidth;
        const eqY = height - margin.bottom - (titration.equivalencePH / 14) * plotHeight;

        ctx.fillStyle = '#22c55e';
        ctx.font = 'bold 20px sans-serif';
        ctx.fillText('⭐', eqX - 10, eqY + 7);
      } else if ('equivalenceVolumes' in titration && titration.equivalenceVolumes) {
        titration.equivalenceVolumes.forEach((eqVol, idx) => {
          const eqX = margin.left + (eqVol / 60) * plotWidth;
          const eqY = height - margin.bottom - (titration.equivalencePHs[idx] / 14) * plotHeight;

          const colors = ['#22c55e', '#3b82f6', '#f59e0b'];
          ctx.fillStyle = colors[idx] || '#22c55e';
          ctx.font = 'bold 20px sans-serif';
          ctx.fillText('⭐', eqX - 10, eqY + 7);
        });
      }
    }

    // Draw axis labels
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 14px sans-serif';

    // X-axis label
    ctx.fillText('Rúmmál bætt við (mL)', width / 2 - 70, height - 10);

    // Y-axis label
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('pH', 0, 0);
    ctx.restore();

    // pH scale numbers
    ctx.font = '12px sans-serif';
    for (let i = 0; i <= 14; i += 2) {
      const y = height - margin.bottom - (i / 14) * plotHeight;
      ctx.fillText(i.toString(), margin.left - 25, y + 4);
    }

    // Volume scale numbers
    for (let i = 0; i <= 60; i += 10) {
      const x = margin.left + (i / 60) * plotWidth;
      ctx.fillText(i.toString(), x - 8, height - margin.bottom + 20);
    }
  }, [curveData, currentVolume, currentPH, titration, showEquivalencePoints, width, height]);

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border-2 border-gray-300 rounded-lg shadow-md bg-white"
      />
    </div>
  );
};
