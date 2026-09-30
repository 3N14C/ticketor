import { NextRequest, NextResponse, ProxyConfig } from "next/server";
import { authGuard, resetPasswordGuard } from "@app/guards";

const guards = [resetPasswordGuard, authGuard];

const proxy = (req: NextRequest) => {
	for (const guard of guards) {
		const response = guard(req);

		if (response) return response;
	}

	return NextResponse.next();
};

export default proxy;

export const config: ProxyConfig = {
	matcher: ["/auth/reset-password", "/auth/sign-in", "/auth/sign-up"],
};