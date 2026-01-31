export interface DebtFreeInput {
    totalDebt: number;
    monthlyPayment: number;
    interestRate: number; // Annual percentage rate
}

export interface DebtFreeResult {
    debtFreeDate: Date;
    debtFreeDateFormatted: string;
    monthsRemaining: number;
    yearsRemaining: number;
    totalInterestPaid: number;
    totalAmountPaid: number;
    startingBalance: number;
    monthlyPayment: number;
    interestRate: number;
    canPayOff: boolean;
    payoffMessage: string;
}

export function calculateDebtFreeDate(input: DebtFreeInput): DebtFreeResult {
    const totalDebt = Math.max(0, input.totalDebt);
    const monthlyPayment = Math.max(0, input.monthlyPayment);
    const interestRate = Math.max(0, Math.min(100, input.interestRate));

    const monthlyInterestRate = interestRate / 100 / 12;

    // Check if payment covers at least the first month's interest
    const firstMonthInterest = totalDebt * monthlyInterestRate;
    const canPayOff = monthlyPayment > firstMonthInterest || interestRate === 0;

    let remainingBalance = totalDebt;
    let totalInterestPaid = 0;
    let monthsRemaining = 0;
    const maxMonths = 600; // 50 years cap

    if (canPayOff && totalDebt > 0 && monthlyPayment > 0) {
        while (remainingBalance > 0.01 && monthsRemaining < maxMonths) {
            // Calculate interest for this month
            const monthlyInterest = remainingBalance * monthlyInterestRate;
            totalInterestPaid += monthlyInterest;

            // Add interest to balance
            remainingBalance += monthlyInterest;

            // Apply payment (can't pay more than remaining balance)
            const payment = Math.min(monthlyPayment, remainingBalance);
            remainingBalance -= payment;

            monthsRemaining++;
        }
    } else if (totalDebt > 0 && monthlyPayment > 0 && !canPayOff) {
        // Payment doesn't cover interest - will never pay off
        monthsRemaining = maxMonths;
    }

    // Calculate debt-free date
    const now = new Date();
    const debtFreeDate = new Date(now);
    debtFreeDate.setMonth(debtFreeDate.getMonth() + monthsRemaining);

    // Format the date
    const debtFreeDateFormatted = monthsRemaining >= maxMonths
        ? 'Beyond 50 years'
        : debtFreeDate.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });

    const yearsRemaining = monthsRemaining / 12;
    const totalAmountPaid = totalDebt + totalInterestPaid;

    // Generate payoff message
    let payoffMessage: string;
    if (totalDebt === 0) {
        payoffMessage = 'No debt to pay off';
    } else if (monthlyPayment === 0) {
        payoffMessage = 'Enter a monthly payment amount';
    } else if (!canPayOff) {
        payoffMessage = 'Monthly payment does not cover interest';
    } else if (monthsRemaining >= maxMonths) {
        payoffMessage = 'Payoff exceeds 50 years';
    } else if (monthsRemaining <= 12) {
        payoffMessage = 'On track to be debt-free within a year';
    } else if (monthsRemaining <= 60) {
        payoffMessage = 'On track to be debt-free within 5 years';
    } else {
        payoffMessage = 'Consider increasing payments to accelerate payoff';
    }

    return {
        debtFreeDate,
        debtFreeDateFormatted,
        monthsRemaining,
        yearsRemaining,
        totalInterestPaid,
        totalAmountPaid,
        startingBalance: totalDebt,
        monthlyPayment,
        interestRate,
        canPayOff,
        payoffMessage
    };
}
