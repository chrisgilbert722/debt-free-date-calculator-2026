import React from 'react';
import type { DebtFreeInput } from '../logic/debtFreeCalculations';

interface InputCardProps {
    values: DebtFreeInput;
    onChange: (field: keyof DebtFreeInput, value: number | boolean) => void;
}

export const InputCard: React.FC<InputCardProps> = ({ values, onChange }) => {
    return (
        <div className="card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {/* Total Debt Balance */}
                <div>
                    <label htmlFor="totalDebt">Total Debt Balance ($)</label>
                    <input
                        type="number"
                        id="totalDebt"
                        value={values.totalDebt}
                        onChange={(e) => onChange('totalDebt', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="500"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Your current total debt balance
                    </span>
                </div>

                {/* Monthly Payment */}
                <div>
                    <label htmlFor="monthlyPayment">Monthly Payment ($)</label>
                    <input
                        type="number"
                        id="monthlyPayment"
                        value={values.monthlyPayment}
                        onChange={(e) => onChange('monthlyPayment', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="50"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        The amount you plan to pay each month
                    </span>
                </div>

                {/* Interest Rate */}
                <div>
                    <label htmlFor="interestRate">Annual Interest Rate (%)</label>
                    <input
                        type="number"
                        id="interestRate"
                        value={values.interestRate}
                        onChange={(e) => onChange('interestRate', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="100"
                        step="0.5"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Your debt's annual interest rate (APR)
                    </span>
                </div>
            </div>
        </div>
    );
};
