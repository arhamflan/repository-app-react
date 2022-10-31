export const CombineComponents = (...components: any) => {
    return components.reduce(
        (AccumulatedComponents: any, CurrentComponents: any) => {
            return ({children}: any) => {
                return (
                    <AccumulatedComponents>
                        <CurrentComponents>{children}</CurrentComponents>
                    </AccumulatedComponents>
                )
            }
        },
        ({children}: any) => <>{children}</>
    )
}