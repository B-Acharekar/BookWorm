import React from 'react';
import { useAuth } from '../../context/AuthContext';
import PageContainer from '../../components/layout/PageContainer';
import SectionHeader from '../../components/ui/SectionHeader';
import BrutalCard from '../../components/ui/BrutalCard';
import BrutalButton from '../../components/ui/BrutalButton';

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <PageContainer>
      <SectionHeader 
        title="User Profile" 
        subtitle="Manage your account settings."
      />
      <BrutalCard className="bg-white p-5 d-flex flex-column align-items-center text-center">
        <img 
          src={user?.photoURL} 
          alt={user?.displayName} 
          className="rounded-circle border border-4 border-dark mb-4 shadow" 
          style={{ width: '150px', height: '150px' }} 
        />
        <h1 className="fw-black text-uppercase mb-1 lh-1">{user?.displayName}</h1>
        <p className="lead fw-bold text-muted mb-4">{user?.email}</p>
        
        <div className="d-flex gap-3 mt-2">
            <BrutalButton variant="primary">Edit Profile</BrutalButton>
            <BrutalButton variant="secondary" onClick={logout}>Sign Out</BrutalButton>
        </div>
      </BrutalCard>
    </PageContainer>
  );
};

export default Profile;
