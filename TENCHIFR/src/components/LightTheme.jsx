function LightTheme() {
    return(
        <div className="fixed inset-0 -z-10 bg-[#F5EBDD]">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)
                    `,
                    backgroundSize: "50px 50px",
                }}
            />
        </div>
    )
}

export default LightTheme;