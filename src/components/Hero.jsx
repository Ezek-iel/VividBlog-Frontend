import { Navbar } from "./Navbar"

export function Hero(props) {
    return (
        <>
            <Navbar />
            <section className={`hero is-${props.size}`}>
                <div className="hero-body">
                    {props.children}
                </div>
            </section>
        </>
    )
}