export default class ApiError {
    private _show404: boolean = false;
    private _showCustom: boolean = false;
    private _message: string | null = null;
    private _statusCode: number;

    constructor(public statusCode: number) {
        this._statusCode = statusCode;
        if (statusCode === 404) {
            this._show404 = true;
        }
    }

    get show404(): boolean {
        return this._show404;
    }

    get showCustom(): boolean {
        return this._showCustom;
    }

    get message(): string | null {
        return this._message;
    }

    get status_code(): number {
        return this._statusCode;
    }    

    setCustomMessage(message: string): void {
        if (!message) {
            throw new Error("A message is required when setting showCustom to true.");
        }
        this._message = message;
        this._showCustom = true;
        this._show404 = false;
    }

    static fromError(statusCode: number, message?: string): ApiError {
        const error = new ApiError(statusCode);
        if (message) {
            error.setCustomMessage(message);
        }
        return error;
    }

    toJSON() {
        return {
            statusCode: this.statusCode,
            message: this.message,
            show404: this.show404 ?? false,
        };
    }
}