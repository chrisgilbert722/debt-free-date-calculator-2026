import React from 'react';
import type { DebtFreeResult } from '../logic/debtFreeCalculations';

interface ResultsPanelProps {
    result: DebtFreeResult;
}

const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(val);
};

const formatTime = (months: number): string => {
    if (months >= 600) {
        return '50+ years';
    }
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) {
        return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
    if (remainingMonths === 0) {
        return `${years} year${years !== 1 ? 's' : ''}`;
    }
    return `${years} yr${years !== 1 ? 's' : ''} ${remainingMonths} mo`;
};

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ result }) => {
    const isOnTrack = result.canPayOff && result.monthsRemaining < 600;

    return (
        <div className="card" style={{
            background: isOnTrack
                ? 'linear-gradient(to bottom, #F0FDF4, #DCFCE7)'
                : 'linear-gradient(to bottom, #FEF3C7, #FDE68A)',
            borderColor: isOnTrack ? '#86EFAC' : '#FCD34D',
            boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.1)'
        }}>
            <div className="text-center">
                <h2 style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                    Estimated Debt-Free Date
                </h2>
                <div style={{
                    fontSize: '2.25rem',
                    fontWeight: 800,
                    color: isOnTrack ? '#166534' : '#92400E',
                    lineHeight: 1,
                    letterSpacing: '-0.025em'
                }}>
                    {result.debtFreeDateFormatted}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
                    {result.payoffMessage}
                </div>
            </div>

            <hr style={{
                margin: 'var(--space-6) 0',
                border: 'none',
                borderTop: `1px solid ${isOnTrack ? '#86EFAC' : '#FCD34D'}`
            }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-2)', textAlign: 'center' }}>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>MONTHS LEFT</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>
                        {formatTime(result.monthsRemaining)}
                    </div>
                </div>
                <div style={{ borderLeft: `1px solid ${isOnTrack ? '#86EFAC' : '#FCD34D'}`, borderRight: `1px solid ${isOnTrack ? '#86EFAC' : '#FCD34D'}` }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>TOTAL INTEREST</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem', color: '#B91C1C' }}>
                        {formatCurrency(result.totalInterestPaid)}
                    </div>
                </div>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>TOTAL PAID</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>
                        {formatCurrency(result.totalAmountPaid)}
                    </div>
                </div>
            </div>
        </div>
    );
};
