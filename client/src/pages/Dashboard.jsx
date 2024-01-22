import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';

function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl) setTab(tabFromUrl);
  }, [location]);
  return (
    <div className='flex min-h-screen flex-col md:flex-row'>
      {/* Sidebar */}
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {/* Profile Comp */}
      {tab === 'profile' && (
          <DashProfile />
      )}
    </div>
  );
}

export default Dashboard;
