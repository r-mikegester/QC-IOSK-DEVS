import React, { useEffect, useState } from 'react';

const CountdownTimer: React.FC = () => {
    const [currentTime, setCurrentTime] = useState<Date>(new Date());

    useEffect(() => {
        const updateTimer = () => {
            setCurrentTime(new Date()); // Update current time
        };

        const flipAllcard = (time: number) => {
            const seconds = time % 60;
            const minutes = Math.floor(time / 60) % 60;
            const hours = Math.floor(time / 3600) % 12 || 12;

            flip(document.querySelector<HTMLElement>("[data-hours]"), hours, true);
            flip(document.querySelector<HTMLElement>("[data-minutes]"), minutes);
        };

        const flip = (
            flipcard: HTMLElement | null,
            newNumber: number,
            flag?: boolean
        ) => {
            const cardTop = flipcard?.querySelector<HTMLElement>("[data-card-top]");
            const startNumber = cardTop ? parseInt(cardTop.textContent || '0', 10) : 0;

            const cardBot = flipcard?.querySelector<HTMLElement>("[data-card-bot]");
            const topFlip = flipcard?.querySelector<HTMLElement>("[data-flip-top]");
            const botFlip = flipcard?.querySelector<HTMLElement>("[data-flip-bot]");
            const topFlipNum = flipcard?.querySelector<HTMLElement>(
                "[data-flip-top-num]"
            );
            const botFlipNum = flipcard?.querySelector<HTMLElement>(
                "[data-flip-bot-num]"
            );

            if (newNumber === startNumber) return;

            const displayStartNum = String(startNumber).padStart(2, '0');
            const displayNewNum = String(newNumber).padStart(2, '0');

            // if (flag) console.log('displayStartNum', displayStartNum, displayNewNum);

            const anim = (
                el: HTMLElement,
                event: string,
                callback: () => void
            ) => {
                const handler = () => {
                    el.removeEventListener(event, handler);
                    callback();
                };

                el.addEventListener(event, handler);
            };

            if (
                cardTop &&
                cardBot &&
                topFlip &&
                botFlip &&
                topFlipNum &&
                botFlipNum
            ) {
                cardTop.textContent = displayStartNum;
                cardBot.textContent = displayStartNum;
                topFlipNum.textContent = displayStartNum;
                botFlipNum.textContent = displayNewNum;

                topFlip.classList.add('flip-card-top');
                botFlip.classList.add('flip-card-bottom');

                anim(topFlip, 'animationstart', () => {
                    if (cardTop) cardTop.textContent = displayNewNum;
                });

                anim(topFlip, 'animationend', () => {
                    if (topFlipNum) topFlipNum.innerText = displayNewNum;
                    if (topFlip) topFlip.classList.remove('flip-card-top');
                });

                anim(botFlip, 'animationend', () => {
                    if (cardBot) cardBot.textContent = displayNewNum;
                    if (botFlip) botFlip.classList.remove('flip-card-bottom');
                });
            }
        };


        const interval = setInterval(() => {
            updateTimer(); // Update current time
            const currentTimeInSeconds =
                currentTime.getHours() * 3600 +
                currentTime.getMinutes() * 60 +
                currentTime.getSeconds();

            flipAllcard(currentTimeInSeconds);
        }, 1000); // Update every second

        return () => clearInterval(interval);
    }, [currentTime]); // Include currentTime in the dependency array to trigger updates
     // Return null or placeholder as the component doesn't render any visible content
  return null;
}

export default CountdownTimer;