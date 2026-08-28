function map(func, arg) {
    if (Array.isArray(arg)) {
        return arg.map(t => map(func, t));
    } else {
        return func(arg);
    }
}
