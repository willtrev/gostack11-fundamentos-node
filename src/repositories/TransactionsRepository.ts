import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balFilterIncome = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const balIncome = balFilterIncome.reduce((acc, cur) => acc + cur.value, 0);

    const balFilterOutcome = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const balOutcome = balFilterOutcome.reduce(
      (acc, cur) => acc + cur.value,
      0,
    );

    const balance: Balance = {
      income: balIncome,
      outcome: balOutcome,
      total: balIncome - balOutcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
