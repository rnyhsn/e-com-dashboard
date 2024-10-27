import { NextResponse } from "next/server";
import type {NextRequest} from "next/server";
import { auth as middleware } from '@/utils/services/auth';

export default middleware((req: NextRequest) => {
    
})


export const config = {
    matcher: [
        '/dashboard/:path*',
        '/about/:path',
    ]
}