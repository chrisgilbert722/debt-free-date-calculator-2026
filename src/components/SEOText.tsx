import React from 'react';

export const SEOText: React.FC = () => {
    return (
        <div className="card" style={{ background: '#F8FAFC' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                This debt-free date calculator provides estimated payoff timelines based on your
                debt balance, monthly payment, and interest rate. The calculator assumes consistent
                monthly payments and a fixed interest rate throughout the payoff period. These
                figures are estimates only and actual payoff dates may vary based on payment
                timing, rate changes, and additional charges. This calculator is for informational
                purposes and does not constitute financial advice.
            </p>
        </div>
    );
};
