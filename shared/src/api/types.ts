export interface APIRoutes {
    "/attendee/emails": {
        GET: {
            response: Array<{ email: string, userId: string }>
        }
    }
}