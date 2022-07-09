// 5.

// google for Record type
function stringEntries(a: string[] | Record<string, string>) {
    return Array.isArray(a) ? a : Object.keys(a)
}