class ErrorCodes {
    private static logError(e: unknown) {
        console.log(e);
    }

    static NotFound(e?: unknown, type?: string) {
        this.logError(e);
        return {
            code: '00',
            message: `${type?.charAt(0)?.toUpperCase()} was not found`,
        }
    }

    static UserExists() {
        return '01'
    }

    static CategoryExists() {
        return '02'
    }

    static ReviewExists() {
        return '03'
    }

    static EventExists(e?: unknown) {
        this.logError(e);
        return {
            code: '04',
            message: 'Event already exists'
        }
    }

    static DatabseIssue(e: unknown) {
        this.logError(e);
        return {
            code: '05',
            message: 'An error occurred',
        }
    }

    static TicketExists(e?: unknown) {
        this.logError(e);
        return {
            code: '05',
            message: 'Ticket already exists'
        }
    }

    static AdminExists(e?: unknown) {
        this.logError(e);
        return {
            code: '06',
            message: 'Admin already exists'
        }
    }

    static PaymentExists(e?: unknown) {
        this.logError(e);
        return {
            code: '07',
            message: 'Payment already exists'
        }
    }
}

export default ErrorCodes;
