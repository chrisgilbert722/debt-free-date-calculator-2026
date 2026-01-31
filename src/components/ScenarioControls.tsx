import React from 'react';
import type { DebtFreeInput } from '../logic/debtFreeCalculations';

interface ScenarioControlsProps {
    values: DebtFreeInput;
    onChange: (field: keyof DebtFreeInput, value: number | boolean) => void;
}

export const ScenarioControls: React.FC<ScenarioControlsProps> = ({ values, onChange }) => {
    const debtOptions = [
        { label: '$5,000', value: 5000 },
        { label: '$15,000', value: 15000 },
        { label: '$30,000', value: 30000 },
        { label: '$50,000', value: 50000 },
    ];

    const paymentOptions = [
        { label: '$200', value: 200 },
        { label: '$400', value: 400 },
        { label: '$600', value: 600 },
        { label: '$1,000', value: 1000 },
    ];

    return (
        <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Quick Adjustments</h3>

            {/* Debt Quick Select */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ marginBottom: 'var(--space-2)' }}>Total Debt</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {debtOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('totalDebt', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.totalDebt === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.totalDebt === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.totalDebt === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Payment Quick Select */}
            <div>
                <label style={{ marginBottom: 'var(--space-2)' }}>Monthly Payment</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {paymentOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('monthlyPayment', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.monthlyPayment === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.monthlyPayment === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.monthlyPayment === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
