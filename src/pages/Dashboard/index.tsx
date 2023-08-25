import React, { useState } from 'react';
import { GeneralDashboard } from '../../components/GeneralDashboard';
import { DashboardDetailed } from '../../components/DashboardDetailed';


export const Dashboard: React.FC = () => {

    const [showGeneralDashboard, setShowGeneralDashboard] = useState(true)
    const [selectedMenuItem, setSelectedMenuItem] = useState('');

    const handleCardClick = (menuItem: string) => {
        setSelectedMenuItem(menuItem);
        setShowGeneralDashboard(false);
    };
    return (
        <>
            {showGeneralDashboard === true ?
                <GeneralDashboard onCardClick={handleCardClick} />
                :
                <DashboardDetailed
                    setSelectedItem={selectedMenuItem}
                    onBackToGeneral={() => setShowGeneralDashboard(true)} />
            }
        </>
    );
}

