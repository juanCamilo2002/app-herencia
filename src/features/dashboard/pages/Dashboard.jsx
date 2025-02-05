import React, { useEffect, useState } from 'react'
import api from '../../../axiosInstance';
import { useAuth } from '../../auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import EyeIcon from '../../../assets/icons/eye.svg?react';
import ArrowUpIcon from '../../../assets/icons/arrow-up.svg?react';
import ArrowDownIcon from '../../../assets/icons/arrow-down.svg?react';
import CarShopIcon from '../../../assets/icons/car-shop.svg?react';
import UsersIcon from '../../../assets/icons/users.svg?react';
import BagIcon from '../../../assets/icons/bag.svg?react';
import CardKpi from '../components/cards/CardKpi';

const stats = [
  {
    icon: <EyeIcon className="fill-primary dark:fill-white" />,
    value: '$3.456k',
    title: 'Total views',
    percent: 0.43,
    iconPercent: <ArrowUpIcon className="fill-meta-3" />,
  },
  {
    icon: <CarShopIcon className="fill-primary dark:fill-white" />,
    value: '$45,2k',
    title: 'Total Profit',
    percent: 4.35,
    iconPercent: <ArrowUpIcon className="fill-meta-3" />,
  },
  {
    icon: <BagIcon className="fill-primary dark:fill-white" />,
    value: '2.450',
    title: 'Total Product',
    percent: 2.59,
    iconPercent: <ArrowUpIcon className="fill-meta-3" />,
  },
  {
    icon: <UsersIcon className="fill-primary dark:fill-white" />,
    value: '3.456',
    title: 'Total users',
    percent: 0.95,
    iconPercent: <ArrowDownIcon className="fill-meta-5" />,
  }
]


const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const { signOut } = useAuth();
  const navigate = useNavigate();



  const fetchProfile = async () => {
    try {
      const response = await api.get('/auth/profile');
      setProfile(response.data);
    } catch (error) {
      alert('Error fetching profile');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  }


  return (
    <>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
        {stats.map((stat, index) => (
          <CardKpi
            key={index}
            icon={stat.icon}
            value={stat.value}
            title={stat.title}
            percent={stat.percent}
            iconPercent={stat.iconPercent}
          />
        ))}
      </div>

      <div className='mt-6'>
        <h2 className='text-lg font-semibold text-black dark:text-white'>Profile</h2>
        <div className='mt-4'>
          <p className='text-sm text-black dark:text-white'>Name: {profile?.data?.entityId?.name} {profile?.data?.entityId?.lastName}</p>
          <p className='text-sm text-black dark:text-white'>Email: {profile?.data?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className='mt-4 px-4 py-2.5 bg-primary text-white rounded-md shadow-sm dark:bg-primarydark dark:text-black'
        >
          Logout
        </button>
      </div>
    </>
  )
}

export default Dashboard