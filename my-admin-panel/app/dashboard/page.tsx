// app/dashboard/page.tsx

'use client'; // ক্লায়েন্ট সাইড ইন্টারেক্টিভিটির জন্যে প্রয়োজনীয়

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // এই useEffect হুকটা পেজ লোড হওয়ার সাথে সাথে চলবে
  useEffect(() => {
    // --- গুরুত্বপূর্ণ সুরক্ষা চেক ---
    // এটা একটা খুবই সাধারণ উপায়। আসলে আমরা সেশন (Session) বা টোকেন (Token) ব্যবহার করব।
    // এখন আমরা শুধু চেক করছি যে ইউজার লগইন পেজ থেকে এসেছে কিনা।
    const checkAuth = () => {
      // localStorage থেকে একটা ডামি টোকেন চেক করা হচ্ছে
      // লগইন সফল হলে আমরা এই টোকেনটা সেভ করব
      const token = localStorage.getItem('authToken');
      if (token) {
        setIsAuthenticated(true);
      } else {
        // যদি টোকেন না থাকে, তাহলে লগইন পেজে পাঠিয়ে দেবে
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  // লগআউট ফাংশন
  const handleLogout = () => {
    // localStorage থেকে টোকেনটা মুছে দেওয়া হচ্ছে
    localStorage.removeItem('authToken');
    // লগইন পেজে পাঠিয়ে দেওয়া হচ্ছে
    router.push('/login');
  };

  // যদি ইউজার এখনও অথেনটিকেটেড না হয়, তাহলে কিছুই দেখাবে না
  if (!isAuthenticated) {
    return null; // বা একটা লোডিং স্পিনার দেখাতে পারে
  }

  return (
    <div className="dashboard-container">
      {/* ড্যাশবোর্ডের হেডার */}
      <header className="dashboard-header">
        <h1>এডমিন ড্যাশবোর্ড</h1>
        <button onClick={handleLogout} className="logout-btn">
          লগআউট
        </button>
      </header>

      {/* ড্যাশবোর্ডের মূল কন্টেন্ট */}
      <main className="dashboard-main">
        <section className="welcome-section">
          <h2>স্বাগতম, এডমিন!</h2>
          <p>এটা আপনার এডমিন প্যানেল। এখান থেকে আপনি আপনার ওয়েবসাইট পরিচালনা করতে পারবেন।</p>
        </section>

        <section className="stats-section">
          <h3>এক নজরে</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <h4>মোট নোটিশ</h4>
              <p className="stat-number">১২</p>
            </div>
            <div className="stat-card">
              <h4>মোট শিক্ষক</h4>
              <p className="stat-number">৮</p>
            </div>
            <div className="stat-card">
              <h4>মোট ছাত্র</h4>
              <p className="stat-number">২৫০+</p>
            </div>
          </div>
        </section>

        <section className="quick-actions">
          <h3>দ্রুত কাজ</h3>
          <div className="action-buttons">
            <button className="action-btn">নতুন নোটিশ যোগ করুন</button>
            <button className="action-btn">গ্যালারি আপডেট করুন</button>
            <button className="action-btn">শিক্ষক যোগ করুন</button>
          </div>
        </section>
      </main>
    </div>
  );
}