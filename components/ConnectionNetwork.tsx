"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface Connection {
    target: string;
    path: string;
    x: number;
    y: number;
}

interface ConnectionNetworkProps {
    children: ReactNode;
    className?: string;
}

export function ConnectionNetwork({ children, className }: ConnectionNetworkProps) {
    const networkRef = useRef<HTMLDivElement>(null);
    const [connections, setConnections] = useState<Connection[]>([]);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const network = networkRef.current;
        if (!network) return;

        const updateConnections = () => {
            const source = network.querySelector<HTMLElement>("[data-connection-origin-port]");
            if (!source) return;

            const bounds = network.getBoundingClientRect();
            setDimensions((current) => current.width === bounds.width && current.height === bounds.height
                ? current
                : { width: bounds.width, height: bounds.height });
            const sourceBounds = source.getBoundingClientRect();
            const startX = sourceBounds.left + sourceBounds.width / 2 - bounds.left;
            const startY = sourceBounds.top + sourceBounds.height / 2 - bounds.top;
            const isNarrow = window.matchMedia("(max-width: 800px)").matches;
            const targetPorts = Array.from(network.querySelectorAll<HTMLElement>("[data-connection-target-port]"));
            const railY = targetPorts.length > 0
                ? Math.max(startY + 24, Math.min(...targetPorts.map((target) => target.getBoundingClientRect().top - bounds.top)) - 24)
                : startY + 24;
            const laneX = bounds.width - 6;

            const nextConnections = Array.from(
                network.querySelectorAll<HTMLElement>("[data-connection-target-port]"),
            ).map((target) => {
                const targetBounds = target.getBoundingClientRect();
                const x = targetBounds.left + targetBounds.width / 2 - bounds.left;
                const y = targetBounds.top + targetBounds.height / 2 - bounds.top;
                const path = isNarrow
                    ? `M ${startX} ${startY} L ${startX} ${y} L ${x} ${y}`
                    : `M ${startX} ${startY} L ${laneX} ${startY} L ${laneX} ${railY} L ${x} ${railY} L ${x} ${y}`;

                return {
                    target: target.closest<HTMLElement>("[data-connection-target]")?.dataset.connectionTarget ?? "",
                    path,
                    x,
                    y,
                };
            });

            setConnections(nextConnections);
        };

        updateConnections();
        const observer = new ResizeObserver(updateConnections);
        observer.observe(network);
        const origin = network.querySelector<HTMLElement>("[data-connection-origin-port]")?.closest<HTMLElement>(".connected-origin");
        if (origin) observer.observe(origin);
        network.querySelectorAll<HTMLElement>("[data-connection-target]")
            .forEach((element) => observer.observe(element));
        window.addEventListener("resize", updateConnections);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", updateConnections);
        };
    }, []);

    return (
        <div ref={networkRef} className={`connection-network ${className ?? ""}`}>
            <svg
                className="connection-lines"
                viewBox={dimensions.width > 0 && dimensions.height > 0 ? `0 0 ${dimensions.width} ${dimensions.height}` : undefined}
                aria-hidden="true"
                focusable="false"
            >
                {connections.map(({ target, path, x, y }) => (
                    <g key={target} className="connection-route" data-target={target}>
                        <path className="connection-base" d={path} />
                        <path className="connection-signal" d={path} pathLength="100" />
                        <circle className="connection-port" cx={x} cy={y} r="3" />
                    </g>
                ))}
            </svg>
            {children}
        </div>
    );
}
