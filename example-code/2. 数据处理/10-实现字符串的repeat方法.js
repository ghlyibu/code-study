function repeat1(s, n) {
    return (new Array(n + 1)).join(s);
}

function repeat2(s, n) {
    return (n > 0) ? s.concat(repeat(s, --n)) : "";
}