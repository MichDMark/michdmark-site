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
            <span className="circuit-pin-array">
                <span className="circuit-pin-bank circuit-pin-bank-top" />
                <span className="circuit-pin-bank circuit-pin-bank-right" />
                <span className="circuit-pin-bank circuit-pin-bank-bottom" />
                <span className="circuit-pin-bank circuit-pin-bank-left" />
                <span className="circuit-pin-one" />
            </span>
            <span className="circuit-trace circuit-trace-top" />
            <span className="circuit-trace circuit-trace-bottom" />
            <svg className="circuit-motif" viewBox="0 0 64 64" focusable="false">
                <rect className="circuit-motif-package" x="21" y="21" width="22" height="22" rx="1" />
                <path className="circuit-motif-terminals" d="M25 15v6m7-6v6m7-6v6M25 43v6m7-6v6m7-6v6M15 25h6m-6 7h6m-6 7h6m22-14h6m-6 7h6m-6 7h6" />
                <path className="circuit-motif-route" d="M32 21v-8h12l5-5m-6 24h8l5 5" />
                <circle className="circuit-motif-pad" cx="49" cy="8" r="2" />
                <circle className="circuit-motif-pad" cx="56" cy="42" r="2" />
            </svg>
            <span className="circuit-arrival-wash" />
            <span className="circuit-arrival-trace" />
            <span className="circuit-arrival-contact" />
        </span>
    );
}
