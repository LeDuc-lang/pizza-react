export function ButtonPlus ({ count, setCount }) {
    return (
        <button onClick={() => setCount(count + 1)}>+</button>
    )
}

export function ButtonMoins ({ count, setCount }) {
    return (
        <button onClick={() => setCount(Math.max(0, count - 1))}>-</button>
    )
}