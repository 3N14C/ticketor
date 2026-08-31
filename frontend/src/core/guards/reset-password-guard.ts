import { NextRequest, NextResponse } from "next/server";
import { PAGES } from "@shared/config";

export const resetPasswordGuard = (req: NextRequest) => {
	const { pathname, searchParams } = req.nextUrl;
	const isResetPasswordPage = PAGES.auth.resetPassword("").includes(pathname);
	const hasEmail =
		searchParams.has("email") && searchParams.get("email") !== "";

	if (isResetPasswordPage && !hasEmail) {
		return NextResponse.redirect(new URL(PAGES.home, req.url));
	}

	return NextResponse.next();
};