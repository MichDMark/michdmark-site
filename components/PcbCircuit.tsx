"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

interface PcbCircuitProps {
    children: ReactNode;
    className: string;
}

interface PcbRoute {
    key: string;
    tone: "red" | "cyan";
    d: string;
    outputD: string;
    startX: number;
    busY: number;
    outputEndX: number;
    outputRailY: number;
    component: "resistor" | "capacitor" | "inductor";
    index: number;
}

interface CircuitMeasure {
    width: number;
    height: number;
    routes: PcbRoute[];
}

const componentKinds: PcbRoute["component"][] = ["resistor", "capacitor", "inductor"];

export function PcbCircuit({ children, className }: PcbCircuitProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    const [measure, setMeasure] = useState<CircuitMeasure>({ width: 0, height: 0, routes: [] });

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        let frame = 0;
        let disposed = false;

        const update = () => {
            frame = 0;
            if (disposed) return;

            const rootRect = root.getBoundingClientRect();
            const modules = Array.from(root.querySelectorAll<HTMLElement>(".circuit-module"));
            const routes = modules.flatMap((module, index) => {
                const terminal = module.querySelector<HTMLElement>("[data-pcb-terminal]");
                const outputTerminal = module.querySelector<HTMLElement>("[data-pcb-output-terminal]");
                if (!terminal || !outputTerminal) return [];

                const terminalRect = terminal.getBoundingClientRect();
                const outputRect = outputTerminal.getBoundingClientRect();
                const endX = terminalRect.left + terminalRect.width / 2 - rootRect.left;
                const endY = terminalRect.top - rootRect.top;
                const startX = endX - 108;
                const busY = endY - 28;
                const outputX = outputRect.left + outputRect.width / 2 - rootRect.left;
                const outputY = outputRect.top - rootRect.top;
                const moduleRect = module.getBoundingClientRect();
                const outputBusY = outputY - 20;
                const outputBendX = outputX + 16;
                const outputRailY = outputY - 36;
                const outputEndX = moduleRect.right - rootRect.left - 18;
                const n = (value: number) => Number(value.toFixed(2));
                const d = `M${n(startX)} ${n(busY)}H${n(endX - 28)}L${n(endX - 12)} ${n(busY + 16)}H${n(endX)}V${n(endY)}`;
                const outputD = `M${n(outputX)} ${n(outputY)}V${n(outputBusY)}L${n(outputBendX)} ${n(outputRailY)}H${n(outputEndX)}`;
                const delay = (index * 0.42) % 4.8;
                module.style.setProperty("--pcb-route-delay", `${delay}s`);
                module.dataset.pcbRouteIndex = String(index);

                return [{
                    key: module.dataset.connectionTarget ?? `module-${index}`,
                    tone: module.querySelector(".circuit-details-red") ? "red" as const : "cyan" as const,
                    d,
                    outputD,
                    startX: n(startX),
                    busY: n(busY),
                    outputEndX: n(outputEndX),
                    outputRailY: n(outputRailY),
                    component: componentKinds[index % componentKinds.length],
                    index,
                }];
            });

            // The absolutely positioned SVG occupies the root's fractional CSS box.
            // Use those same dimensions for its viewBox so measured pin coordinates
            // aren't scaled by rounded clientWidth/scrollHeight values.
            const next = { width: rootRect.width, height: rootRect.height, routes };
            setMeasure((current) => {
                if (current.width === next.width && current.height === next.height
                    && current.routes.length === next.routes.length
                    && current.routes.every((route, index) => route.d === next.routes[index]?.d && route.outputD === next.routes[index]?.outputD)) return current;
                return next;
            });
        };

        const schedule = () => {
            if (disposed) return;
            if (frame) cancelAnimationFrame(frame);
            frame = requestAnimationFrame(update);
        };

        const observer = new ResizeObserver(schedule);
        observer.observe(root);
        root.querySelectorAll<HTMLElement>(".circuit-module, [data-pcb-terminal], [data-pcb-output-terminal]").forEach((element) => observer.observe(element));
        window.addEventListener("resize", schedule, { passive: true });
        schedule();
        document.fonts?.ready.then(() => {
            if (!disposed) schedule();
        });

        return () => {
            disposed = true;
            observer.disconnect();
            window.removeEventListener("resize", schedule);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <div ref={rootRef} className={`pcb-circuit ${className}`} data-pcb-ready={measure.routes.length > 0 ? "true" : undefined}>
            {measure.width > 0 && measure.height > 0 && measure.routes.length > 0 && (
                <svg
                    className="pcb-circuit-routes"
                    viewBox={`0 0 ${measure.width} ${measure.height}`}
                    aria-hidden="true"
                    focusable="false"
                >
                    {measure.routes.map((route) => {
                        const componentX = route.startX + 40;
                        const style = { "--pcb-route-delay": `${(route.index * 0.42) % 4.8}s` } as CSSProperties;
                        return (
                            <g key={`${route.key}-${route.index}`} className="pcb-route-group" data-pcb-route-for={route.key} data-pcb-route-index={route.index} data-pcb-tone={route.tone} style={style}>
                                <path className="pcb-route-base" d={route.d} />
                                <path className="pcb-output-base" d={route.outputD} />
                                <circle className="pcb-route-pad-outer" cx={route.startX} cy={route.busY} r="7" />
                                <circle className="pcb-route-pad-hole" cx={route.startX} cy={route.busY} r="2.5" />
                                <PcbPassive kind={route.component} x={componentX} y={route.busY} />
                                <circle className="pcb-output-pad-outer" cx={route.outputEndX} cy={route.outputRailY} r="6.5" />
                                <circle className="pcb-output-pad-hole" cx={route.outputEndX} cy={route.outputRailY} r="2.3" />
                                <path className="pcb-route-trail" d={route.d} pathLength="100" />
                                <path className="pcb-route-pulse" d={route.d} pathLength="100" />
                                <path className="pcb-output-trail" d={route.outputD} pathLength="100" />
                                <path className="pcb-output-pulse" d={route.outputD} pathLength="100" />
                                <text className="pcb-component-label pcb-component-label-overlay" x={componentX} y={route.busY - 12} textAnchor="middle">{route.component === "resistor" ? "R" : route.component === "capacitor" ? "C" : "L"}{route.index + 1}</text>
                            </g>
                        );
                    })}
                </svg>
            )}
            <div className="pcb-circuit-content">{children}</div>
        </div>
    );
}

function PcbPassive({ kind, x, y }: { kind: PcbRoute["component"]; x: number; y: number }) {
    return (
        <g className={`pcb-inline-component pcb-inline-${kind}`} transform={`translate(${x} ${y})`}>
            <path className="pcb-component-leads" d="M-40 0H-13M13 0H40" />
            {kind === "resistor" && <>
                <rect className="pcb-resistor-body" x="-13" y="-7" width="26" height="14" rx="4" />
                <path className="pcb-resistor-bands" d="M-5 -6V6M2 -6V6M8 -6V6" />
            </>}
            {kind === "capacitor" && <>
                <rect className="pcb-capacitor-body" x="-13" y="-9" width="26" height="18" rx="7" />
                <path className="pcb-capacitor-cap" d="M-10 -7V7M10 -7V7" />
                <path className="pcb-capacitor-polarity" d="M-3 -4V1M-5.5 -1.5H-0.5M4 4H7" />
            </>}
            {kind === "inductor" && <>
                <rect className="pcb-inductor-body" x="-17" y="-8" width="34" height="16" rx="3" />
                <path className="pcb-inductor-winding" d="M-12 -7V7M-6 -7V7M0 -7V7M6 -7V7M12 -7V7" />
            </>}
        </g>
    );
}
