import crypto from 'crypto';

interface TokenData {
    email: string;
    expires: number;
}

export default class instance {
    private tokenStore: { [key: string]: TokenData } = {};

    generateToken(email: string): string {
        const token = crypto.randomBytes(20).toString('hex');
        const expires = Date.now() + 3600000; // 1 hour
        this.tokenStore[token] = { email, expires };
        return token;
    }

    validateToken(token: string): string | null {
        const data = this.tokenStore[token];
        if (data && data.expires > Date.now()) {
            return data.email;
        }
        return null;
    }

    deleteToken(token: string): void {
        delete this.tokenStore[token];
    }
}