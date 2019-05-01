export interface AuthResponse {
    status: number,
    user: {
        id: number,
        email: string,
        password: string,
        username: string,
        avatar: string,
        bio: string,
        createdAt: string,
        updatedAt: string
    },
    accessToken: string,
    expiresIn: number
}
