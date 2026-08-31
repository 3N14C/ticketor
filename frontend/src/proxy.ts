import { NextRequest, NextResponse, ProxyConfig } from "next/server";
import { resetPasswordGuard } from "@core/guards";

const proxy = (req: NextRequest) => {
	const guardResponse = resetPasswordGuard(req);
	if (guardResponse) {
		return guardResponse;
	}
	return NextResponse.next();
};

export default proxy;

export const config: ProxyConfig = {
	matcher: "/auth/reset-password",
};