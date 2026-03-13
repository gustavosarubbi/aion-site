"use client";

import { useRef, useEffect } from 'react';

type SquaresProps = {
    direction?: 'right' | 'left' | 'up' | 'down' | 'diagonal';
    speed?: number;
    borderColor?: string;
    squareSize?: number;
    hoverFillColor?: string;
};

const Squares = ({
    direction = 'right',
    speed = 1,
    borderColor = '#111111',
    squareSize = 40,
    hoverFillColor = '#1a1a1a'
}: SquaresProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number | null>(null);
    const numSquaresX = useRef(0);
    const numSquaresY = useRef(0);
    const gridOffset = useRef({ x: 0, y: 0 });
    const hoveredSquareRef = useRef<{ x: number; y: number } | null>(null);
    const lastFrameAtRef = useRef(0);
    const lastMouseAtRef = useRef(0);
    const isVisibleRef = useRef(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const nav = navigator as Navigator & {
            deviceMemory?: number;
            connection?: { saveData?: boolean };
        };
        const cores = nav.hardwareConcurrency ?? 8;
        const memory = nav.deviceMemory ?? 8;
        const saveData = Boolean(nav.connection?.saveData);
        const lowPowerDevice = saveData || cores <= 4 || memory <= 4;

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const frameInterval = mediaQuery.matches || lowPowerDevice ? 1000 / 14 : 1000 / 30;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
            numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const drawGrid = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
            const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

            for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
                for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
                    const squareX = x - (gridOffset.current.x % squareSize);
                    const squareY = y - (gridOffset.current.y % squareSize);

                    if (
                        hoveredSquareRef.current &&
                        Math.floor((x - startX) / squareSize) === hoveredSquareRef.current.x &&
                        Math.floor((y - startY) / squareSize) === hoveredSquareRef.current.y
                    ) {
                        ctx.fillStyle = hoverFillColor;
                        ctx.fillRect(squareX, squareY, squareSize, squareSize);
                    }

                    ctx.strokeStyle = borderColor;
                    ctx.strokeRect(squareX, squareY, squareSize, squareSize);
                }
            }

            const gradient = ctx.createRadialGradient(
                canvas.width / 2,
                canvas.height / 2,
                0,
                canvas.width / 2,
                canvas.height / 2,
                Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
            );
            gradient.addColorStop(0, 'transparent');
            gradient.addColorStop(1, '#000000');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        const updateAnimation = (timestamp: number) => {
            if (!isVisibleRef.current) {
                requestRef.current = requestAnimationFrame(updateAnimation);
                return;
            }

            if (timestamp - lastFrameAtRef.current < frameInterval) {
                requestRef.current = requestAnimationFrame(updateAnimation);
                return;
            }

            lastFrameAtRef.current = timestamp;
            const effectiveSpeed = Math.max(speed, 0.1);
            switch (direction) {
                case 'right':
                    gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
                    break;
                case 'left':
                    gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
                    break;
                case 'up':
                    gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
                    break;
                case 'down':
                    gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
                    break;
                case 'diagonal':
                    gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
                    gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
                    break;
                default:
                    break;
            }

            drawGrid();
            requestRef.current = requestAnimationFrame(updateAnimation);
        };

        const onVisibilityChange = () => {
            isVisibleRef.current = document.visibilityState === 'visible';
        };

        onVisibilityChange();
        document.addEventListener('visibilitychange', onVisibilityChange);

        const handleMouseMove = (event: MouseEvent) => {
            if (lowPowerDevice) return;
            const now = performance.now();
            if (now - lastMouseAtRef.current < 28) return;
            lastMouseAtRef.current = now;

            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
            const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

            const hoveredSquareX = Math.floor((mouseX + gridOffset.current.x - startX) / squareSize);
            const hoveredSquareY = Math.floor((mouseY + gridOffset.current.y - startY) / squareSize);

            if (
                !hoveredSquareRef.current ||
                hoveredSquareRef.current.x !== hoveredSquareX ||
                hoveredSquareRef.current.y !== hoveredSquareY
            ) {
                hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY };
            }
        };

        const handleMouseLeave = () => {
            hoveredSquareRef.current = null;
        };

        if (!lowPowerDevice) {
            canvas.addEventListener('mousemove', handleMouseMove);
            canvas.addEventListener('mouseleave', handleMouseLeave);
        }

        if (mediaQuery.matches || lowPowerDevice) {
            drawGrid();
        } else {
            requestRef.current = requestAnimationFrame(updateAnimation);
        }

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            document.removeEventListener('visibilitychange', onVisibilityChange);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [direction, speed, borderColor, hoverFillColor, squareSize]);

    return <canvas ref={canvasRef} className="w-full h-full border-none block"></canvas>;
};

export default Squares;
