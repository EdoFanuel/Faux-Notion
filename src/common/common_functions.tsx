import { v4 } from "uuid";

export function clamp(value: number, min: number, max: number): number {
    if (value <= min) return min
    if (value >= max) return max
    return value
}

export function generateUUID(): string {
    return v4()
}