"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

interface Point { x: number; y: number }
interface Connection { target: string; path: string; x: number; y: number; index: number }
interface ConnectionNetworkProps { children: ReactNode; className?: string; sequence?: boolean }

function beveledPath(points: Point[], cut = 12) {
    const clean = points.filter((point, index) => index === 0 || Math.hypot(point.x - points[index - 1].x, point.y - points[index - 1].y) > 0.5);
    if (!clean.length) return "";
    if (clean.length === 1) return `M ${clean[0].x} ${clean[0].y}`;
    const commands = [`M ${clean[0].x} ${clean[0].y}`];
    for (let index = 1; index < clean.length - 1; index += 1) {
        const previous = clean[index - 1];
        const corner = clean[index];
        const next = clean[index + 1];
        const incoming = Math.hypot(corner.x - previous.x, corner.y - previous.y);
        const outgoing = Math.hypot(next.x - corner.x, next.y - corner.y);
        if (incoming <= 0.01 || outgoing <= 0.01) {
            commands.push(`L ${corner.x} ${corner.y}`);
            continue;
        }
        const trim = Math.min(cut, incoming / 2, outgoing / 2);
        const entry = { x: corner.x + ((previous.x - corner.x) / incoming) * trim, y: corner.y + ((previous.y - corner.y) / incoming) * trim };
        const exit = { x: corner.x + ((next.x - corner.x) / outgoing) * trim, y: corner.y + ((next.y - corner.y) / outgoing) * trim };
        commands.push(`L ${entry.x} ${entry.y}`, `L ${exit.x} ${exit.y}`);
    }
    const last = clean[clean.length - 1];
    commands.push(`L ${last.x} ${last.y}`);
    return commands.join(" ");
}

function center(element: HTMLElement, root: DOMRect): Point {
    const rect = element.getBoundingClientRect();
    return { x: rect.left + rect.width / 2 - root.left, y: rect.top + rect.height / 2 - root.top };
}

export function ConnectionNetwork({ children, className, sequence = false }: ConnectionNetworkProps) {
    const networkRef = useRef<HTMLDivElement>(null);
    const [connections, setConnections] = useState<Connection[]>([]);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const network = networkRef.current;
        if (!network) return;
        const update = () => {
            const origin = network.querySelector<HTMLElement>("[data-connection-origin-port]");
            if (!origin) return;
            const bounds = network.getBoundingClientRect();
            if (bounds.width <= 0 || bounds.height <= 0) return;
            setDimensions((current) => current.width === bounds.width && current.height === bounds.height ? current : { width: bounds.width, height: bounds.height });
            const originPoint = center(origin, bounds);
            const targets = Array.from(network.querySelectorAll<HTMLElement>("[data-connection-target-port]"));
            const narrow = window.matchMedia(sequence ? "(max-width: 840px)" : "(max-width: 800px)").matches;
            const next = targets.map((targetPort, index) => {
                const target = targetPort.closest<HTMLElement>("[data-connection-target]");
                const end = center(targetPort, bounds);
                let points: Point[];
                if (sequence && target) {
                    const previous = index === 0 ? origin : targets[index - 1]?.closest<HTMLElement>("[data-connection-target]")?.querySelector<HTMLElement>("[data-connection-output-port]");
                    const start = previous ? center(previous, bounds) : originPoint;
                    const sameRow = index > 0 && target.closest("[data-connection-row]") === targets[index - 1]?.closest("[data-connection-row]");
                    if (narrow) {
                        const gutterX = Math.max(4, Math.min(start.x, end.x) - 18);
                        points = [start, { x: gutterX, y: start.y }, { x: gutterX, y: end.y }, end];
                    } else if (sameRow) {
                        points = [start, end];
                    } else {
                        const laneX = bounds.width - 10;
                        const railY = target.getBoundingClientRect().top - bounds.top - 24;
                        points = [start, { x: laneX, y: start.y }, { x: laneX, y: railY }, { x: end.x, y: railY }, end];
                    }
                    const output = target.querySelector<HTMLElement>("[data-connection-output-port]");
                    if (output) {
                        const out = center(output, bounds);
                        const rect = target.getBoundingClientRect();
                        const topSide = targetPort.hasAttribute("data-circuit-port-side");
                        const inside = narrow
                            ? [end, { x: end.x + 11, y: end.y }, { x: end.x + 11, y: out.y }, out]
                            : topSide
                                ? [end, { x: end.x, y: rect.top - bounds.top + 15 }, { x: rect.right - bounds.left - 25, y: rect.top - bounds.top + 15 }, { x: rect.right - bounds.left - 13, y: rect.top - bounds.top + 27 }, { x: rect.right - bounds.left - 13, y: out.y }, out]
                                : [end, { x: rect.left - bounds.left + 16, y: end.y }, { x: rect.left - bounds.left + 28, y: end.y + 12 }, { x: rect.left - bounds.left + 28, y: rect.bottom - bounds.top - 13 }, { x: rect.right - bounds.left - 28, y: rect.bottom - bounds.top - 13 }, { x: rect.right - bounds.left - 16, y: out.y - 12 }, out];
                        points = [...points, ...inside.slice(1)];
                    }
                } else {
                    const source = originPoint;
                    if (narrow) points = [source, { x: source.x, y: end.y }, end];
                    else {
                        const laneX = bounds.width - 12;
                        const targetBounds = target?.getBoundingClientRect();
                        const railY = targetBounds ? targetBounds.top - bounds.top - 18 : Math.max(source.y + 24, end.y - 24);
                        points = [source, { x: laneX, y: source.y }, { x: laneX, y: railY }, { x: end.x, y: railY }, end];
                    }
                }
                return { target: target?.dataset.connectionTarget ?? "contenido", path: beveledPath(points), x: end.x, y: end.y, index };
            });
            setConnections(next);
        };
        update();
        const observer = new ResizeObserver(update);
        observer.observe(network);
        network.querySelectorAll<HTMLElement>(".connected-origin, [data-connection-target]").forEach((element) => observer.observe(element));
        window.addEventListener("resize", update);
        return () => { observer.disconnect(); window.removeEventListener("resize", update); };
    }, [sequence]);

    return (
        <div ref={networkRef} className={`connection-network ${className ?? ""}`} data-connection-sequence={sequence || undefined}>
            {dimensions.width > 0 && dimensions.height > 0 && (
                <svg className="connection-lines" viewBox={`0 0 ${dimensions.width} ${dimensions.height}`} aria-hidden="true" focusable="false">
                    {connections.map(({ target, path, x, y, index }) => (
                        <g className="connection-route" data-target={target} key={`${target}-${index}`} style={{ "--sequence-delay": `${index * 0.9}s` } as CSSProperties}>
                            <path className="connection-base" d={path} />
                            <path className="connection-support" d={path} />
                            <path className="connection-glow" d={path} pathLength="100" />
                            <path className="connection-trail" d={path} pathLength="100" />
                            <path className="connection-signal" d={path} pathLength="100" />
                            <circle className="connection-port" cx={x} cy={y} r="4" />
                        </g>
                    ))}
                </svg>
            )}
            {children}
        </div>
    );
}
