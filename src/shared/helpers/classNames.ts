export type Mods = Record<string, boolean | string | undefined>;
export const classNames = (
    cls: string,
    mods: Mods = {},
    additions: (string | undefined)[] = [],
): string =>
    [
        cls,
        ...additions,
        ...Object.entries(mods)
            .filter(([, value]) => Boolean(value))
            .map(([className]) => className),
    ].join(' ');
