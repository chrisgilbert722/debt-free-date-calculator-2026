import React from 'react';
import type { DebtFreeResult } from '../logic/debtFreeCalculations';

interface BreakdownTableProps {
    result: DebtFreeResult;
}

const formatMoney = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
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
    return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
};

export const BreakdownTable: React.FC<BreakdownTableProps> = ({ result }) => {
    const balanceRows = [
        { label: 'Estimated Starting Balance', value: formatMoney(result.startingBalance), isTotal: false },
        { label: 'Estimated Monthly Payment', value: formatMoney(result.monthlyPayment), isTotal: false },
        { label: 'Annual Interest Rate', value: `${result.interestRate.toFixed(2)}%`, isTotal: false },
    ];

    const payoffRows = [
        { label: 'Estimated Debt-Free Date', value: result.debtFreeDateFormatted, isTotal: false },
        { label: 'Estimated Months Remaining', value: formatTime(result.monthsRemaining), isTotal: false },
        { label: 'Estimated Total Interest Paid', value: formatMoney(result.totalInterestPaid), isTotal: false },
        { label: 'Estimated Total Amount Paid', value: formatMoney(result.totalAmountPaid), isTotal: true },
    ];

    const comparisonRows = [
        { label: 'Original Debt', value: formatMoney(result.startingBalance), isTotal: false },
        { label: 'Total Interest Over Time', value: formatMoney(result.totalInterestPaid), isTotal: false },
        { label: 'Interest as % of Debt', value: result.startingBalance > 0 ? `${((result.totalInterestPaid / result.startingBalance) * 100).toFixed(0)}%` : '0%', isTotal: false },
    ];

    const renderTable = (rows: Array<{ label: string; value: string; isTotal: boolean }>, isLast = false) => (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
            <tbody>
                {rows.map((row, idx) => (
                    <tr key={idx} style={{
                        borderBottom: (isLast && idx === rows.length - 1) ? 'none' : '1px solid var(--color-border)',
                        backgroundColor: idx % 2 === 0 ? 'transparent' : '#F8FAFC'
                    }}>
                        <td style={{ padding: 'var(--space-3) var(--space-6)', color: 'var(--color-text-secondary)' }}>
                            {row.label}
                        </td>
                        <td style={{
                            padding: 'var(--space-3) var(--space-6)',
                            textAlign: 'right',
                            fontWeight: row.isTotal ? 700 : 400,
                            color: row.isTotal ? 'var(--color-primary)' : 'inherit'
                        }}>
                            {row.value}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className="card" style={{ padding: '0' }}>
            {/* Balance Details Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '1rem' }}>Estimated Debt Details</h3>
            </div>
            {renderTable(balanceRows)}

            {/* Payoff Timeline Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: '#F0FDF4' }}>
                <h3 style={{ fontSize: '1rem', color: '#166534' }}>Estimated Payoff Timeline</h3>
            </div>
            {renderTable(payoffRows)}

            {/* Interest Impact Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: '#F8FAFC' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>Estimated Interest Impact</h3>
            </div>
            {renderTable(comparisonRows, true)}
        </div>
    );
};
