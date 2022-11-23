export default class LoggerBrowserSpectator
{
    public register(loggerAccessor: any): Record<string, any>
    {
        const proto = {
            async collectErrors()
            {
                window.addEventListener('error', (evt) => {

                });
            }
        };

        return proto;
    }
}