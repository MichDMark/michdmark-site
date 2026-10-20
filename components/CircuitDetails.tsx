interface CircuitDetailsProps {
    tone?: "cyan" | "red";
}

export function CircuitDetails({ tone = "cyan" }: CircuitDetailsProps) {
    return (
        <span className={`circuit-details circuit-details-${tone}`} aria-hidden="true">
            <span className="circuit-frame-outer" />
            <span className="circuit-surface-outer" />
            <span className="circuit-frame-inner" />
            <span className="circuit-surface-inner" />
            <span className="circuit-trace circuit-trace-top" />
            <span className="circuit-trace circuit-trace-bottom" />
            <span className="circuit-pin circuit-pin-top" />
            <span className="circuit-pin circuit-pin-bottom" />
            <svg className="circuit-motif" viewBox="0 0 88 88" focusable="false">
                <circle className="circuit-motif-ring" cx="56" cy="36" r="19" />
                <circle className="circuit-motif-ring circuit-motif-ring-inner" cx="56" cy="36" r="9" />
                <path className="circuit-motif-route" d="M56 17V7h17M75 36h9M56 55v12h-9M37 36H23l-8 8" />
                <circle className="circuit-motif-pad" cx="73" cy="7" r="2.5" />
                <circle className="circuit-motif-pad" cx="84" cy="36" r="2.5" />
                <circle className="circuit-motif-pad" cx="47" cy="67" r="2.5" />
                <circle className="circuit-motif-pad" cx="15" cy="44" r="2.5" />
            </svg>
            <span className="circuit-arrival-wash" />
            <span className="circuit-arrival-trace" />
            <span className="circuit-arrival-contact" />
        </span>
    );
}
