import React, { useEffect, useState } from 'react';
import { FaFire } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
0%, 100% {
    transform: translateY(0);
}
50% {
    transform: translateY(-3px);
}
`;

const StyledFaFire = styled(FaFire)`
    fill: ${({ gradient }) => `url(#${gradient})`};
    &:hover {
        animation: ${bounce} 1s infinite;
    }
`;

const Fire = ({ streakCount, targetDays, ...props }) => {
    const [gradientId, setGradientId] = useState('');

    useEffect(() => {
        const percentage = (streakCount / targetDays) * 100;

        const getGradientId = (percentage) => {
            if (percentage <= 25) {
                return 'gradientYellowOrange';
            } else if (percentage <= 50) {
                return 'gradientOrangeRed';
            } else if (percentage <= 75) {
                return 'gradientGreenRed';
            } else if (percentage <= 100) {
                return 'gradientPurpleIndigo';
            } else {
                return 'gradientRed';
            }
        };

        setGradientId(getGradientId(percentage));
    }, [streakCount, targetDays]);

    return (
        <>
            <svg width="0" height="0">
                <defs>
                    <linearGradient
                        id="gradientYellowOrange"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >
                        <stop
                            offset="0%"
                            style={{ stopColor: '#FFD700', stopOpacity: 1 }}
                        />
                        <stop
                            offset="100%"
                            style={{ stopColor: '#FFA500', stopOpacity: 1 }}
                        />
                    </linearGradient>
                    <linearGradient
                        id="gradientOrangeRed"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >
                        <stop
                            offset="0%"
                            style={{ stopColor: '#FFA500', stopOpacity: 1 }}
                        />
                        <stop
                            offset="100%"
                            style={{ stopColor: '#FF0000', stopOpacity: 1 }}
                        />
                    </linearGradient>
                    <linearGradient
                        id="gradientGreenRed"
                        x1="45%"
                        y1="50%"
                        x2="100%"
                        y2="100%"
                    >
                        <stop
                            offset="0%"
                            style={{ stopColor: '#00FF00', stopOpacity: 1 }}
                        />
                        <stop
                            offset="100%"
                            style={{ stopColor: '#FF0000', stopOpacity: 0.8 }}
                        />
                    </linearGradient>
                    <linearGradient
                        id="gradientPurpleIndigo"
                        x1="40%"
                        y1="20%"
                        x2="100%"
                        y2="100%"
                    >
                        <stop
                            offset="0%"
                            style={{ stopColor: '#000982', stopOpacity: 0.7 }}
                        />
                        <stop
                            offset="100%"
                            style={{ stopColor: '#4B0082', stopOpacity: 1 }}
                        />
                    </linearGradient>
                    <linearGradient
                        id="gradientRed"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >
                        <stop
                            offset="0%"
                            style={{ stopColor: '#FF0000', stopOpacity: 1 }}
                        />
                        <stop
                            offset="100%"
                            style={{ stopColor: '#FF0000', stopOpacity: 1 }}
                        />
                    </linearGradient>
                </defs>
            </svg>
            <StyledFaFire gradient={gradientId} {...props} />
        </>
    );
};

export default Fire;
