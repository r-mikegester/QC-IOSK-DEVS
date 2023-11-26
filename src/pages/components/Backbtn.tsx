import { Icon } from '@iconify/react';
import React, { useState } from 'react';
interface ContainerProps {
    name: string;
}
const Backbtn: React.FC<ContainerProps> = ({ name }) => {
    return (
        <div className="absolute top-5 left-5">
            <a href="/SanBartolome" className="btn btn-square hover:scale-110">
            <Icon icon="typcn:arrow-back-outline" className="w-8 h-8"/>
            </a>

        </div>

    );
};

export default Backbtn;
