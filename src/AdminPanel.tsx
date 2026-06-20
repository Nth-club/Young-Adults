import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { api, RegistrationData as Student } from './services/api';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  MapPin, 
  Search, 
  Download, 
  Trash2, 
  User as UserIcon, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  ArrowLeft,
  RefreshCw
} from 'lucide-react';

export default function AdminPanel() {
  const navigate = useNavigate();

  // Admin isolated theme matching system preference
  const [adminTheme] = useState<'light' | 'dark'>(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    !!localStorage.getItem('ya-admin-token')
  );
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Tabs ('dashboard' | 'students' | 'new')
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'new'>('dashboard');

  // Backend Data State
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  // Students Table Search and Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [branchFilter, setBranchFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const fetchStudents = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const data = await api.getRegistrations();
      setStudents(data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
      if ((error as any).message === 'Unauthorized') {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
    // Simple polling every 30 seconds for "real-time" feel
    const interval = setInterval(fetchStudents, 30000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // Handle Login Validation
  const handleLoginSubmit = async () => {
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const response = await api.login(loginData);
      localStorage.setItem('ya-admin-token', response.token);
      localStorage.setItem('ya-admin-user', JSON.stringify(response.user));
      setIsAuthenticated(true);
    } catch (error) {
      setLoginError('Invalid admin username or password');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ya-admin-token');
    localStorage.removeItem('ya-admin-user');
    setIsAuthenticated(false);
  };

  // Helper date formatter: formatted "DD MMM YYYY"
  const formatDate = (createdAt: any) => {
    if (!createdAt) return '—';
    const date = new Date(createdAt);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Update Status
  const handleStatusChange = async (studentId: number, newStatus: Student['status']) => {
    try {
      await api.updateStatus(studentId, newStatus);
      setStudents(prev => prev.map(s => s.id === studentId ? { ...s, status: newStatus } : s));
    } catch (error) {
      alert('Failed to update status');
    }
  };

  // Delete Student Document
  const handleDeleteStudent = async (studentId: number) => {
    if (window.confirm("Are you sure you want to delete this student registration permanently?")) {
      try {
        await api.deleteRegistration(studentId);
        setStudents(prev => prev.filter(s => s.id !== studentId));
      } catch (error) {
        alert('Failed to delete registration');
      }
    }
  };

  // Mark as Contacted Action (New Entries Tab)
  const handleMarkAsContacted = async (studentId: number) => {
    try {
      await api.updateStatus(studentId, 'contacted');
      setStudents(prev => prev.map(s => s.id === studentId ? { ...s, status: 'contacted' } : s));
    } catch (error) {
      alert('Failed to update status');
    }
  };

  // Horizontal Course distribution CSS chart builder
  const buildCourseChartData = () => {
    const courseCounts = students.reduce((acc, s) => {
      acc[s.course] = (acc[s.course] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const totalCount = students.length;

    return Object.entries(courseCounts).map(([course, count]) => ({
      course,
      count: Number(count),
      percentage: totalCount > 0 ? (Number(count) / totalCount) * 100 : 0
    })).sort((a, b) => Number(b.count) - Number(a.count));
  };

  // Filtered Students (Search Query, Course, Branch)
  const getFilteredStudents = () => {
    return students.filter((s) => {
      const nameMatch = s.name?.toLowerCase().includes(searchQuery.toLowerCase());
      const phoneMatch = s.phone?.includes(searchQuery);
      const searchMatch = nameMatch || phoneMatch;

      const courseMatch = courseFilter === 'All' || s.course === courseFilter;
      const branchMatch = branchFilter === 'All' || s.branch === branchFilter;

      return searchMatch && courseMatch && branchMatch;
    });
  };

  // Export CSV of filtered list with Blob API
  const handleExportCSV = () => {
    const filteredList = getFilteredStudents();
    const headers = ["ID", "Full Name", "Phone", "Course", "Branch", "Date Registered", "Status"];
    
    const rows = filteredList.map((s, idx) => [
      idx + 1,
      s.name,
      s.phone,
      s.course,
      s.branch,
      formatDate(s.createdAt),
      s.status
    ]);

    const csvContent = [
      headers,
      ...rows
    ].map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `young_adults_admin_students_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pagination bounds calculation
  const filteredStudents = getFilteredStudents();
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Available unique fields list for filters
  const uniqueCourses = ['All', ...Array.from(new Set(students.map(s => s.course)))].filter(Boolean);
  const uniqueBranches = ['All', ...Array.from(new Set(students.map(s => s.branch)))].filter(Boolean);

  const currentUser = JSON.parse(localStorage.getItem('ya-admin-user') || '{}');

  return (
    <div className={adminTheme === 'dark' ? 'dark' : ''} id="admin-isolated-root-container">
      <div className="min-h-screen bg-slate-50 text-[#1D1F29] dark:bg-[#1D1F29] dark:text-white font-sans transition-colors duration-300">
        
        {!isAuthenticated ? (
          <div id="admin-login-layout" className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-slate-100 dark:bg-[#161720]">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/[0.04] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/[0.04] rounded-full blur-3xl pointer-events-none" />

            <div id="login-form-card" className="max-w-sm w-full bg-white/70 dark:bg-white/5 border border-white/20 dark:border-white/10 p-8 rounded-3xl shadow-2xl glass-card text-left">
              <button
                id="back-to-site-btn"
                onClick={() => navigate('/')}
                className="cursor-pointer flex items-center gap-1.5 text-xs text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#6366F1] dark:hover:text-[#818CF8] mb-6 transition-colors"
              >
                <ArrowLeft size={14} /> Back to website
              </button>

              <div className="flex flex-col items-center mb-8">
                <div className="w-12 h-12 bg-[#6366F1]/5 dark:bg-[#818CF8]/5 rounded-2xl flex items-center justify-center mb-3">
                  <span className="font-serif text-xl font-bold text-[#6366F1] dark:text-[#818CF8]">YA</span>
                </div>
                <h1 className="font-serif font-black text-2xl tracking-tight text-[#1D1F29] dark:text-white uppercase select-none">
                  Admin Panel
                </h1>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-1 select-none uppercase">
                    Username
                  </label>
                  <div className="relative">
                    <UserIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                    <input
                      type="text"
                      placeholder="Username"
                      value={loginData.username}
                      onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                      className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl pl-11 pr-4 py-3 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 focus:border-[#6366F1] dark:focus:border-[#818CF8] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-1 select-none uppercase">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl pl-11 pr-11 py-3 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 focus:border-[#6366F1] dark:focus:border-[#818CF8] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {loginError && (
                    <motion.p
                      key="loginError"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ 
                        opacity: 1, 
                        x: [-8, 8, -8, 8, 0],
                        transition: { duration: 0.4 } 
                      }}
                      exit={{ opacity: 0 }}
                      className="text-red-500 text-xs text-center font-sans font-medium"
                    >
                      ⚠️ {loginError}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  id="admin-login-submit-btn"
                  onClick={handleLoginSubmit}
                  disabled={isLoggingIn}
                  className={`cursor-pointer w-full bg-[#6366F1] hover:bg-[#4F46E5] dark:bg-[#818CF8] dark:hover:bg-[#6366F1] text-white py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-lg hover:shadow-indigo-500/10 transition-all duration-250 active:scale-98 block mt-4 ${isLoggingIn ? 'opacity-70' : ''}`}
                >
                  {isLoggingIn ? 'Signing In...' : 'Sign In to Panel'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div id="admin-authenticated-layout" className="flex min-h-screen">
            <aside id="admin-sidebar" className="w-64 bg-white/80 dark:bg-white/5 border-r border-slate-200 dark:border-white/10 fixed top-0 bottom-0 left-0 flex flex-col justify-between py-6 z-30 glass-card">
              <div>
                <div className="px-6 pb-6 border-b border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="w-8 h-8 rounded-xl bg-[#6366F1] dark:bg-[#818CF8] flex items-center justify-center">
                      <span className="font-serif font-black text-sm text-white">YA</span>
                    </div>
                    <span className="font-serif font-black text-sm tracking-tight text-[#1D1F29] dark:text-white uppercase select-none">
                      Admin Panel
                    </span>
                  </div>
                </div>

                <nav className="space-y-1.5 mt-8 px-2">
                  {[
                    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                    { id: 'students', label: 'Students', icon: Users },
                    { id: 'new', label: 'New Entries', icon: UserPlus }
                  ].map((item) => {
                    const isActive = activeTab === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id as any);
                          setCurrentPage(1);
                        }}
                        className={`w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                          isActive
                            ? 'bg-[#6366F1]/10 text-[#6366F1] dark:bg-[#818CF8]/15 dark:text-[#818CF8] border-l-3 border-[#6366F1] dark:border-[#818CF8]'
                            : 'text-[#6B7280] dark:text-[#9CA3AF] hover:bg-slate-50 dark:hover:bg-white/5 hover:text-[#1D1F29] dark:hover:text-white'
                        }`}
                      >
                        <Icon size={16} />
                        {item.label}
                        {item.id === 'new' && students.filter(s => s.status === 'new').length > 0 && (
                          <span className="ml-auto w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="px-4">
                <button
                  id="admin-logout-trigger"
                  onClick={handleLogout}
                  className="cursor-pointer w-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-[#6B7280] dark:text-gray-300 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all active:scale-95 border border-slate-200/50 dark:border-white/10 flex items-center justify-center gap-1.5"
                >
                  Sign Out
                </button>
              </div>
            </aside>

            <main id="admin-main-container" className="flex-1 ml-64 p-8 min-h-screen text-left">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-white/5">
                <div>
                  <h2 className="text-2xl font-bold text-[#1D1F29] dark:text-white">
                    {activeTab === 'dashboard' ? 'Overview Statistics' : activeTab === 'students' ? 'Students Management' : 'Recent Registrations'}
                  </h2>
                  <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 font-mono">
                    Logged in as: {currentUser.username || 'admin'}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={fetchStudents}
                    className="cursor-pointer flex items-center gap-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm"
                  >
                    <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
                  </button>
                  <button
                    id="header-back-client-nav"
                    onClick={() => navigate('/')}
                    className="cursor-pointer flex items-center gap-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm"
                  >
                    <ArrowLeft size={14} /> Back to Website
                  </button>
                </div>
              </div>

              {activeTab === 'dashboard' && (
                <div id="tab-dashboard-layout" className="space-y-10">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 p-6 rounded-2xl flex items-center gap-5 shadow-sm">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                        <Users size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#6B7280] dark:text-[#9CA3AF] font-bold">Total Students</span>
                        <h3 className="text-3xl font-bold text-[#1D1F29] dark:text-white mt-1 leading-none">{students.length}</h3>
                      </div>
                    </div>

                    {(() => {
                      const newCount = students.filter(s => s.status === 'new').length;
                      return (
                        <motion.div
                          animate={newCount > 0 ? { scale: [1, 1.03, 1] } : {}}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                          className="bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 p-6 rounded-2xl flex items-center gap-5 shadow-sm"
                        >
                          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                            <UserPlus size={20} />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase text-[#6B7280] dark:text-[#9CA3AF] font-bold">New Entries</span>
                            <h3 className="text-3xl font-bold text-[#1D1F29] dark:text-white mt-1 leading-none">{newCount}</h3>
                          </div>
                        </motion.div>
                      );
                    })()}

                    <div className="bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 p-6 rounded-2xl flex items-center gap-5 shadow-sm">
                      <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#6B7280] dark:text-[#9CA3AF] font-bold">Grammar Campus</span>
                        <h3 className="text-3xl font-bold text-[#1D1F29] dark:text-white mt-1 leading-none">
                          {students.filter(s => s.branch && (s.branch.includes('Grammar') || s.branch.includes('kampusi'))).length}
                        </h3>
                      </div>
                    </div>

                    <div className="bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 p-6 rounded-2xl flex items-center gap-5 shadow-sm">
                      <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#6B7280] dark:text-[#9CA3AF] font-bold">IELTS Campus</span>
                        <h3 className="text-3xl font-bold text-[#1D1F29] dark:text-white mt-1 leading-none">
                          {students.filter(s => s.branch && (s.branch.includes('IELTS') || s.branch.includes('kampusi'))).length}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 p-8 rounded-3xl shadow-sm">
                    <h3 className="font-bold text-[16px] text-[#1D1F29] dark:text-white mb-6 select-none uppercase tracking-wider font-sans">
                      Course Distribution Chart
                    </h3>

                    <div className="space-y-5">
                      {buildCourseChartData().length === 0 ? (
                        <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] text-center py-6">No registrations found yet to display.</p>
                      ) : (
                        buildCourseChartData().map((item) => (
                          <div key={item.course} className="flex items-center gap-4">
                            <span className="text-sm font-semibold text-[#1D1F29] dark:text-slate-200 w-48 truncate text-left">
                              {item.course}
                            </span>
                            <div className="bg-slate-100 dark:bg-slate-800 h-3 flex-1 rounded-full overflow-hidden relative border border-slate-200/30">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${item.percentage}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="bg-[#6366F1] dark:bg-[#818CF8] h-full rounded-full" 
                              />
                            </div>
                            <span className="text-xs font-mono font-bold text-[#6B7280] dark:text-[#9CA3AF] w-12 text-right">
                              {item.count} std
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'students' && (
                <div id="tab-students-layout" className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
                    <div className="flex flex-wrap flex-1 gap-3 items-center">
                      <div className="relative w-64">
                        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                        <input
                          type="text"
                          placeholder="Search student profile..."
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                          }}
                          className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-[#6366F1] dark:focus:ring-[#818CF8]"
                        />
                      </div>

                      <select
                        value={courseFilter}
                        onChange={(e) => {
                          setCourseFilter(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="bg-white dark:bg-[#1E202C] border border-slate-200 dark:border-white/10 px-3 py-2.5 rounded-xl text-xs focus:outline-none cursor-pointer text-[#1D1F29] dark:text-slate-300 font-mono"
                      >
                        <option value="All">All Courses</option>
                        {uniqueCourses.map((course) => course !== 'All' && (
                          <option key={course as string} value={course as string}>{course}</option>
                        ))}
                      </select>

                      <select
                        value={branchFilter}
                        onChange={(e) => {
                          setBranchFilter(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="bg-white dark:bg-[#1E202C] border border-slate-200 dark:border-white/10 px-3 py-2.5 rounded-xl text-xs focus:outline-none cursor-pointer text-[#1D1F29] dark:text-slate-300 font-mono"
                      >
                        <option value="All">All Branches</option>
                        {uniqueBranches.map((branch) => branch !== 'All' && (
                          <option key={branch as string} value={branch as string}>{branch}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      id="export-csv-btn"
                      onClick={handleExportCSV}
                      className="cursor-pointer bg-[#6366F1] hover:bg-[#4F46E5] dark:bg-[#818CF8] dark:hover:bg-[#6366F1] text-white px-5 py-2.5 rounded-xl text-xs font-bold font-mono tracking-wider uppercase inline-flex items-center gap-2 shadow-sm shrink-0"
                    >
                      <Download size={14} /> Export CSV
                    </button>
                  </div>

                  <div className="bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto w-full">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-[#6366F1]/5 dark:bg-[#818CF8]/10 text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-white/5">
                          <tr>
                            <th scope="col" className="px-5 py-4">#</th>
                            <th scope="col" className="px-5 py-4">Full Name</th>
                            <th scope="col" className="px-5 py-4">Phone</th>
                            <th scope="col" className="px-5 py-4">Course</th>
                            <th scope="col" className="px-5 py-4">Branch</th>
                            <th scope="col" className="px-5 py-4">Registration Date</th>
                            <th scope="col" className="px-5 py-4">Status</th>
                            <th scope="col" className="px-5 py-4">Actions</th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                          {loading ? (
                            <tr>
                              <td colSpan={8} className="px-5 py-12 text-center text-xs text-[#6B7280] dark:text-[#9CA3AF] font-mono animate-pulse">
                                Loading Student Dossiers...
                              </td>
                            </tr>
                          ) : paginatedStudents.length === 0 ? (
                            <tr>
                              <td colSpan={8} className="px-5 py-12 text-center text-xs text-[#6B7280] dark:text-[#9CA3AF] font-mono">
                                No student records found.
                              </td>
                            </tr>
                          ) : (
                            paginatedStudents.map((student, idx) => {
                              const absoluteIndex = (currentPage - 1) * itemsPerPage + idx + 1;
                              return (
                                <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                                  <td className="px-5 py-4 font-mono text-[12px] text-[#6B7280] dark:text-[#9CA3AF]">{absoluteIndex}</td>
                                  <td className="px-5 py-4 font-semibold text-primary">{student.name}</td>
                                  <td className="px-5 py-4 font-mono text-[13px]">
                                    <a 
                                      href={`tel:${student.phone}`} 
                                      className="text-[#6366F1] dark:text-[#818CF8] hover:underline"
                                    >
                                      {student.phone}
                                    </a>
                                  </td>
                                  <td className="px-5 py-4">
                                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-[#6366F1] dark:text-[#818CF8] border border-indigo-100/30">
                                      {student.course}
                                    </span>
                                  </td>
                                  <td className="px-5 py-4 text-xs text-secondary">{student.branch}</td>
                                  <td className="px-5 py-4 font-mono text-[12px] text-secondary">{formatDate(student.createdAt)}</td>
                                  <td className="px-5 py-4">
                                    <select
                                      value={student.status}
                                      onChange={(e) => handleStatusChange(student.id!, e.target.value as any)}
                                      className={`px-2 py-1 rounded-lg text-xs font-mono font-bold tracking-wide focus:outline-none cursor-pointer border ${
                                        student.status === 'new' 
                                          ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 border-emerald-200/50' 
                                          : student.status === 'contacted'
                                          ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400 border-amber-200/50'
                                          : 'bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400 border-blue-200/50'
                                      }`}
                                    >
                                      <option value="new">New</option>
                                      <option value="contacted">Contacted</option>
                                      <option value="enrolled">Enrolled</option>
                                    </select>
                                  </td>

                                  <td className="px-5 py-4">
                                    <button
                                      onClick={() => handleDeleteStudent(student.id!)}
                                      className="cursor-pointer text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 p-2 rounded-lg transition-colors inline-block"
                                      title="Delete Registration"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>

                    {totalPages > 1 && (
                      <div id="table-pagination-nav" className="flex items-center justify-between px-5 py-4 bg-slate-50/50 dark:bg-white/[0.01] border-t border-slate-100 dark:border-white/5 font-mono text-xs">
                        <span className="text-[#6B7280] dark:text-[#9CA3AF]">
                          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> ({filteredStudents.length} entries)
                        </span>

                        <div className="flex gap-2">
                          <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-lg disabled:opacity-50 transition-all font-bold cursor-pointer"
                          >
                            Prev
                          </button>
                          <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-lg disabled:opacity-50 transition-all font-bold cursor-pointer"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'new' && (
                <div id="tab-new-entries-layout" className="space-y-6">
                  <div className="bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto w-full">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-[#6366F1]/5 dark:bg-[#818CF8]/10 text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-white/5">
                          <tr>
                            <th scope="col" className="px-5 py-4">#</th>
                            <th scope="col" className="px-5 py-4">Full Name</th>
                            <th scope="col" className="px-5 py-4">Phone</th>
                            <th scope="col" className="px-5 py-4">Course</th>
                            <th scope="col" className="px-5 py-4">Branch</th>
                            <th scope="col" className="px-5 py-4">Date Registered</th>
                            <th scope="col" className="px-5 py-4">Quick Action</th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                          {loading ? (
                            <tr>
                              <td colSpan={7} className="px-5 py-12 text-center text-xs text-[#6B7280] dark:text-[#9CA3AF] font-mono animate-pulse">
                                Retrieving New Submissions...
                              </td>
                            </tr>
                          ) : students.filter(s => s.status === 'new').length === 0 ? (
                            <tr>
                              <td colSpan={7} className="px-5 py-16 text-center">
                                <div className="max-w-xs mx-auto text-center flex flex-col items-center">
                                  <CheckCircle size={44} className="text-emerald-500 mb-2 animate-bounce" />
                                  <h4 className="font-bold text-slate-800 dark:text-white mb-1">All caught up!</h4>
                                  <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]" id="new-empty-caption">
                                    No new student registration entries are pending.
                                  </p>
                                </div>
                              </td>
                            </tr>
                          ) : (
                            students
                              .filter(s => s.status === 'new')
                              .map((student, idx) => (
                                <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                                  <td className="px-5 py-4 font-mono text-[12px] text-[#6B7280] dark:text-[#9CA3AF]">{idx + 1}</td>
                                  <td className="px-5 py-4 font-semibold text-primary">{student.name}</td>
                                  <td className="px-5 py-4 font-mono text-[13px]">
                                    <a 
                                      href={`tel:${student.phone}`} 
                                      className="text-[#6366F1] dark:text-[#818CF8] hover:underline"
                                    >
                                      {student.phone}
                                    </a>
                                  </td>
                                  <td className="px-5 py-4">
                                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100/20">
                                      {student.course}
                                    </span>
                                  </td>
                                  <td className="px-5 py-4 text-xs text-secondary">{student.branch}</td>
                                  <td className="px-5 py-4 font-mono text-[12px] text-secondary">{formatDate(student.createdAt)}</td>
                                  
                                  <td className="px-5 py-4">
                                    <button
                                      onClick={() => handleMarkAsContacted(student.id!)}
                                      className="cursor-pointer bg-amber-500 hover:bg-amber-600 text-white font-semibold font-sans py-1.5 px-3 rounded-lg text-xs tracking-wide transition-all active:scale-95"
                                    >
                                      Mark Contacted
                                    </button>
                                  </td>
                                </tr>
                              ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
}
