import { NextRequest, NextResponse } from "next/server";
import { PAGES } from "@shared/config";

const GUEST_ONLY_PATHS: string[] = [PAGES.auth.signIn, PAGES.auth.signUp];

export const authGuard = (req: NextRequest): NextResponse | undefined => {
	const { pathname } = req.nextUrl;
	const isGuestOnlyPage = GUEST_ONLY_PATHS.includes(pathname);
	const hasAccessToken = req.cookies.has("accessToken");

	if (hasAccessToken && isGuestOnlyPage) {
		return NextResponse.redirect(new URL(PAGES.home, req.url));
	}
};