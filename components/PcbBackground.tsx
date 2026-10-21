export function PcbBackground() {
    return (
        <svg
            className="pcb-board-background"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
            focusable="false"
        >
            <defs>
                <pattern id="pcb-board-pattern" width="260" height="260" patternUnits="userSpaceOnUse">
                    <path className="pcb-pattern-trace pcb-pattern-trace-wide" d="M-30 42H64L92 70V148H174L202 176V294M92 70H132L158 44H292M174 148H216L242 122H292" />
                    <path className="pcb-pattern-trace pcb-pattern-parallel" d="M-30 49H60L85 74V155H170L195 180V294M92 63H129L153 39H292" />
                    <path className="pcb-pattern-trace pcb-pattern-trace-secondary" d="M-24 220H50L76 194V116H130M218 -24V36L192 62H146V100" />
                    <circle className="pcb-pad" cx="64" cy="42" r="9" />
                    <circle className="pcb-via" cx="92" cy="70" r="7" />
                    <circle className="pcb-pad" cx="174" cy="148" r="9" />
                    <circle className="pcb-via" cx="202" cy="176" r="7" />
                    <circle className="pcb-pad" cx="216" cy="148" r="8" />

                    <g className="pcb-component pcb-resistor" transform="translate(106 214)">
                        <path className="pcb-component-lead" d="M-45 0H-15M15 0H45" />
                        <rect className="pcb-component-body" x="-16" y="-9" width="32" height="18" rx="4" />
                        <path className="pcb-resistor-band" d="M-7 -8V8M2 -8V8M9 -8V8" />
                    </g>
                    <g className="pcb-component pcb-capacitor" transform="translate(218 76)">
                        <path className="pcb-component-lead" d="M0 -42V-17M0 17V42" />
                        <circle className="pcb-component-pad" cx="0" cy="-42" r="5" />
                        <circle className="pcb-component-pad" cx="0" cy="42" r="5" />
                        <rect className="pcb-capacitor-body" x="-13" y="-18" width="26" height="36" rx="8" />
                        <ellipse className="pcb-capacitor-lid" cx="0" cy="-15" rx="12" ry="4" />
                        <path className="pcb-capacitor-stripe" d="M8 -11V12" />
                        <path className="pcb-capacitor-mark" d="M-5 -6V0M-8 -3H-2M4 7H8" />
                    </g>
                    <g className="pcb-component pcb-inductor" transform="translate(42 132)">
                        <path className="pcb-component-lead" d="M-36 0H-22M22 0H36" />
                        <rect className="pcb-inductor-core" x="-23" y="-13" width="46" height="26" rx="6" />
                        <path className="pcb-inductor-coil" d="M-18 -13V13M-11 -13V13M-4 -13V13M3 -13V13M10 -13V13M17 -13V13" />
                        <path className="pcb-inductor-highlight" d="M-18 -10V10M-4 -10V10M10 -10V10" />
                    </g>
                    <text className="pcb-silkscreen" x="80" y="242">R1</text>
                    <text className="pcb-silkscreen" x="202" y="122">C1</text>
                    <text className="pcb-silkscreen" x="16" y="158">L1</text>
                </pattern>
            </defs>
            <rect className="pcb-board-pattern-fill" width="1000" height="1000" />

            <path className="pcb-main-trace pcb-main-trace-mint" d="M150 390H300L330 360H430V410L460 440H610V500L640 530H850" />
            <path className="pcb-main-signal pcb-main-signal-mint" pathLength="100" d="M150 390H300L330 360H430V410L460 440H610V500L640 530H850" />
            <circle className="pcb-main-pad pcb-main-pad-mint" cx="300" cy="390" r="12" />
            <circle className="pcb-main-via pcb-main-pad-mint" cx="430" cy="410" r="10" />
            <circle className="pcb-main-pad pcb-main-pad-mint" cx="610" cy="500" r="12" />

            <path className="pcb-main-trace pcb-main-trace-amber" d="M850 620H700L670 590H570V650L540 680H390V570L360 540H150" />
            <path className="pcb-main-signal pcb-main-signal-amber" pathLength="100" d="M850 620H700L670 590H570V650L540 680H390V570L360 540H150" />
            <circle className="pcb-main-pad pcb-main-pad-amber" cx="700" cy="620" r="12" />
            <circle className="pcb-main-via pcb-main-pad-amber" cx="570" cy="650" r="10" />
            <circle className="pcb-main-pad pcb-main-pad-amber" cx="390" cy="680" r="12" />
        </svg>
    );
}
