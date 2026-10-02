const fs = require('fs');
const path = require('path');

const file = path.join('E:', 'WEB & BLOCKCHAIN PORTFOLIO', 'projects', 'ledgerlite', 'client', 'src', 'App.tsx');
let content = fs.readFileSync(file, 'utf8');

// Replace mock data arrays
content = content.replace(/const demoAccounts[\s\S]*?\];/, '');
content = content.replace(/const demoTransactions[\s\S]*?\];/, '');
content = content.replace(/const demoBudgets[\s\S]*?\];/, '');

// Add data fetching to App component
const newApp = `
export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token') || null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [summary, setSummary] = useState<any>({});
  
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const fetchDashboard = async (overrideToken?: string) => {
    const activeToken = overrideToken || token;
    if (!activeToken) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/dashboard', {
        headers: { Authorization: \`Bearer \${activeToken}\` }
      });
      if (!res.ok) {
        if (res.status === 401) handleLogout();
        throw new Error('Failed to load dashboard');
      }
      const data = await res.json();
      setTransactions(data.transactions || []);
      setAccounts(data.accounts || []);
      setBudgets(data.budgets || []);
      setSummary(data.summary || {});
      if (data.accounts?.length > 0 && !selectedAccount) {
        setSelectedAccount(data.accounts[0].id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboard();
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      
      localStorage.setItem('token', data.token);
      setToken(data.token);
      
      setTransactions(data.dashboard.transactions || []);
      setAccounts(data.dashboard.accounts || []);
      setBudgets(data.dashboard.budgets || []);
      setSummary(data.dashboard.summary || {});
      if (data.dashboard.accounts?.length > 0) {
        setSelectedAccount(data.dashboard.accounts[0].id);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-sm max-w-md w-full border border-slate-100">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-indigo-600 text-white rounded-lg flex items-center justify-center mx-auto mb-4 text-xl font-bold">L</div>
            <h1 className="text-2xl font-bold text-slate-900">LedgerLite</h1>
            <p className="text-slate-500 mt-2">Sign in to your personal finance dashboard.</p>
          </div>
          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600" required />
            </div>
            <button disabled={loading} className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
            <div className="text-sm text-center text-slate-500 pt-4">
              <p>Demo Account: <br /><b>demo@waleed.dev</b> / <b>Demo@1234</b></p>
            </div>
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-2">About this project</h3>
              <p className="text-sm text-slate-600 mb-3">A full-stack personal finance dashboard (Vite + Express). Features secure JWT auth, real-time balance calculations, and categorized spending history.</p>
              <div className="flex gap-3 text-sm">
                <a href="https://github.com/Waleed-Ilyas/ledgerlite" className="text-indigo-600 hover:underline">GitHub</a>
                <a href="/work/ledgerlite" className="text-indigo-600 hover:underline">Case Study</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const activeAccounts = useMemo(() => accounts, [accounts]);
`;

content = content.replace(/export default function App\(\) \{[\s\S]*?const activeAccounts = useMemo\(\(\) => demoAccounts, \[\]\);/, newApp);

content = content.replace(/demoBudgets/g, 'budgets');
content = content.replace(/summary\.totalBalance/g, 'summary.totalBalance || 0');
content = content.replace(/summary\.monthlyIncome/g, 'summary.monthlyIncome || 0');
content = content.replace(/summary\.monthlyExpenses/g, 'summary.monthlyExpenses || 0');

// Add AddTransaction form handler
const addTxRegex = /<button type="submit" className="w-full py-2\.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors font-medium shadow-sm">[\s\S]*?Add Transaction[\s\S]*?<\/button>/;
const onSubmitHandler = `
  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${token}\`
        },
        body: JSON.stringify({
          title: data.get('title'),
          amount: Number(data.get('amount')),
          type: data.get('type'),
          category: data.get('category'),
          accountId: data.get('accountId'),
          date: data.get('date')
        })
      });
      if (res.ok) {
        form.reset();
        fetchDashboard();
      }
    } catch(err) {
      console.error(err);
    }
  };
`;
// Insert handler above return
content = content.replace(/return \(/, onSubmitHandler + '\n  return (');
content = content.replace(/<form className="p-6 space-y-4">/, '<form className="p-6 space-y-4" onSubmit={handleAddTransaction}>');
content = content.replace(/<button className="p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-100">[\s\S]*?<svg[\s\S]*?<\/svg>[\s\S]*?<\/button>/, 
  `<button onClick={handleLogout} title="Logout" className="p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-100">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
  </button>`);

// Fix <option> array map for activeAccounts
content = content.replace(
  /\{activeAccounts\.map\(\(acc\) => \([\s\S]*?<\/option>\n\s*\)\)}/,
  `{activeAccounts.map((acc) => (<option key={acc.id} value={acc.id}>{acc.name}</option>))}`
);

fs.writeFileSync(file, content);
console.log('App.tsx rewritten.');
