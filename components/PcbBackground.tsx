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
                <pattern id="pcb-board-pattern" width="320" height="320" patternUnits="userSpaceOnUse">
                    <path className="pcb-pattern-trace pcb-pattern-trace-wide" d="M-20 52H78L98 72V142H166L190 166H238V226L262 250H340" />
                    <path className="pcb-pattern-trace pcb-pattern-parallel" d="M-20 59H73L91 77V149H162L184 171H231V230L255 254H340" />
                    <path className="pcb-pattern-trace pcb-pattern-trace-secondary" d="M48 -20V36L70 58H118V104M286 96H234L212 118V190H166" />
                    <circle className="pcb-pad" cx="78" cy="52" r="6" />
                    <circle className="pcb-via" cx="98" cy="72" r="5" />
                    <circle className="pcb-pad" cx="166" cy="142" r="6" />
                    <circle className="pcb-via" cx="238" cy="226" r="5" />
                </pattern>
            </defs>
            <rect className="pcb-board-pattern-fill" width="1000" height="1000" />
        </svg>
    );
}
