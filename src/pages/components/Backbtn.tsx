import { Icon } from '@iconify/react';
import React, { useState } from 'react';
interface ContainerProps {
    name: string;
}

const Backbtn: React.FC<ContainerProps> = ({ name }) => {
    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        onChange(inputValue);
        handleButtonClick;
      };
    return (
        <div>
            <div className="mx-auto w-96">
                

            </div>
            
        </div>

    );
};

export default Backbtn;
