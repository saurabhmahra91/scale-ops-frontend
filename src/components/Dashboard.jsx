import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import SideDrawerLayout from './SideDrawerLayout';
import ExplorePeople from './pages/ExplorePeople';

function Dashboard() {

    const [loading, setLoading] = useState(false);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <ExplorePeople></ExplorePeople>
    );
}

export default Dashboard;