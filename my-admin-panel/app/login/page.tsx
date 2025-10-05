// app/login/page.tsx

'use client'; // এই ফাইলটাকে ক্লায়েন্ট সাইড ইন্টারেক্টিভিটি (useState, onClick ইত্যাদি) ব্যবহার করতে হবে বলে দেওয়া হয়।

// React থেকে প্রয়োজনীয় হুক ইমপোর্ট করা হচ্ছে
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; // পেজ রিডিরেক্ট করার জন্যে হুক ইমপোর্ট করা হচ্ছে

// আমাদের লগইন পেজের মূল কম্পোনেন্ট ফাংশন
export default function LoginPage() {
  // স্টেট ভেরিয়েবল ডিক্লেয়ার হচ্ছে
  const [username, setUsername] = useState(''); // ইউজারনেম ইনপুট ফিল্ডের জন্যে
  const [password, setPassword] = useState(''); // পাসওয়ার্ড ইনপুট ফিল্ডের জন্যে
  const [error, setError] = useState(''); // এরর মেসেজ দেখানোর জন্যে
  const [isLoading, setIsLoading] = useState(false); // লোডিং স্পিনার দেখানোর জন্যে

  const router = useRouter(); // রাউটার হুক নেওয়া হচ্ছে

  // ফর্ম সাবমিট হলে এই ফাংশনটা কল হবে
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ফর্ম সাবমিট হলে পেজ রিলোড হওয়া বন্ধ করে
    setError(''); // পুরনো এরর মেসেজ মুছে ফেলা
    setIsLoading(true); // লোডিং স্টেট শুরু করা

    try {
      // আমাদের API এন্ডপয়েন্টে একটা POST রিকোয়েস্ট পাঠানো হচ্ছে
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // আমরা যে ডাটা পাঠাচ্ছি সেটা JSON ফরম্যাটে বলে দিচ্ছি
        },
        body: JSON.stringify({ username, password }), // ইউজারনেম এবং পাসওয়ার্ড কে JSON স্ট্রিং এ কনভার্ট করে বডি তৈরি করছি
      });

      // সার্ভার থেকে রেসপন্স পাওয়া হচ্ছে
      const data = await response.json();

      // রেসপন্সের `success` প্রপার্টি চেক করা হচ্ছে
      if (data.success) {
        // লগইন সফল হলে:
        
        // একটা ডামি টোকেন লোকাল স্টোরেজে সেভ করা হচ্ছে
        // এটা একটা খুবই সাধারণ উপায়। পরে আমরা JWT (JSON Web Token) ব্যবহার করব।
        localStorage.setItem('authToken', 'your-secret-token-here');
        
        // ড্যাশবোর্ড পেজে রিডিরেক্ট করা হচ্ছে
        router.push('/dashboard');
        
      } else {
        // লগিন ব্যর্থ হলে (যেমন: ভুল ইউজারনেম/পাসওয়ার্ড):
        setError(data.message); // সার্ভার থেকে আসা এরর মেসেজটা স্টেট করা হচ্ছে
      }
    } catch (err) {
      // যদি নেটওয়ার্ক এরর হয় (যেমন: API ডাউন থাকলে, সার্ভার চলে না):
      setError('সার্ভারের সাথে যোগাযোগ করতে সমস্যা হচ্ছে।');
    } finally {
      // সফল বা ব্যর্থ, যাই হোক না কেন লোডিং স্পিনারটা বন্ধ করে দেবে
      setIsLoading(false);
    }
  };

  // পেজের যে অংশ দৃশ্যমানে থাকবে (HTML)
  return (
    <div className="login-container">
      <h2>এডমিন লগইন</h2>
      <form onSubmit={handleSubmit}>
          <div className="form-group">
              <label htmlFor="username">ইউজারনেম:</label>
              <input 
                  type="text" 
                  id="username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // ইনপুট ফিল্ডে কিছু লিখলে স্টেট আপডেট হবে
                  required 
              />
          </div>
          <div className="form-group">
              <label htmlFor="password">পাসওয়ার্ড:</label>
              <input 
                  type="password" 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // পাসওয়ার্ড ইনপুট ফিল্ডে কিছু লিখলে স্টেট আপডেট হবে
                  required 
              />
          </div>
          <button type="submit" className="btn" disabled={isLoading}>
            {/* লোডিং এর সময় বাটনের টেক্স পরিবর্তন হবে */}
            {isLoading ? 'লগইন হচ্ছে...' : 'লগইন'}
          </button>
          {/* যদি এরর স্টেটে কোনো মেসেজ থাকে, তাহলে এটা দেখাবে */}
          {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}