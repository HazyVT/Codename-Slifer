export function approach(start: number, stop: number, step: number) {
    if (start < stop) {
        return Math.min(start + step, stop);
    } else {
        return Math.max(start - step, stop);
    }
}